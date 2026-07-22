package com.resicore.modules.community.service;

import com.resicore.modules.community.dto.EventRegistrationDTO;
import com.resicore.modules.community.dto.EventRequestDTO;
import com.resicore.modules.community.dto.EventResponseDTO;
import com.resicore.modules.community.enums.EventStatus;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;

public interface EventService {
    EventResponseDTO createEvent(EventRequestDTO requestDTO);
    EventResponseDTO updateEvent(String id, EventRequestDTO requestDTO);
    EventResponseDTO cancelEvent(String id);
    void deleteEvent(String id);
    
    EventResponseDTO getEventById(String id);
    
    EventRegistrationDTO registerForEvent(String eventId, String paymentId);
    EventRegistrationDTO checkInParticipant(String registrationId);
    EventResponseDTO completeEvent(String id);
    
    Page<EventResponseDTO> searchEvents(String societyId, String category, EventStatus status, LocalDateTime startDate, LocalDateTime endDate, String keyword, int page, int size, String sortBy, String sortDir);
}
