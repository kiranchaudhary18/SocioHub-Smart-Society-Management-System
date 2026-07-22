package com.resicore.modules.community.service.impl;

import com.resicore.common.enums.Role;
import com.resicore.exception.ResourceNotFoundException;
import com.resicore.modules.community.dto.EventRegistrationDTO;
import com.resicore.modules.community.dto.EventRequestDTO;
import com.resicore.modules.community.dto.EventResponseDTO;
import com.resicore.modules.community.entity.Event;
import com.resicore.modules.community.entity.EventRegistration;
import com.resicore.modules.community.enums.EventStatus;
import com.resicore.modules.community.mapper.CommunityMapper;
import com.resicore.modules.community.repository.EventRegistrationRepository;
import com.resicore.modules.community.repository.EventRepository;
import com.resicore.modules.community.service.EventService;
import com.resicore.modules.resident.entity.Resident;
import com.resicore.modules.resident.repository.ResidentRepository;
import com.resicore.modules.user.entity.User;
import com.resicore.modules.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;
    private final EventRegistrationRepository registrationRepository;
    private final ResidentRepository residentRepository;
    private final UserRepository userRepository;
    private final CommunityMapper communityMapper;

    @Override
    @Transactional
    public EventResponseDTO createEvent(EventRequestDTO requestDTO) {
        log.info("Creating event: {}", requestDTO.getTitle());
        User user = getCurrentAdminUser();

        Event event = communityMapper.toEventEntity(requestDTO);
        event.setSocietyId(user.getSocietyId());
        event.setEventCode("EVT-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        
        if (event.getEntryFee() != null && event.getEntryFee() > 0) {
            event.setPaymentRequired(true);
        }
        
        event = eventRepository.save(event);
        return communityMapper.toEventResponseDTO(event);
    }

    @Override
    @Transactional
    public EventResponseDTO updateEvent(String id, EventRequestDTO requestDTO) {
        log.info("Updating event: {}", id);
        Event event = getEventAndValidateAdmin(id);

        if (event.getStatus() == EventStatus.COMPLETED || event.getStatus() == EventStatus.CANCELLED) {
             throw new IllegalArgumentException("Cannot update a completed or cancelled event.");
        }

        communityMapper.updateEventFromDto(requestDTO, event);
        if (event.getEntryFee() != null && event.getEntryFee() > 0) {
            event.setPaymentRequired(true);
        } else {
            event.setPaymentRequired(false);
        }
        
        event = eventRepository.save(event);
        return communityMapper.toEventResponseDTO(event);
    }

    @Override
    @Transactional
    public EventResponseDTO cancelEvent(String id) {
        log.info("Cancelling event: {}", id);
        Event event = getEventAndValidateAdmin(id);
        
        event.setStatus(EventStatus.CANCELLED);
        event = eventRepository.save(event);
        return communityMapper.toEventResponseDTO(event);
    }

    @Override
    @Transactional
    public void deleteEvent(String id) {
        log.info("Deleting event: {}", id);
        Event event = getEventAndValidateAdmin(id);
        event.setIsDeleted(true);
        eventRepository.save(event);
    }

    @Override
    public EventResponseDTO getEventById(String id) {
        Event event = eventRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found: " + id));
        validateReadAccess(event.getSocietyId());
        return communityMapper.toEventResponseDTO(event);
    }

    @Override
    @Transactional
    public EventRegistrationDTO registerForEvent(String eventId, String paymentId) {
        log.info("Registering resident for event: {}", eventId);
        
        Event event = eventRepository.findByIdAndIsDeletedFalse(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found: " + eventId));
                
        Resident resident = getCurrentResident();
        if (!resident.getSocietyId().equals(event.getSocietyId())) {
             throw new AccessDeniedException("Cannot register for an event in another society.");
        }
        
        if (!event.getRegistrationRequired()) {
             throw new IllegalArgumentException("Registration is not required for this event.");
        }
        
        if (event.getStatus() == EventStatus.REGISTRATION_CLOSED || event.getStatus() == EventStatus.CANCELLED || event.getStatus() == EventStatus.COMPLETED) {
             throw new IllegalArgumentException("Registration is closed or event is unavailable.");
        }
        
        if (event.getMaxParticipants() != null && event.getRegisteredCount() >= event.getMaxParticipants()) {
             throw new IllegalArgumentException("Event registration is full.");
        }
        
        if (registrationRepository.existsByEventIdAndResidentIdAndStatus(eventId, resident.getId(), "CONFIRMED")) {
             throw new IllegalArgumentException("You are already registered for this event.");
        }
        
        if (event.getPaymentRequired() && (paymentId == null || paymentId.isBlank())) {
             throw new IllegalArgumentException("Payment is required to register for this event.");
        }
        
        EventRegistration registration = EventRegistration.builder()
                .eventId(eventId)
                .residentId(resident.getId())
                .registrationDate(LocalDateTime.now())
                .paymentId(paymentId)
                .status("CONFIRMED")
                .build();
                
        registration = registrationRepository.save(registration);
        
        // Update count atomically in a real system using mongoTemplate, but repository save is fine for scope
        event.setRegisteredCount(event.getRegisteredCount() + 1);
        eventRepository.save(event);
        
        return communityMapper.toEventRegistrationDTO(registration);
    }

    @Override
    @Transactional
    public EventRegistrationDTO checkInParticipant(String registrationId) {
        log.info("Checking in participant: {}", registrationId);
        
        User staffUser = getCurrentStaffOrAdminUser();
        
        EventRegistration registration = registrationRepository.findById(registrationId)
                .orElseThrow(() -> new ResourceNotFoundException("Registration not found"));
                
        Event event = eventRepository.findByIdAndIsDeletedFalse(registration.getEventId())
                .orElseThrow(() -> new ResourceNotFoundException("Event not found"));
                
        if (!staffUser.getSocietyId().equals(event.getSocietyId())) {
             throw new AccessDeniedException("Unauthorized society access.");
        }
        
        if (!"CONFIRMED".equals(registration.getStatus())) {
             throw new IllegalArgumentException("Registration is not CONFIRMED.");
        }
        
        if (registration.getCheckedIn()) {
             throw new IllegalArgumentException("Participant is already checked in.");
        }
        
        registration.setCheckedIn(true);
        registration.setCheckedInAt(LocalDateTime.now());
        
        registration = registrationRepository.save(registration);
        return communityMapper.toEventRegistrationDTO(registration);
    }

    @Override
    @Transactional
    public EventResponseDTO completeEvent(String id) {
        log.info("Completing event: {}", id);
        Event event = getEventAndValidateAdmin(id);
        
        event.setStatus(EventStatus.COMPLETED);
        event = eventRepository.save(event);
        return communityMapper.toEventResponseDTO(event);
    }

    @Override
    public Page<EventResponseDTO> searchEvents(String societyId, String category, EventStatus status, LocalDateTime startDate, LocalDateTime endDate, String keyword, int page, int size, String sortBy, String sortDir) {
        User user = getCurrentUser();
        
        if (societyId != null) {
            validateReadAccess(societyId);
        } else if (user.getRole() != Role.SUPER_ADMIN) {
            societyId = user.getSocietyId();
        }

        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Page<Event> eventPage = eventRepository.searchEvents(societyId, category, status, startDate, endDate, keyword, pageable);
        return eventPage.map(communityMapper::toEventResponseDTO);
    }

    // --- Helper Methods ---

    private User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !auth.getName().equals("anonymousUser")) {
            return userRepository.findByEmail(auth.getName())
                    .orElseThrow(() -> new AccessDeniedException("User not found"));
        }
        throw new AccessDeniedException("Unauthorized");
    }
    
    private User getCurrentAdminUser() {
        User user = getCurrentUser();
        if (user.getRole() != Role.SUPER_ADMIN && user.getRole() != Role.SOCIETY_ADMIN) {
            throw new AccessDeniedException("Only Admins can perform this action");
        }
        return user;
    }
    
    private User getCurrentStaffOrAdminUser() {
        User user = getCurrentUser();
        if (user.getRole() == Role.RESIDENT) {
            throw new AccessDeniedException("Only Staff/Admins can perform this action");
        }
        return user;
    }
    
    private Resident getCurrentResident() {
        User user = getCurrentUser();
        if (user.getRole() != Role.RESIDENT) {
             throw new AccessDeniedException("Only RESIDENTs can register for events.");
        }
        return residentRepository.findByUserIdAndIsDeletedFalse(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Resident profile not found"));
    }

    private Event getEventAndValidateAdmin(String id) {
        Event event = eventRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found: " + id));
        User user = getCurrentAdminUser();
        if (user.getRole() == Role.SOCIETY_ADMIN && !user.getSocietyId().equals(event.getSocietyId())) {
             throw new AccessDeniedException("Unauthorized society access.");
        }
        return event;
    }
    
    private void validateReadAccess(String targetSocietyId) {
        User user = getCurrentUser();
        if (user.getRole() != Role.SUPER_ADMIN && !user.getSocietyId().equals(targetSocietyId)) {
            throw new AccessDeniedException("You can only view data within your own society.");
        }
    }
}
