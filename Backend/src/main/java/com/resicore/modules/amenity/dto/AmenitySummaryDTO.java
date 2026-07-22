package com.resicore.modules.amenity.dto;

import com.resicore.modules.amenity.enums.AmenityCategory;
import com.resicore.modules.amenity.enums.AmenityStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AmenitySummaryDTO {
    private String id;
    private String amenityCode;
    private String name;
    private AmenityCategory category;
    private String location;
    private Integer capacity;
    private AmenityStatus status;
    private Double bookingCharge;
}
