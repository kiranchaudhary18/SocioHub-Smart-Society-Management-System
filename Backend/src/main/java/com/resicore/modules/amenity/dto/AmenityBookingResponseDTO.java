package com.resicore.modules.amenity.dto;

import com.resicore.modules.amenity.enums.BookingStatus;
import com.resicore.modules.billing.enums.PaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AmenityBookingResponseDTO {
    private String id;
    private String bookingNumber;
    private String amenityId;
    private String amenityName;
    
    private String residentId;
    private String residentName;
    private String flatId;
    private String flatNumber;
    private String buildingId;
    private String societyId;

    private LocalDate bookingDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private Integer duration;
    
    private Integer numberOfGuests;

    private Double bookingCharge;
    private Double securityDeposit;
    private String paymentId;

    private BookingStatus bookingStatus;
    private PaymentStatus paymentStatus;

    private String remarks;
    
    private String approvedBy;
    private String cancelledBy;
    
    private LocalDateTime checkedInAt;
    private LocalDateTime checkedOutAt;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
