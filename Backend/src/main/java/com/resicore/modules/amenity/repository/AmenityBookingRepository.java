package com.resicore.modules.amenity.repository;

import com.resicore.modules.amenity.entity.AmenityBooking;
import com.resicore.modules.amenity.enums.BookingStatus;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface AmenityBookingRepository extends MongoRepository<AmenityBooking, String>, CustomAmenityBookingRepository {

    Optional<AmenityBooking> findByIdAndIsDeletedFalse(String id);
    
    long countByResidentIdAndBookingDateAndBookingStatusNotInAndIsDeletedFalse(String residentId, LocalDate bookingDate, java.util.List<BookingStatus> excludedStatuses);
}
