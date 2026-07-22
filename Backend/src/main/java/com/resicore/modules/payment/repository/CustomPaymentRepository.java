package com.resicore.modules.payment.repository;

import com.resicore.modules.payment.entity.Payment;
import com.resicore.modules.payment.enums.PaymentGateway;
import com.resicore.modules.payment.enums.PaymentMethod;
import com.resicore.modules.payment.enums.PaymentStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;

public interface CustomPaymentRepository {
    Page<Payment> searchPayments(String societyId, String residentId, String invoiceId, PaymentStatus status, PaymentGateway gateway, PaymentMethod method, LocalDateTime startDate, LocalDateTime endDate, String keyword, Pageable pageable);
}
