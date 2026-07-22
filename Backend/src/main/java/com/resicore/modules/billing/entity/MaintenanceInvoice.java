package com.resicore.modules.billing.entity;

import com.resicore.common.entity.BaseEntity;
import com.resicore.modules.billing.enums.InvoiceStatus;
import com.resicore.modules.billing.enums.PaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Document(collection = "maintenance_invoice")
public class MaintenanceInvoice extends BaseEntity {

    private String invoiceNumber;

    private String societyId;
    private String buildingId;
    private String flatId;
    private String residentId;

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

    @Builder.Default
    private InvoiceStatus invoiceStatus = InvoiceStatus.DRAFT;

    @Builder.Default
    private PaymentStatus paymentStatus = PaymentStatus.UNPAID;

    private LocalDateTime paymentDate;
    private String generatedBy;
    private String notes;

    @Builder.Default
    private Boolean isDeleted = false;
}
