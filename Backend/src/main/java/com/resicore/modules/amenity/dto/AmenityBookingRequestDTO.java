package com.resicore.modules.amenity.dto;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AmenityBookingRequestDTO {

    @NotBlank(message = "Amenity ID is required")
    private String amenityId;
    
    @NotNull(message = "Booking date is required")
    @FutureOrPresent(message = "Booking date must be today or in the future")
    private LocalDate bookingDate;
    
    @NotNull(message = "Start time is required")
    private LocalTime startTime;
    
    // Optional. If not provided, it will be calculated using amenity slotDuration
    private LocalTime endTime;
    
    @Min(value = 1, message = "Number of guests must be at least 1")
    private Integer numberOfGuests;
    
    private String remarks;
}
