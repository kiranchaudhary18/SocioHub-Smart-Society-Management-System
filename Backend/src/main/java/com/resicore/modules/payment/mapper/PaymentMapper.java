package com.resicore.modules.payment.mapper;

import com.resicore.modules.payment.dto.PaymentRequestDTO;
import com.resicore.modules.payment.dto.PaymentResponseDTO;
import com.resicore.modules.payment.dto.PaymentSummaryDTO;
import com.resicore.modules.payment.entity.Payment;
import org.springframework.stereotype.Component;

@Component
public class PaymentMapper {

    public Payment toEntity(PaymentRequestDTO dto) {
        if (dto == null) {
            return null;
        }

        return Payment.builder()
                .invoiceId(dto.getInvoiceId())
                .paymentType(dto.getPaymentType())
                .amount(dto.getAmount())
                .currency(dto.getCurrency())
                .gateway(dto.getGateway())
                .paymentMethod(dto.getPaymentMethod())
                .build();
    }

    public PaymentResponseDTO toResponseDTO(Payment entity, String residentName, String flatNumber) {
        if (entity == null) {
            return null;
        }

        return PaymentResponseDTO.builder()
                .id(entity.getId())
                .paymentNumber(entity.getPaymentNumber())
                .transactionId(entity.getTransactionId())
                .gatewayTransactionId(entity.getGatewayTransactionId())
                .receiptNumber(entity.getReceiptNumber())
                .invoiceId(entity.getInvoiceId())
                .residentId(entity.getResidentId())
                .residentName(residentName)
                .flatId(entity.getFlatId())
                .flatNumber(flatNumber)
                .buildingId(entity.getBuildingId())
                .societyId(entity.getSocietyId())
                .paymentType(entity.getPaymentType())
                .paymentMethod(entity.getPaymentMethod())
                .gateway(entity.getGateway())
                .amount(entity.getAmount())
                .currency(entity.getCurrency())
                .status(entity.getStatus())
                .failureReason(entity.getFailureReason())
                .refundedAmount(entity.getRefundedAmount())
                .refundDate(entity.getRefundDate())
                .paymentDate(entity.getPaymentDate())
                .notes(entity.getNotes())
                .createdAt(entity.getCreatedAt())
                .build();
    }
    
    public PaymentSummaryDTO toSummaryDTO(Payment entity, String residentName, String flatNumber) {
        if (entity == null) {
            return null;
        }

        return PaymentSummaryDTO.builder()
                .id(entity.getId())
                .paymentNumber(entity.getPaymentNumber())
                .transactionId(entity.getTransactionId())
                .receiptNumber(entity.getReceiptNumber())
                .type(entity.getPaymentType())
                .residentName(residentName)
                .flatNumber(flatNumber)
                .amount(entity.getAmount())
                .method(entity.getPaymentMethod())
                .status(entity.getStatus())
                .paymentDate(entity.getPaymentDate())
                .build();
    }
}
