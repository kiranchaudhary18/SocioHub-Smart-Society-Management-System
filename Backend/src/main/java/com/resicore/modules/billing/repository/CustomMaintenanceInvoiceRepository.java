package com.resicore.modules.billing.repository;

import com.resicore.modules.billing.entity.MaintenanceInvoice;
import com.resicore.modules.billing.enums.InvoiceStatus;
import com.resicore.modules.billing.enums.PaymentStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;

public interface CustomMaintenanceInvoiceRepository {
    Page<MaintenanceInvoice> searchInvoices(String societyId, String buildingId, String flatId, String residentId, Integer billingMonth, Integer billingYear, InvoiceStatus invoiceStatus, PaymentStatus paymentStatus, LocalDateTime startDate, LocalDateTime endDate, String keyword, Pageable pageable);
}
