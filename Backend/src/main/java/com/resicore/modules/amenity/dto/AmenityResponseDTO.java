package com.resicore.modules.amenity.dto;

import com.resicore.modules.amenity.enums.AmenityCategory;
import com.resicore.modules.amenity.enums.AmenityStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AmenityResponseDTO {
    private String id;
    private String amenityCode;
    private String societyId;
    private String name;
    private String description;
    private AmenityCategory category;
    private String location;
    private Integer capacity;
    private Boolean bookingRequired;
    private Double bookingCharge;
    private Double securityDeposit;
    private LocalTime openingTime;
    private LocalTime closingTime;
    private Integer slotDuration;
    private Integer maxBookingsPerResidentPerDay;
    private Integer advanceBookingDays;
    private List<String> images;
    private List<String> rules;
    private AmenityStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
