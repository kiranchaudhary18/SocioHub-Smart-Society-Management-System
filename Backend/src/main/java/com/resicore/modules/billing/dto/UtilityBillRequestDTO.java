package com.resicore.modules.billing.dto;

import com.resicore.modules.billing.enums.UtilityType;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UtilityBillRequestDTO {

    @NotBlank(message = "Flat ID is required")
    private String flatId;
    
    @NotBlank(message = "Resident ID is required")
    private String residentId;

    @NotNull(message = "Utility type is required")
    private UtilityType utilityType;

    @NotNull(message = "Billing month is required")
    @Min(1)
    @Max(12)
    private Integer billingMonth;
    
    @NotNull(message = "Billing year is required")
    private Integer billingYear;

    @NotNull(message = "Previous reading is required")
    @Min(0)
    private Double previousReading;
    
    @NotNull(message = "Current reading is required")
    @Min(0)
    private Double currentReading;
    
    @NotNull(message = "Rate per unit is required")
    @Min(0)
    private Double ratePerUnit;
    
    @Min(0)
    private Double fixedCharge;
    
    @Min(0)
    private Double taxAmount;

    @NotNull(message = "Due date is required")
    private LocalDateTime dueDate;
}
