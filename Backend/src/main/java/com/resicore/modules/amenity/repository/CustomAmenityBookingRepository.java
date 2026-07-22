package com.resicore.modules.amenity.repository;

import com.resicore.modules.amenity.entity.AmenityBooking;
import com.resicore.modules.amenity.enums.BookingStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface CustomAmenityBookingRepository {
    Page<AmenityBooking> searchBookings(String societyId, String residentId, String amenityId, BookingStatus status, LocalDate startDate, LocalDate endDate, String keyword, Pageable pageable);
    
    boolean hasOverlappingBooking(String amenityId, LocalDate bookingDate, LocalTime startTime, LocalTime endTime);
}
