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
public class InvoiceSummaryDTO {
    private String id;
    private String invoiceNumber;
    private String type; // e.g., "MAINTENANCE" or "ELECTRICITY"
    private String flatNumber;
    private String residentName;
    private Integer billingMonth;
    private Integer billingYear;
    private Double totalAmount;
    private Double dueAmount;
    private LocalDateTime dueDate;
    private InvoiceStatus status;
    private PaymentStatus paymentStatus;
}
