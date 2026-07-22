package com.resicore.modules.amenity.repository;

import com.resicore.modules.amenity.entity.AmenityBooking;
import com.resicore.modules.amenity.enums.BookingStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RequiredArgsConstructor
public class CustomAmenityBookingRepositoryImpl implements CustomAmenityBookingRepository {

    private final MongoTemplate mongoTemplate;

    @Override
    public Page<AmenityBooking> searchBookings(String societyId, String residentId, String amenityId, BookingStatus status, LocalDate startDate, LocalDate endDate, String keyword, Pageable pageable) {
        Query query = new Query();
        query.addCriteria(Criteria.where("isDeleted").is(false));

        if (societyId != null && !societyId.isBlank()) {
            query.addCriteria(Criteria.where("societyId").is(societyId));
        }

        if (residentId != null && !residentId.isBlank()) {
            query.addCriteria(Criteria.where("residentId").is(residentId));
        }
        
        if (amenityId != null && !amenityId.isBlank()) {
            query.addCriteria(Criteria.where("amenityId").is(amenityId));
        }

        if (status != null) {
            query.addCriteria(Criteria.where("bookingStatus").is(status));
        }

        if (startDate != null && endDate != null) {
            query.addCriteria(Criteria.where("bookingDate").gte(startDate).lte(endDate));
        } else if (startDate != null) {
            query.addCriteria(Criteria.where("bookingDate").gte(startDate));
        } else if (endDate != null) {
            query.addCriteria(Criteria.where("bookingDate").lte(endDate));
        }

        if (keyword != null && !keyword.isBlank()) {
            Criteria keywordCriteria = new Criteria().orOperator(
                    Criteria.where("bookingNumber").regex(keyword, "i")
            );
            query.addCriteria(keywordCriteria);
        }

        long total = mongoTemplate.count(query, AmenityBooking.class);
        query.with(pageable);
        List<AmenityBooking> bookings = mongoTemplate.find(query, AmenityBooking.class);

        return new PageImpl<>(bookings, pageable, total);
    }
    
    @Override
    public boolean hasOverlappingBooking(String amenityId, LocalDate bookingDate, LocalTime startTime, LocalTime endTime) {
        Query query = new Query();
        query.addCriteria(Criteria.where("isDeleted").is(false));
        query.addCriteria(Criteria.where("amenityId").is(amenityId));
        query.addCriteria(Criteria.where("bookingDate").is(bookingDate));
        
        // Exclude cancelled and rejected bookings
        query.addCriteria(Criteria.where("bookingStatus").nin(BookingStatus.CANCELLED, BookingStatus.REJECTED));
        
        // Check for time overlap
        Criteria timeOverlap = new Criteria().orOperator(
                // New booking starts during an existing booking
                new Criteria().andOperator(
                        Criteria.where("startTime").lte(startTime),
                        Criteria.where("endTime").gt(startTime)
                ),
                // New booking ends during an existing booking
                new Criteria().andOperator(
                        Criteria.where("startTime").lt(endTime),
                        Criteria.where("endTime").gte(endTime)
                ),
                // New booking completely envelops an existing booking
                new Criteria().andOperator(
                        Criteria.where("startTime").gte(startTime),
                        Criteria.where("endTime").lte(endTime)
                )
        );
        query.addCriteria(timeOverlap);
        
        return mongoTemplate.exists(query, AmenityBooking.class);
    }
}
