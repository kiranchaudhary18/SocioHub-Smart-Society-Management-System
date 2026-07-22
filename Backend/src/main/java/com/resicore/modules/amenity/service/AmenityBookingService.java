package com.resicore.modules.amenity.service;

import com.resicore.modules.amenity.dto.AmenityBookingRequestDTO;
import com.resicore.modules.amenity.dto.AmenityBookingResponseDTO;
import com.resicore.modules.amenity.enums.BookingStatus;
import org.springframework.data.domain.Page;

import java.time.LocalDate;

public interface AmenityBookingService {
    AmenityBookingResponseDTO createBooking(AmenityBookingRequestDTO requestDTO);
    
    AmenityBookingResponseDTO approveBooking(String id);
    AmenityBookingResponseDTO rejectBooking(String id, String remarks);
    AmenityBookingResponseDTO cancelBooking(String id);
    
    AmenityBookingResponseDTO checkIn(String id);
    AmenityBookingResponseDTO checkOut(String id);
    AmenityBookingResponseDTO completeBooking(String id);
    
    AmenityBookingResponseDTO getBookingById(String id);
    
    Page<AmenityBookingResponseDTO> searchBookings(String societyId, String residentId, String amenityId, BookingStatus status, LocalDate startDate, LocalDate endDate, String keyword, int page, int size, String sortBy, String sortDir);
}
