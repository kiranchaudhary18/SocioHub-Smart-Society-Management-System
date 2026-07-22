package com.resicore.modules.billing.dto;

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
public class MaintenanceInvoiceRequestDTO {
    
    @NotBlank(message = "Flat ID is required")
    private String flatId;
    
    @NotBlank(message = "Resident ID is required")
    private String residentId;

    @NotNull(message = "Billing month is required")
    @Min(1)
    @Max(12)
    private Integer billingMonth;
    
    @NotNull(message = "Billing year is required")
    private Integer billingYear;

    @NotNull(message = "Maintenance amount is required")
    @Min(0)
    private Double maintenanceAmount;
    
    @Min(0)
    private Double penaltyAmount;
    
    @Min(0)
    private Double discountAmount;
    
    @Min(0)
    private Double taxAmount;

    @NotNull(message = "Due date is required")
    private LocalDateTime dueDate;

    private String notes;
}
