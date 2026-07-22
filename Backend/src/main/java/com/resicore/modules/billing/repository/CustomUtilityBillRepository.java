package com.resicore.modules.billing.repository;

import com.resicore.modules.billing.entity.UtilityBill;
import com.resicore.modules.billing.enums.InvoiceStatus;
import com.resicore.modules.billing.enums.PaymentStatus;
import com.resicore.modules.billing.enums.UtilityType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;

public interface CustomUtilityBillRepository {
    Page<UtilityBill> searchUtilityBills(String societyId, String buildingId, String flatId, String residentId, UtilityType utilityType, Integer billingMonth, Integer billingYear, InvoiceStatus billStatus, PaymentStatus paymentStatus, LocalDateTime startDate, LocalDateTime endDate, String keyword, Pageable pageable);
}
