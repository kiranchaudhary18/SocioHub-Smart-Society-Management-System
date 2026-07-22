package com.resicore.modules.payment.dto;

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
public class PaymentSummaryDTO {
    private String id;
    private String paymentNumber;
    private String transactionId;
    private String receiptNumber;
    private PaymentType type;
    private String residentName;
    private String flatNumber;
    private Double amount;
    private PaymentMethod method;
    private PaymentStatus status;
    private LocalDateTime paymentDate;
}
