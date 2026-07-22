package com.resicore.modules.payment.dto;

import com.resicore.modules.payment.enums.PaymentGateway;
import com.resicore.modules.payment.enums.PaymentMethod;
import com.resicore.modules.payment.enums.PaymentType;
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
public class OfflinePaymentDTO {

    @NotBlank(message = "Invoice ID is required")
    private String invoiceId;

    @NotNull(message = "Payment type is required")
    private PaymentType paymentType;

    @NotNull(message = "Amount is required")
    @Min(value = 1, message = "Amount must be greater than 0")
    private Double amount;
    
    @Builder.Default
    private String currency = "INR";

    @NotNull(message = "Payment method is required")
    private PaymentMethod paymentMethod; // Usually CASH or CHEQUE

    @NotBlank(message = "Reference/Transaction ID is required")
    private String referenceId;

    @NotNull(message = "Payment date is required")
    private LocalDateTime paymentDate;

    private String notes;
}
