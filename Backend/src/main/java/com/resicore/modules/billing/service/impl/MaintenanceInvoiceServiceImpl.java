package com.resicore.modules.billing.service.impl;

import com.resicore.common.enums.Role;
import com.resicore.exception.ResourceNotFoundException;
import com.resicore.modules.billing.dto.InvoiceSummaryDTO;
import com.resicore.modules.billing.dto.MaintenanceInvoiceRequestDTO;
import com.resicore.modules.billing.dto.MaintenanceInvoiceResponseDTO;
import com.resicore.modules.billing.entity.MaintenanceInvoice;
import com.resicore.modules.billing.enums.InvoiceStatus;
import com.resicore.modules.billing.enums.PaymentStatus;
import com.resicore.modules.billing.mapper.BillingMapper;
import com.resicore.modules.billing.repository.MaintenanceInvoiceRepository;
import com.resicore.modules.billing.service.MaintenanceInvoiceService;
import com.resicore.modules.flat.entity.Flat;
import com.resicore.modules.flat.repository.FlatRepository;
import com.resicore.modules.resident.entity.Resident;
import com.resicore.modules.resident.repository.ResidentRepository;
import com.resicore.modules.user.entity.User;
import com.resicore.modules.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class MaintenanceInvoiceServiceImpl implements MaintenanceInvoiceService {

    private final MaintenanceInvoiceRepository maintenanceInvoiceRepository;
    private final FlatRepository flatRepository;
    private final ResidentRepository residentRepository;
    private final UserRepository userRepository;
    private final BillingMapper billingMapper;

    @Override
    @Transactional
    public MaintenanceInvoiceResponseDTO generateInvoice(MaintenanceInvoiceRequestDTO requestDTO) {
        log.info("Generating maintenance invoice for flat {}, month {}, year {}", requestDTO.getFlatId(), requestDTO.getBillingMonth(), requestDTO.getBillingYear());

        Flat flat = flatRepository.findByIdAndIsDeletedFalse(requestDTO.getFlatId())
                .orElseThrow(() -> new ResourceNotFoundException("Flat not found"));
        
        Resident resident = residentRepository.findByIdAndIsDeletedFalse(requestDTO.getResidentId())
                .orElseThrow(() -> new ResourceNotFoundException("Resident not found"));

        if (!resident.getFlatId().equals(flat.getId())) {
            throw new IllegalArgumentException("Resident does not belong to the specified flat.");
        }

        validateAdminAccess(flat.getSocietyId());

        boolean exists = maintenanceInvoiceRepository.existsByFlatIdAndBillingMonthAndBillingYearAndIsDeletedFalse(
                flat.getId(), requestDTO.getBillingMonth(), requestDTO.getBillingYear());
        
        if (exists) {
            throw new IllegalArgumentException("Maintenance invoice already exists for this flat for the specified billing month and year.");
        }

        MaintenanceInvoice invoice = billingMapper.toMaintenanceEntity(requestDTO);
        
        invoice.setInvoiceNumber(generateInvoiceNumber());
        invoice.setSocietyId(flat.getSocietyId());
        invoice.setBuildingId(flat.getBuildingId());
        
        calculateTotals(invoice);
        
        invoice.setInvoiceStatus(InvoiceStatus.GENERATED);
        invoice.setPaymentStatus(PaymentStatus.UNPAID);
        
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated()) {
            invoice.setGeneratedBy(auth.getName());
        }

        invoice = maintenanceInvoiceRepository.save(invoice);
        log.info("Successfully generated invoice {}", invoice.getInvoiceNumber());
        
        return billingMapper.toMaintenanceResponseDTO(invoice, flat.getFlatNumber(), resident.getFullName());
    }

    @Override
    @Transactional
    public MaintenanceInvoiceResponseDTO updateInvoice(String id, MaintenanceInvoiceRequestDTO requestDTO) {
        log.info("Updating maintenance invoice {}", id);

        MaintenanceInvoice invoice = maintenanceInvoiceRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Maintenance invoice not found: " + id));

        validateAdminAccess(invoice.getSocietyId());

        if (invoice.getInvoiceStatus() == InvoiceStatus.PAID || invoice.getInvoiceStatus() == InvoiceStatus.CANCELLED) {
            throw new IllegalArgumentException("Cannot modify a PAID or CANCELLED invoice.");
        }

        // Check if modifying billing month/year causes a duplicate
        if (!invoice.getBillingMonth().equals(requestDTO.getBillingMonth()) || !invoice.getBillingYear().equals(requestDTO.getBillingYear())) {
            boolean exists = maintenanceInvoiceRepository.existsByFlatIdAndBillingMonthAndBillingYearAndIsDeletedFalse(
                    invoice.getFlatId(), requestDTO.getBillingMonth(), requestDTO.getBillingYear());
            if (exists) {
                throw new IllegalArgumentException("Maintenance invoice already exists for this flat for the updated billing month and year.");
            }
        }

        billingMapper.updateMaintenanceEntityFromDto(requestDTO, invoice);
        calculateTotals(invoice);

        invoice = maintenanceInvoiceRepository.save(invoice);
        
        Flat flat = flatRepository.findByIdAndIsDeletedFalse(invoice.getFlatId()).orElse(null);
        Resident resident = residentRepository.findByIdAndIsDeletedFalse(invoice.getResidentId()).orElse(null);
        
        return billingMapper.toMaintenanceResponseDTO(
                invoice, 
                flat != null ? flat.getFlatNumber() : "Unknown", 
                resident != null ? resident.getFullName() : "Unknown"
        );
    }

    @Override
    @Transactional
    public void cancelInvoice(String id) {
        log.info("Cancelling invoice {}", id);

        MaintenanceInvoice invoice = maintenanceInvoiceRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Maintenance invoice not found: " + id));

        validateAdminAccess(invoice.getSocietyId());

        if (invoice.getInvoiceStatus() == InvoiceStatus.PAID) {
            throw new IllegalArgumentException("Cannot cancel a fully PAID invoice.");
        }

        invoice.setInvoiceStatus(InvoiceStatus.CANCELLED);
        maintenanceInvoiceRepository.save(invoice);
    }

    @Override
    public MaintenanceInvoiceResponseDTO getInvoiceById(String id) {
        MaintenanceInvoice invoice = maintenanceInvoiceRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Maintenance invoice not found: " + id));
                
        validateReadAccess(invoice.getSocietyId(), invoice.getResidentId());

        Flat flat = flatRepository.findByIdAndIsDeletedFalse(invoice.getFlatId()).orElse(null);
        Resident resident = residentRepository.findByIdAndIsDeletedFalse(invoice.getResidentId()).orElse(null);
        
        return billingMapper.toMaintenanceResponseDTO(
                invoice, 
                flat != null ? flat.getFlatNumber() : "Unknown", 
                resident != null ? resident.getFullName() : "Unknown"
        );
    }

    @Override
    public Page<InvoiceSummaryDTO> searchInvoices(String societyId, String buildingId, String flatId, String residentId, Integer billingMonth, Integer billingYear, InvoiceStatus invoiceStatus, PaymentStatus paymentStatus, LocalDateTime startDate, LocalDateTime endDate, String keyword, int page, int size, String sortBy, String sortDir) {
        
        if (societyId != null) {
            // Verify if resident is searching, they can only see their own
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth != null && auth.isAuthenticated() && !auth.getName().equals("anonymousUser")) {
                User user = userRepository.findByEmail(auth.getName()).orElse(null);
                if (user != null && user.getRole() == Role.RESIDENT) {
                    Resident resident = residentRepository.findByUserIdAndIsDeletedFalse(user.getId()).orElse(null);
                    if (resident != null) {
                        residentId = resident.getId(); // Force resident filter
                    }
                } else if (user != null && user.getRole() == Role.SOCIETY_ADMIN) {
                    societyId = user.getSocietyId(); // Force society filter for admins
                }
            }
        }
        
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Page<MaintenanceInvoice> invoicePage = maintenanceInvoiceRepository.searchInvoices(societyId, buildingId, flatId, residentId, billingMonth, billingYear, invoiceStatus, paymentStatus, startDate, endDate, keyword, pageable);
        
        List<String> flatIds = invoicePage.getContent().stream().map(MaintenanceInvoice::getFlatId).distinct().collect(Collectors.toList());
        List<String> residentIds = invoicePage.getContent().stream().map(MaintenanceInvoice::getResidentId).distinct().collect(Collectors.toList());
        
        Map<String, String> flatNumbers = flatRepository.findAllById(flatIds).stream()
                .collect(Collectors.toMap(Flat::getId, Flat::getFlatNumber));
        Map<String, String> residentNames = residentRepository.findAllById(residentIds).stream()
                .collect(Collectors.toMap(Resident::getId, Resident::getFullName));
                
        return invoicePage.map(inv -> billingMapper.toMaintenanceSummaryDTO(
                inv, 
                flatNumbers.getOrDefault(inv.getFlatId(), "Unknown"), 
                residentNames.getOrDefault(inv.getResidentId(), "Unknown")
        ));
    }

    // --- Helper Methods ---

    private String generateInvoiceNumber() {
        return "INV-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
    
    private void calculateTotals(MaintenanceInvoice invoice) {
        double maint = invoice.getMaintenanceAmount() != null ? invoice.getMaintenanceAmount() : 0.0;
        double penalty = invoice.getPenaltyAmount() != null ? invoice.getPenaltyAmount() : 0.0;
        double discount = invoice.getDiscountAmount() != null ? invoice.getDiscountAmount() : 0.0;
        double tax = invoice.getTaxAmount() != null ? invoice.getTaxAmount() : 0.0;
        
        double total = (maint + penalty + tax) - discount;
        if (total < 0) total = 0.0;
        
        invoice.setTotalAmount(total);
        
        double paid = invoice.getPaidAmount() != null ? invoice.getPaidAmount() : 0.0;
        double due = total - paid;
        if (due < 0) due = 0.0;
        
        invoice.setDueAmount(due);
        
        // Auto update payment status based on calculation
        if (paid >= total && total > 0) {
            invoice.setPaymentStatus(PaymentStatus.PAID);
            if (invoice.getPaymentDate() == null) {
                invoice.setPaymentDate(LocalDateTime.now());
            }
        } else if (paid > 0 && paid < total) {
            invoice.setPaymentStatus(PaymentStatus.PARTIALLY_PAID);
        } else {
            invoice.setPaymentStatus(PaymentStatus.UNPAID);
        }
    }

    private void validateAdminAccess(String targetSocietyId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !auth.getName().equals("anonymousUser")) {
            String email = auth.getName();
            User user = userRepository.findByEmail(email).orElse(null);
            
            if (user != null) {
                if (user.getRole() == Role.SOCIETY_ADMIN && !user.getSocietyId().equals(targetSocietyId)) {
                    throw new AccessDeniedException("SOCIETY_ADMIN can only manage resources belonging to their own society.");
                }
                if (user.getRole() == Role.STAFF || user.getRole() == Role.RESIDENT) {
                     throw new AccessDeniedException("Insufficient privileges for this action.");
                }
            }
        }
    }
    
    private void validateReadAccess(String targetSocietyId, String targetResidentId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !auth.getName().equals("anonymousUser")) {
            String email = auth.getName();
            User user = userRepository.findByEmail(email).orElse(null);
            
            if (user != null) {
                if (user.getRole() == Role.SOCIETY_ADMIN && !user.getSocietyId().equals(targetSocietyId)) {
                    throw new AccessDeniedException("SOCIETY_ADMIN can only view resources belonging to their own society.");
                }
                if (user.getRole() == Role.RESIDENT) {
                    Resident resident = residentRepository.findByUserIdAndIsDeletedFalse(user.getId())
                            .orElseThrow(() -> new ResourceNotFoundException("Resident profile not found"));
                    if (!resident.getId().equals(targetResidentId)) {
                        throw new AccessDeniedException("RESIDENT can only view their own invoices.");
                    }
                }
            }
        }
    }
}
