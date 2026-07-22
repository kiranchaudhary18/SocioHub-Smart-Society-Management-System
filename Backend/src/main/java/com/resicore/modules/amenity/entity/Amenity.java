package com.resicore.modules.amenity.entity;

import com.resicore.common.entity.BaseEntity;
import com.resicore.modules.amenity.enums.AmenityCategory;
import com.resicore.modules.amenity.enums.AmenityStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Document(collection = "amenity")
public class Amenity extends BaseEntity {

    private String amenityCode;
    private String societyId;
    private String name;
    private String description;
    
    private AmenityCategory category;
    private String location;
    private Integer capacity;
    
    @Builder.Default
    private Boolean bookingRequired = true;
    
    private Double bookingCharge;
    private Double securityDeposit;
    
    private LocalTime openingTime;
    private LocalTime closingTime;
    
    private Integer slotDuration; // in minutes
    private Integer maxBookingsPerResidentPerDay;
    private Integer advanceBookingDays;
    
    private List<String> images;
    private List<String> rules;
    
    @Builder.Default
    private AmenityStatus status = AmenityStatus.ACTIVE;
    
    @Builder.Default
    private Boolean isDeleted = false;
}
