package com.resicore.modules.payment.entity;

import com.resicore.common.entity.BaseEntity;
import com.resicore.modules.payment.enums.PaymentGateway;
import com.resicore.modules.payment.enums.PaymentMethod;
import com.resicore.modules.payment.enums.PaymentStatus;
import com.resicore.modules.payment.enums.PaymentType;
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
@Document(collection = "payment")
public class Payment extends BaseEntity {

    private String paymentNumber;
    private String transactionId;
    private String gatewayTransactionId;
    private String receiptNumber;

    private String invoiceId;
    private String residentId;
    private String flatId;
    private String buildingId;
    private String societyId;

    private PaymentType paymentType;
    private PaymentMethod paymentMethod;
    private PaymentGateway gateway;

    private Double amount;
    private String currency;

    @Builder.Default
    private PaymentStatus status = PaymentStatus.PENDING;

    private String gatewayStatus;
    private String gatewayResponse;

    private LocalDateTime paymentDate;
    
    private String failureReason;
    
    private Double refundedAmount;
    private LocalDateTime refundDate;

    private String notes;

    @Builder.Default
    private Boolean isDeleted = false;
}
