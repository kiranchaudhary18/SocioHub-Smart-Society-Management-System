package com.resicore.modules.payment.dto;

import com.resicore.modules.payment.enums.PaymentGateway;
import com.resicore.modules.payment.enums.PaymentMethod;
import com.resicore.modules.payment.enums.PaymentStatus;
import com.resicore.modules.payment.enums.PaymentType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentResponseDTO {
    private String id;
    private String paymentNumber;
    private String transactionId;
    private String gatewayTransactionId;
    private String receiptNumber;

    private String invoiceId;
    private String residentId;
    private String residentName;
    private String flatId;
    private String flatNumber;
    private String buildingId;
    private String societyId;

    private PaymentType paymentType;
    private PaymentMethod paymentMethod;
    private PaymentGateway gateway;

    private Double amount;
    private String currency;

    private PaymentStatus status;
    private String failureReason;
    
    private Double refundedAmount;
    private LocalDateTime refundDate;

    private LocalDateTime paymentDate;
    private String notes;
    private LocalDateTime createdAt;
}
