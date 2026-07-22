package com.resicore.modules.amenity.dto;

import com.resicore.modules.amenity.enums.AmenityCategory;
import com.resicore.modules.amenity.enums.AmenityStatus;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AmenityRequestDTO {

    @NotBlank(message = "Amenity name is required")
    private String name;

    private String description;
    
    @NotNull(message = "Category is required")
    private AmenityCategory category;
    
    private String location;
    
    @Min(value = 1, message = "Capacity must be at least 1")
    private Integer capacity;
    
    @Builder.Default
    private Boolean bookingRequired = true;
    
    private Double bookingCharge;
    private Double securityDeposit;
    
    @NotNull(message = "Opening time is required")
    private LocalTime openingTime;
    
    @NotNull(message = "Closing time is required")
    private LocalTime closingTime;
    
    @NotNull(message = "Slot duration is required")
    @Min(value = 15, message = "Slot duration must be at least 15 minutes")
    private Integer slotDuration;
    
    @NotNull(message = "Max bookings per resident per day is required")
    @Min(value = 1, message = "Max bookings must be at least 1")
    private Integer maxBookingsPerResidentPerDay;
    
    @NotNull(message = "Advance booking days is required")
    @Min(value = 0, message = "Advance booking days cannot be negative")
    private Integer advanceBookingDays;
    
    private List<String> images;
    private List<String> rules;
    
    @Builder.Default
    private AmenityStatus status = AmenityStatus.ACTIVE;
}
