package com.resicore.modules.billing.dto;

import com.resicore.modules.billing.enums.InvoiceStatus;
import com.resicore.modules.billing.enums.PaymentStatus;
import com.resicore.modules.billing.enums.UtilityType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UtilityBillResponseDTO {
    private String id;
    private String utilityNumber;
    
    private String societyId;
    private String buildingId;
    private String flatId;
    private String flatNumber;
    private String residentId;
    private String residentName;

    private UtilityType utilityType;
    private Integer billingMonth;
    private Integer billingYear;

    private Double previousReading;
    private Double currentReading;
    private Double unitsConsumed;
    private Double ratePerUnit;
    private Double fixedCharge;
    
    private Double taxAmount;
    private Double totalAmount;

    private LocalDateTime dueDate;
    private InvoiceStatus billStatus;
    private PaymentStatus paymentStatus;
    private LocalDateTime paymentDate;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
