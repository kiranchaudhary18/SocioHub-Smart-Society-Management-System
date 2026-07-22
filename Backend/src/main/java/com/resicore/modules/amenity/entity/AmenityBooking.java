package com.resicore.modules.amenity.entity;

import com.resicore.common.entity.BaseEntity;
import com.resicore.modules.amenity.enums.BookingStatus;
import com.resicore.modules.billing.enums.PaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Document(collection = "amenity_booking")
public class AmenityBooking extends BaseEntity {

    private String bookingNumber;
    private String amenityId;
    private String residentId;
    private String societyId;
    private String buildingId;
    private String flatId;

    private LocalDate bookingDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private Integer duration; // in minutes
    
    private Integer numberOfGuests;

    private Double bookingCharge;
    private Double securityDeposit;
    private String paymentId;

    @Builder.Default
    private BookingStatus bookingStatus = BookingStatus.PENDING;
    
    private PaymentStatus paymentStatus;

    private String remarks;
    
    private String approvedBy;
    private String cancelledBy;
    
    private LocalDateTime checkedInAt;
    private LocalDateTime checkedOutAt;

    @Builder.Default
    private Boolean isDeleted = false;
}
