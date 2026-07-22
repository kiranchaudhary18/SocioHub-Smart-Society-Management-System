package com.resicore.modules.billing.entity;

import com.resicore.common.entity.BaseEntity;
import com.resicore.modules.billing.enums.InvoiceStatus;
import com.resicore.modules.billing.enums.PaymentStatus;
import com.resicore.modules.billing.enums.UtilityType;
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
@Document(collection = "utility_bill")
public class UtilityBill extends BaseEntity {

    private String utilityNumber;

    private String societyId;
    private String buildingId;
    private String flatId;
    private String residentId;

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

    @Builder.Default
    private InvoiceStatus billStatus = InvoiceStatus.DRAFT;

    @Builder.Default
    private PaymentStatus paymentStatus = PaymentStatus.UNPAID;

    private LocalDateTime paymentDate;

    @Builder.Default
    private Boolean isDeleted = false;
}
