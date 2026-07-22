package com.resicore.modules.billing.mapper;

import com.resicore.modules.billing.dto.InvoiceSummaryDTO;
import com.resicore.modules.billing.dto.MaintenanceInvoiceRequestDTO;
import com.resicore.modules.billing.dto.MaintenanceInvoiceResponseDTO;
import com.resicore.modules.billing.dto.UtilityBillRequestDTO;
import com.resicore.modules.billing.dto.UtilityBillResponseDTO;
import com.resicore.modules.billing.entity.MaintenanceInvoice;
import com.resicore.modules.billing.entity.UtilityBill;
import org.springframework.stereotype.Component;

@Component
public class BillingMapper {

    // --- Maintenance Invoice Mappings ---

    public MaintenanceInvoice toMaintenanceEntity(MaintenanceInvoiceRequestDTO dto) {
        if (dto == null) {
            return null;
        }

        return MaintenanceInvoice.builder()
                .flatId(dto.getFlatId())
                .residentId(dto.getResidentId())
                .billingMonth(dto.getBillingMonth())
                .billingYear(dto.getBillingYear())
                .maintenanceAmount(dto.getMaintenanceAmount() != null ? dto.getMaintenanceAmount() : 0.0)
                .penaltyAmount(dto.getPenaltyAmount() != null ? dto.getPenaltyAmount() : 0.0)
                .discountAmount(dto.getDiscountAmount() != null ? dto.getDiscountAmount() : 0.0)
                .taxAmount(dto.getTaxAmount() != null ? dto.getTaxAmount() : 0.0)
                .dueDate(dto.getDueDate())
                .notes(dto.getNotes())
                .build();
    }

    public void updateMaintenanceEntityFromDto(MaintenanceInvoiceRequestDTO dto, MaintenanceInvoice entity) {
        if (dto == null || entity == null) {
            return;
        }

        entity.setBillingMonth(dto.getBillingMonth());
        entity.setBillingYear(dto.getBillingYear());
        entity.setMaintenanceAmount(dto.getMaintenanceAmount() != null ? dto.getMaintenanceAmount() : 0.0);
        entity.setPenaltyAmount(dto.getPenaltyAmount() != null ? dto.getPenaltyAmount() : 0.0);
        entity.setDiscountAmount(dto.getDiscountAmount() != null ? dto.getDiscountAmount() : 0.0);
        entity.setTaxAmount(dto.getTaxAmount() != null ? dto.getTaxAmount() : 0.0);
        entity.setDueDate(dto.getDueDate());
        
        if (dto.getNotes() != null) {
            entity.setNotes(dto.getNotes());
        }
    }

    public MaintenanceInvoiceResponseDTO toMaintenanceResponseDTO(MaintenanceInvoice entity, String flatNumber, String residentName) {
        if (entity == null) {
            return null;
        }

        return MaintenanceInvoiceResponseDTO.builder()
                .id(entity.getId())
                .invoiceNumber(entity.getInvoiceNumber())
                .societyId(entity.getSocietyId())
                .buildingId(entity.getBuildingId())
                .flatId(entity.getFlatId())
                .flatNumber(flatNumber)
                .residentId(entity.getResidentId())
                .residentName(residentName)
                .billingMonth(entity.getBillingMonth())
                .billingYear(entity.getBillingYear())
                .maintenanceAmount(entity.getMaintenanceAmount())
                .penaltyAmount(entity.getPenaltyAmount())
                .discountAmount(entity.getDiscountAmount())
                .taxAmount(entity.getTaxAmount())
                .totalAmount(entity.getTotalAmount())
                .paidAmount(entity.getPaidAmount())
                .dueAmount(entity.getDueAmount())
                .dueDate(entity.getDueDate())
                .invoiceStatus(entity.getInvoiceStatus())
                .paymentStatus(entity.getPaymentStatus())
                .paymentDate(entity.getPaymentDate())
                .generatedBy(entity.getGeneratedBy())
                .notes(entity.getNotes())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }
    
    public InvoiceSummaryDTO toMaintenanceSummaryDTO(MaintenanceInvoice entity, String flatNumber, String residentName) {
        if (entity == null) {
            return null;
        }

        return InvoiceSummaryDTO.builder()
                .id(entity.getId())
                .invoiceNumber(entity.getInvoiceNumber())
                .type("MAINTENANCE")
                .flatNumber(flatNumber)
                .residentName(residentName)
                .billingMonth(entity.getBillingMonth())
                .billingYear(entity.getBillingYear())
                .totalAmount(entity.getTotalAmount())
                .dueAmount(entity.getDueAmount())
                .dueDate(entity.getDueDate())
                .status(entity.getInvoiceStatus())
                .paymentStatus(entity.getPaymentStatus())
                .build();
    }

    // --- Utility Bill Mappings ---

    public UtilityBill toUtilityEntity(UtilityBillRequestDTO dto) {
        if (dto == null) {
            return null;
        }

        return UtilityBill.builder()
                .flatId(dto.getFlatId())
                .residentId(dto.getResidentId())
                .utilityType(dto.getUtilityType())
                .billingMonth(dto.getBillingMonth())
                .billingYear(dto.getBillingYear())
                .previousReading(dto.getPreviousReading())
                .currentReading(dto.getCurrentReading())
                .ratePerUnit(dto.getRatePerUnit())
                .fixedCharge(dto.getFixedCharge() != null ? dto.getFixedCharge() : 0.0)
                .taxAmount(dto.getTaxAmount() != null ? dto.getTaxAmount() : 0.0)
                .dueDate(dto.getDueDate())
                .build();
    }

    public void updateUtilityEntityFromDto(UtilityBillRequestDTO dto, UtilityBill entity) {
        if (dto == null || entity == null) {
            return;
        }
        
        entity.setUtilityType(dto.getUtilityType());
        entity.setBillingMonth(dto.getBillingMonth());
        entity.setBillingYear(dto.getBillingYear());
        entity.setPreviousReading(dto.getPreviousReading());
        entity.setCurrentReading(dto.getCurrentReading());
        entity.setRatePerUnit(dto.getRatePerUnit());
        entity.setFixedCharge(dto.getFixedCharge() != null ? dto.getFixedCharge() : 0.0);
        entity.setTaxAmount(dto.getTaxAmount() != null ? dto.getTaxAmount() : 0.0);
        entity.setDueDate(dto.getDueDate());
    }

    public UtilityBillResponseDTO toUtilityResponseDTO(UtilityBill entity, String flatNumber, String residentName) {
        if (entity == null) {
            return null;
        }

        return UtilityBillResponseDTO.builder()
                .id(entity.getId())
                .utilityNumber(entity.getUtilityNumber())
                .societyId(entity.getSocietyId())
                .buildingId(entity.getBuildingId())
                .flatId(entity.getFlatId())
                .flatNumber(flatNumber)
                .residentId(entity.getResidentId())
                .residentName(residentName)
                .utilityType(entity.getUtilityType())
                .billingMonth(entity.getBillingMonth())
                .billingYear(entity.getBillingYear())
                .previousReading(entity.getPreviousReading())
                .currentReading(entity.getCurrentReading())
                .unitsConsumed(entity.getUnitsConsumed())
                .ratePerUnit(entity.getRatePerUnit())
                .fixedCharge(entity.getFixedCharge())
                .taxAmount(entity.getTaxAmount())
                .totalAmount(entity.getTotalAmount())
                .dueDate(entity.getDueDate())
                .billStatus(entity.getBillStatus())
                .paymentStatus(entity.getPaymentStatus())
                .paymentDate(entity.getPaymentDate())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }
    
    public InvoiceSummaryDTO toUtilitySummaryDTO(UtilityBill entity, String flatNumber, String residentName) {
        if (entity == null) {
            return null;
        }

        return InvoiceSummaryDTO.builder()
                .id(entity.getId())
                .invoiceNumber(entity.getUtilityNumber())
                .type(entity.getUtilityType() != null ? entity.getUtilityType().name() : "UTILITY")
                .flatNumber(flatNumber)
                .residentName(residentName)
                .billingMonth(entity.getBillingMonth())
                .billingYear(entity.getBillingYear())
                .totalAmount(entity.getTotalAmount())
                .dueAmount(entity.getPaymentStatus() != com.resicore.modules.billing.enums.PaymentStatus.PAID ? entity.getTotalAmount() : 0.0)
                .dueDate(entity.getDueDate())
                .status(entity.getBillStatus())
                .paymentStatus(entity.getPaymentStatus())
                .build();
    }
}
