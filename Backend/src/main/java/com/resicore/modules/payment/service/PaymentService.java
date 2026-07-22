package com.resicore.modules.payment.service;

import com.resicore.modules.payment.dto.OfflinePaymentDTO;
import com.resicore.modules.payment.dto.PaymentRequestDTO;
import com.resicore.modules.payment.dto.PaymentResponseDTO;
import com.resicore.modules.payment.dto.PaymentSummaryDTO;
import com.resicore.modules.payment.dto.RefundRequestDTO;
import com.resicore.modules.payment.enums.PaymentGateway;
import com.resicore.modules.payment.enums.PaymentMethod;
import com.resicore.modules.payment.enums.PaymentStatus;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;
import java.util.List;

public interface PaymentService {
    PaymentResponseDTO initiatePayment(PaymentRequestDTO requestDTO);
    PaymentResponseDTO recordOfflinePayment(OfflinePaymentDTO offlineDTO);
    PaymentResponseDTO verifyPayment(String transactionId, String gatewayTransactionId, String signature);
    PaymentResponseDTO processRefund(String transactionId, RefundRequestDTO refundDTO);
    
    PaymentResponseDTO getPaymentById(String id);
    PaymentResponseDTO getPaymentByTransactionId(String transactionId);
    
    List<PaymentSummaryDTO> getPaymentsByResident(String residentId);
    List<PaymentSummaryDTO> getPaymentsByInvoice(String invoiceId);
    
    Page<PaymentSummaryDTO> searchPayments(String societyId, String residentId, String invoiceId, PaymentStatus status, PaymentGateway gateway, PaymentMethod method, LocalDateTime startDate, LocalDateTime endDate, String keyword, int page, int size, String sortBy, String sortDir);
}
