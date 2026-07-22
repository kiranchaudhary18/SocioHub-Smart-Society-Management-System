package com.resicore.modules.billing.service;

import com.resicore.modules.billing.dto.InvoiceSummaryDTO;
import com.resicore.modules.billing.dto.UtilityBillRequestDTO;
import com.resicore.modules.billing.dto.UtilityBillResponseDTO;
import com.resicore.modules.billing.enums.InvoiceStatus;
import com.resicore.modules.billing.enums.PaymentStatus;
import com.resicore.modules.billing.enums.UtilityType;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;

public interface UtilityBillService {
    UtilityBillResponseDTO generateUtilityBill(UtilityBillRequestDTO requestDTO);
    UtilityBillResponseDTO updateUtilityBill(String id, UtilityBillRequestDTO requestDTO);
    void cancelUtilityBill(String id);
    
    UtilityBillResponseDTO getUtilityBillById(String id);
    
    Page<InvoiceSummaryDTO> searchUtilityBills(String societyId, String buildingId, String flatId, String residentId, UtilityType utilityType, Integer billingMonth, Integer billingYear, InvoiceStatus billStatus, PaymentStatus paymentStatus, LocalDateTime startDate, LocalDateTime endDate, String keyword, int page, int size, String sortBy, String sortDir);
}
