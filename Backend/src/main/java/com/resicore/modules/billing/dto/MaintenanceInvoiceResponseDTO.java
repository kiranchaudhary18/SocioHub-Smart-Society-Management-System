package com.resicore.modules.billing.dto;

import com.resicore.modules.billing.enums.InvoiceStatus;
import com.resicore.modules.billing.enums.PaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MaintenanceInvoiceResponseDTO {
    private String id;
    private String invoiceNumber;
    
    private String societyId;
    private String buildingId;
    private String flatId;
    private String flatNumber;
    private String residentId;
    private String residentName;

    private Integer billingMonth;
    private Integer billingYear;

    private Double maintenanceAmount;
    private Double penaltyAmount;
    private Double discountAmount;
    private Double taxAmount;
    
    private Double totalAmount;
    private Double paidAmount;
    private Double dueAmount;

    private LocalDateTime dueDate;
    private InvoiceStatus invoiceStatus;
    private PaymentStatus paymentStatus;
    private LocalDateTime paymentDate;

    private String generatedBy;
    private String notes;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
