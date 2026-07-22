package com.resicore.modules.societyadmin.service;

import com.resicore.modules.payment.entity.Payment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SocietyAdminPaymentService {
    Page<Payment> getOutstandingDues(String societyId, Pageable pageable);
    double getMonthlyCollection(String societyId, int year, int month);
    Page<Payment> getPendingPayments(String societyId, Pageable pageable);
    Object getPaymentStatistics(String societyId);
    Object getRevenueSummary(String societyId);
}
