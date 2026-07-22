package com.resicore.modules.amenity.service.impl;

import com.resicore.common.enums.Role;
import com.resicore.exception.ResourceNotFoundException;
import com.resicore.modules.amenity.dto.AmenityBookingRequestDTO;
import com.resicore.modules.amenity.dto.AmenityBookingResponseDTO;
import com.resicore.modules.amenity.entity.Amenity;
import com.resicore.modules.amenity.entity.AmenityBooking;
import com.resicore.modules.amenity.enums.AmenityStatus;
import com.resicore.modules.amenity.enums.BookingStatus;
import com.resicore.modules.amenity.mapper.AmenityMapper;
import com.resicore.modules.amenity.repository.AmenityBookingRepository;
import com.resicore.modules.amenity.repository.AmenityRepository;
import com.resicore.modules.amenity.service.AmenityBookingService;
import com.resicore.modules.billing.enums.PaymentStatus;
import com.resicore.modules.flat.entity.Flat;
import com.resicore.modules.flat.repository.FlatRepository;
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

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class AmenityBookingServiceImpl implements AmenityBookingService {

    private final AmenityBookingRepository bookingRepository;
    private final AmenityRepository amenityRepository;
    private final ResidentRepository residentRepository;
    private final FlatRepository flatRepository;
    private final UserRepository userRepository;
    private final AmenityMapper amenityMapper;

    @Override
    @Transactional
    public AmenityBookingResponseDTO createBooking(AmenityBookingRequestDTO requestDTO) {
        log.info("Creating booking for amenity: {} on date: {}", requestDTO.getAmenityId(), requestDTO.getBookingDate());

        Amenity amenity = amenityRepository.findByIdAndIsDeletedFalse(requestDTO.getAmenityId())
                .orElseThrow(() -> new ResourceNotFoundException("Amenity not found: " + requestDTO.getAmenityId()));

        if (amenity.getStatus() != AmenityStatus.ACTIVE) {
            throw new IllegalArgumentException("Amenity is currently " + amenity.getStatus());
        }

        Resident resident = getCurrentResident();
        if (!resident.getSocietyId().equals(amenity.getSocietyId())) {
            throw new AccessDeniedException("Cannot book amenity outside of your society.");
        }

        // Validate Advance Booking Days
        if (amenity.getAdvanceBookingDays() != null) {
            LocalDate maxDate = LocalDate.now().plusDays(amenity.getAdvanceBookingDays());
            if (requestDTO.getBookingDate().isAfter(maxDate)) {
                throw new IllegalArgumentException("Cannot book more than " + amenity.getAdvanceBookingDays() + " days in advance.");
            }
        }
        
        // Calculate and Validate Time
        LocalTime startTime = requestDTO.getStartTime();
        LocalTime endTime = requestDTO.getEndTime();
        
        if (endTime == null) {
            endTime = startTime.plusMinutes(amenity.getSlotDuration());
        }

        if (!endTime.isAfter(startTime)) {
            throw new IllegalArgumentException("End time must be after start time");
        }
        
        if (startTime.isBefore(amenity.getOpeningTime()) || endTime.isAfter(amenity.getClosingTime())) {
            throw new IllegalArgumentException("Booking must be within operating hours: " + amenity.getOpeningTime() + " to " + amenity.getClosingTime());
        }
        
        // Check slot duration rules
        long requestedDuration = ChronoUnit.MINUTES.between(startTime, endTime);
        if (amenity.getSlotDuration() != null && requestedDuration != amenity.getSlotDuration()) {
            throw new IllegalArgumentException("Booking duration must be exactly " + amenity.getSlotDuration() + " minutes per slot rule.");
        }

        // Validate max bookings per day
        if (amenity.getMaxBookingsPerResidentPerDay() != null) {
            long existingBookings = bookingRepository.countByResidentIdAndBookingDateAndBookingStatusNotInAndIsDeletedFalse(
                    resident.getId(), 
                    requestDTO.getBookingDate(),
                    Arrays.asList(BookingStatus.CANCELLED, BookingStatus.REJECTED)
            );
            
            if (existingBookings >= amenity.getMaxBookingsPerResidentPerDay()) {
                throw new IllegalArgumentException("Maximum bookings per day reached for this resident.");
            }
        }

        // Overlap Check
        if (bookingRepository.hasOverlappingBooking(amenity.getId(), requestDTO.getBookingDate(), startTime, endTime)) {
            throw new IllegalArgumentException("The requested slot overlaps with an existing booking.");
        }

        AmenityBooking booking = amenityMapper.toBookingEntity(requestDTO);
        booking.setEndTime(endTime);
        booking.setDuration((int) requestedDuration);
        
        booking.setBookingNumber("BKG-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        booking.setSocietyId(resident.getSocietyId());
        booking.setBuildingId(resident.getBuildingId());
        booking.setFlatId(resident.getFlatId());
        booking.setResidentId(resident.getId());
        
        booking.setBookingCharge(amenity.getBookingCharge());
        booking.setSecurityDeposit(amenity.getSecurityDeposit());
        
        if (amenity.getBookingCharge() != null && amenity.getBookingCharge() > 0) {
            booking.setBookingStatus(BookingStatus.PENDING);
            booking.setPaymentStatus(PaymentStatus.UNPAID);
        } else {
            // Free bookings are automatically confirmed or pending admin approval depending on logic. Assuming confirmed.
            booking.setBookingStatus(BookingStatus.CONFIRMED);
        }
        
        booking = bookingRepository.save(booking);
        return buildResponseDto(booking);
    }

    @Override
    @Transactional
    public AmenityBookingResponseDTO approveBooking(String id) {
        log.info("Approving booking: {}", id);
        AmenityBooking booking = getBookingAndValidateAdmin(id);

        if (booking.getBookingStatus() != BookingStatus.PENDING) {
            throw new IllegalArgumentException("Only PENDING bookings can be approved.");
        }
        
        booking.setBookingStatus(BookingStatus.APPROVED);
        booking.setApprovedBy(getCurrentUserEmail());
        
        booking = bookingRepository.save(booking);
        return buildResponseDto(booking);
    }

    @Override
    @Transactional
    public AmenityBookingResponseDTO rejectBooking(String id, String remarks) {
        log.info("Rejecting booking: {}", id);
        AmenityBooking booking = getBookingAndValidateAdmin(id);

        if (booking.getBookingStatus() != BookingStatus.PENDING) {
            throw new IllegalArgumentException("Only PENDING bookings can be rejected.");
        }
        
        booking.setBookingStatus(BookingStatus.REJECTED);
        booking.setRemarks(remarks);
        
        booking = bookingRepository.save(booking);
        return buildResponseDto(booking);
    }

    @Override
    @Transactional
    public AmenityBookingResponseDTO cancelBooking(String id) {
        log.info("Cancelling booking: {}", id);
        AmenityBooking booking = bookingRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found: " + id));

        User currentUser = getCurrentUser();
        if (currentUser.getRole() == Role.RESIDENT) {
            Resident resident = getCurrentResident();
            if (!booking.getResidentId().equals(resident.getId())) {
                throw new AccessDeniedException("You can only cancel your own bookings.");
            }
            if (booking.getBookingStatus() == BookingStatus.APPROVED || booking.getBookingStatus() == BookingStatus.CONFIRMED) {
                // Usually allowed, but might have penalty. We'll allow it.
            } else if (booking.getBookingStatus() != BookingStatus.PENDING) {
                 throw new IllegalArgumentException("Cannot cancel booking in current state: " + booking.getBookingStatus());
            }
        } else if (currentUser.getRole() == Role.SOCIETY_ADMIN) {
             if (!booking.getSocietyId().equals(currentUser.getSocietyId())) {
                 throw new AccessDeniedException("Unauthorized to cancel this booking");
             }
        } else {
             throw new AccessDeniedException("Unauthorized to cancel booking");
        }

        booking.setBookingStatus(BookingStatus.CANCELLED);
        booking.setCancelledBy(currentUser.getEmail());
        
        booking = bookingRepository.save(booking);
        return buildResponseDto(booking);
    }

    @Override
    @Transactional
    public AmenityBookingResponseDTO checkIn(String id) {
        log.info("Check-In booking: {}", id);
        AmenityBooking booking = getBookingAndValidateStaffOrAdmin(id);

        if (booking.getBookingStatus() != BookingStatus.CONFIRMED && booking.getBookingStatus() != BookingStatus.APPROVED) {
            throw new IllegalArgumentException("Booking must be APPROVED/CONFIRMED before check-in. Current: " + booking.getBookingStatus());
        }
        
        booking.setBookingStatus(BookingStatus.CHECKED_IN);
        booking.setCheckedInAt(LocalDateTime.now());
        
        booking = bookingRepository.save(booking);
        return buildResponseDto(booking);
    }

    @Override
    @Transactional
    public AmenityBookingResponseDTO checkOut(String id) {
        log.info("Check-Out booking: {}", id);
        AmenityBooking booking = getBookingAndValidateStaffOrAdmin(id);

        if (booking.getBookingStatus() != BookingStatus.CHECKED_IN) {
            throw new IllegalArgumentException("Booking must be CHECKED_IN before check-out.");
        }
        
        booking.setBookingStatus(BookingStatus.CHECKED_OUT);
        booking.setCheckedOutAt(LocalDateTime.now());
        
        booking = bookingRepository.save(booking);
        return buildResponseDto(booking);
    }

    @Override
    @Transactional
    public AmenityBookingResponseDTO completeBooking(String id) {
        AmenityBooking booking = getBookingAndValidateAdmin(id);
        booking.setBookingStatus(BookingStatus.COMPLETED);
        booking = bookingRepository.save(booking);
        return buildResponseDto(booking);
    }

    @Override
    public AmenityBookingResponseDTO getBookingById(String id) {
        AmenityBooking booking = bookingRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found: " + id));
        validateReadAccess(booking.getSocietyId(), booking.getResidentId());
        return buildResponseDto(booking);
    }

    @Override
    public Page<AmenityBookingResponseDTO> searchBookings(String societyId, String residentId, String amenityId, BookingStatus status, LocalDate startDate, LocalDate endDate, String keyword, int page, int size, String sortBy, String sortDir) {
        
        if (societyId != null) {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth != null && auth.isAuthenticated() && !auth.getName().equals("anonymousUser")) {
                User user = userRepository.findByEmail(auth.getName()).orElse(null);
                if (user != null && user.getRole() == Role.RESIDENT) {
                    Resident resident = residentRepository.findByUserIdAndIsDeletedFalse(user.getId()).orElse(null);
                    if (resident != null) {
                        residentId = resident.getId();
                    }
                } else if (user != null && user.getRole() == Role.SOCIETY_ADMIN) {
                    societyId = user.getSocietyId();
                }
            }
        }
        
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Page<AmenityBooking> bookingPage = bookingRepository.searchBookings(societyId, residentId, amenityId, status, startDate, endDate, keyword, pageable);
        
        return bookingPage.map(this::buildResponseDto);
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
    
    private String getCurrentUserEmail() {
        return getCurrentUser().getEmail();
    }

    private Resident getCurrentResident() {
        User user = getCurrentUser();
        if (user.getRole() != Role.RESIDENT) {
            throw new AccessDeniedException("Only RESIDENTs can perform this action");
        }
        return residentRepository.findByUserIdAndIsDeletedFalse(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Resident profile not found"));
    }

    private AmenityBooking getBookingAndValidateAdmin(String id) {
        AmenityBooking booking = bookingRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found: " + id));
        User user = getCurrentUser();
        if (user.getRole() == Role.SOCIETY_ADMIN && !user.getSocietyId().equals(booking.getSocietyId())) {
             throw new AccessDeniedException("Unauthorized society access.");
        }
        if (user.getRole() == Role.RESIDENT || user.getRole() == Role.STAFF) {
             throw new AccessDeniedException("Insufficient privileges.");
        }
        return booking;
    }
    
    private AmenityBooking getBookingAndValidateStaffOrAdmin(String id) {
        AmenityBooking booking = bookingRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found: " + id));
        User user = getCurrentUser();
        if ((user.getRole() == Role.SOCIETY_ADMIN || user.getRole() == Role.STAFF) && !user.getSocietyId().equals(booking.getSocietyId())) {
             throw new AccessDeniedException("Unauthorized society access.");
        }
        if (user.getRole() == Role.RESIDENT) {
             throw new AccessDeniedException("Insufficient privileges.");
        }
        return booking;
    }
    
    private void validateReadAccess(String targetSocietyId, String targetResidentId) {
        User user = getCurrentUser();
        if ((user.getRole() == Role.SOCIETY_ADMIN || user.getRole() == Role.STAFF) && !user.getSocietyId().equals(targetSocietyId)) {
            throw new AccessDeniedException("Unauthorized to view data in this society.");
        }
        if (user.getRole() == Role.RESIDENT) {
            Resident resident = residentRepository.findByUserIdAndIsDeletedFalse(user.getId()).orElse(null);
            if (resident == null || !resident.getId().equals(targetResidentId)) {
                throw new AccessDeniedException("RESIDENT can only view their own bookings.");
            }
        }
    }
    
    private AmenityBookingResponseDTO buildResponseDto(AmenityBooking booking) {
        String amenityName = amenityRepository.findByIdAndIsDeletedFalse(booking.getAmenityId())
                .map(Amenity::getName).orElse("Unknown");
        String residentName = residentRepository.findByIdAndIsDeletedFalse(booking.getResidentId())
                .map(Resident::getFullName).orElse("Unknown");
        String flatNumber = flatRepository.findByIdAndIsDeletedFalse(booking.getFlatId())
                .map(Flat::getFlatNumber).orElse("Unknown");
                
        return amenityMapper.toBookingResponseDTO(booking, amenityName, residentName, flatNumber);
    }
}
