package com.resicore.modules.billing.service;

import com.resicore.modules.billing.dto.InvoiceSummaryDTO;
import com.resicore.modules.billing.dto.MaintenanceInvoiceRequestDTO;
import com.resicore.modules.billing.dto.MaintenanceInvoiceResponseDTO;
import com.resicore.modules.billing.enums.InvoiceStatus;
import com.resicore.modules.billing.enums.PaymentStatus;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;

public interface MaintenanceInvoiceService {
    MaintenanceInvoiceResponseDTO generateInvoice(MaintenanceInvoiceRequestDTO requestDTO);
    MaintenanceInvoiceResponseDTO updateInvoice(String id, MaintenanceInvoiceRequestDTO requestDTO);
    void cancelInvoice(String id);
    
    MaintenanceInvoiceResponseDTO getInvoiceById(String id);
    
    Page<InvoiceSummaryDTO> searchInvoices(String societyId, String buildingId, String flatId, String residentId, Integer billingMonth, Integer billingYear, InvoiceStatus invoiceStatus, PaymentStatus paymentStatus, LocalDateTime startDate, LocalDateTime endDate, String keyword, int page, int size, String sortBy, String sortDir);
}
