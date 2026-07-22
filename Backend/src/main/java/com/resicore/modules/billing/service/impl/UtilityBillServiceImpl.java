package com.resicore.modules.billing.service.impl;

import com.resicore.common.enums.Role;
import com.resicore.exception.ResourceNotFoundException;
import com.resicore.modules.billing.dto.InvoiceSummaryDTO;
import com.resicore.modules.billing.dto.UtilityBillRequestDTO;
import com.resicore.modules.billing.dto.UtilityBillResponseDTO;
import com.resicore.modules.billing.entity.UtilityBill;
import com.resicore.modules.billing.enums.InvoiceStatus;
import com.resicore.modules.billing.enums.PaymentStatus;
import com.resicore.modules.billing.enums.UtilityType;
import com.resicore.modules.billing.mapper.BillingMapper;
import com.resicore.modules.billing.repository.UtilityBillRepository;
import com.resicore.modules.billing.service.UtilityBillService;
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
public class UtilityBillServiceImpl implements UtilityBillService {

    private final UtilityBillRepository utilityBillRepository;
    private final FlatRepository flatRepository;
    private final ResidentRepository residentRepository;
    private final UserRepository userRepository;
    private final BillingMapper billingMapper;

    @Override
    @Transactional
    public UtilityBillResponseDTO generateUtilityBill(UtilityBillRequestDTO requestDTO) {
        log.info("Generating utility bill for flat {}, type {}, month {}, year {}", requestDTO.getFlatId(), requestDTO.getUtilityType(), requestDTO.getBillingMonth(), requestDTO.getBillingYear());

        Flat flat = flatRepository.findByIdAndIsDeletedFalse(requestDTO.getFlatId())
                .orElseThrow(() -> new ResourceNotFoundException("Flat not found"));
        
        Resident resident = residentRepository.findByIdAndIsDeletedFalse(requestDTO.getResidentId())
                .orElseThrow(() -> new ResourceNotFoundException("Resident not found"));

        if (!resident.getFlatId().equals(flat.getId())) {
            throw new IllegalArgumentException("Resident does not belong to the specified flat.");
        }

        validateAdminAccess(flat.getSocietyId());

        if (requestDTO.getCurrentReading() < requestDTO.getPreviousReading()) {
            throw new IllegalArgumentException("Current reading cannot be less than previous reading.");
        }

        UtilityBill bill = billingMapper.toUtilityEntity(requestDTO);
        
        bill.setUtilityNumber(generateUtilityNumber());
        bill.setSocietyId(flat.getSocietyId());
        bill.setBuildingId(flat.getBuildingId());
        
        calculateTotals(bill);
        
        bill.setBillStatus(InvoiceStatus.GENERATED);
        bill.setPaymentStatus(PaymentStatus.UNPAID);
        
        bill = utilityBillRepository.save(bill);
        log.info("Successfully generated utility bill {}", bill.getUtilityNumber());
        
        return billingMapper.toUtilityResponseDTO(bill, flat.getFlatNumber(), resident.getFullName());
    }

    @Override
    @Transactional
    public UtilityBillResponseDTO updateUtilityBill(String id, UtilityBillRequestDTO requestDTO) {
        log.info("Updating utility bill {}", id);

        UtilityBill bill = utilityBillRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Utility bill not found: " + id));

        validateAdminAccess(bill.getSocietyId());

        if (bill.getBillStatus() == InvoiceStatus.PAID || bill.getBillStatus() == InvoiceStatus.CANCELLED) {
            throw new IllegalArgumentException("Cannot modify a PAID or CANCELLED utility bill.");
        }

        if (requestDTO.getCurrentReading() < requestDTO.getPreviousReading()) {
            throw new IllegalArgumentException("Current reading cannot be less than previous reading.");
        }

        billingMapper.updateUtilityEntityFromDto(requestDTO, bill);
        calculateTotals(bill);

        bill = utilityBillRepository.save(bill);
        
        Flat flat = flatRepository.findByIdAndIsDeletedFalse(bill.getFlatId()).orElse(null);
        Resident resident = residentRepository.findByIdAndIsDeletedFalse(bill.getResidentId()).orElse(null);
        
        return billingMapper.toUtilityResponseDTO(
                bill, 
                flat != null ? flat.getFlatNumber() : "Unknown", 
                resident != null ? resident.getFullName() : "Unknown"
        );
    }

    @Override
    @Transactional
    public void cancelUtilityBill(String id) {
        log.info("Cancelling utility bill {}", id);

        UtilityBill bill = utilityBillRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Utility bill not found: " + id));

        validateAdminAccess(bill.getSocietyId());

        if (bill.getBillStatus() == InvoiceStatus.PAID) {
            throw new IllegalArgumentException("Cannot cancel a fully PAID utility bill.");
        }

        bill.setBillStatus(InvoiceStatus.CANCELLED);
        utilityBillRepository.save(bill);
    }

    @Override
    public UtilityBillResponseDTO getUtilityBillById(String id) {
        UtilityBill bill = utilityBillRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Utility bill not found: " + id));
                
        validateReadAccess(bill.getSocietyId(), bill.getResidentId());

        Flat flat = flatRepository.findByIdAndIsDeletedFalse(bill.getFlatId()).orElse(null);
        Resident resident = residentRepository.findByIdAndIsDeletedFalse(bill.getResidentId()).orElse(null);
        
        return billingMapper.toUtilityResponseDTO(
                bill, 
                flat != null ? flat.getFlatNumber() : "Unknown", 
                resident != null ? resident.getFullName() : "Unknown"
        );
    }

    @Override
    public Page<InvoiceSummaryDTO> searchUtilityBills(String societyId, String buildingId, String flatId, String residentId, UtilityType utilityType, Integer billingMonth, Integer billingYear, InvoiceStatus billStatus, PaymentStatus paymentStatus, LocalDateTime startDate, LocalDateTime endDate, String keyword, int page, int size, String sortBy, String sortDir) {
        
        if (societyId != null) {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth != null && auth.isAuthenticated() && !auth.getName().equals("anonymousUser")) {
                User user = userRepository.findByEmail(auth.getName()).orElse(null);
                if (user != null && user.getRole() == Role.RESIDENT) {
                    Resident resident = residentRepository.findByUserIdAndIsDeletedFalse(user.getId()).orElse(null);
                    if (resident != null) {
                        residentId = resident.getId();
                    }
                } else if (user != null && user.getRole() == Role.SOCIETY_ADMIN) {
                    societyId = user.getSocietyId();
                }
            }
        }
        
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Page<UtilityBill> billPage = utilityBillRepository.searchUtilityBills(societyId, buildingId, flatId, residentId, utilityType, billingMonth, billingYear, billStatus, paymentStatus, startDate, endDate, keyword, pageable);
        
        List<String> flatIds = billPage.getContent().stream().map(UtilityBill::getFlatId).distinct().collect(Collectors.toList());
        List<String> residentIds = billPage.getContent().stream().map(UtilityBill::getResidentId).distinct().collect(Collectors.toList());
        
        Map<String, String> flatNumbers = flatRepository.findAllById(flatIds).stream()
                .collect(Collectors.toMap(Flat::getId, Flat::getFlatNumber));
        Map<String, String> residentNames = residentRepository.findAllById(residentIds).stream()
                .collect(Collectors.toMap(Resident::getId, Resident::getFullName));
                
        return billPage.map(bill -> billingMapper.toUtilitySummaryDTO(
                bill, 
                flatNumbers.getOrDefault(bill.getFlatId(), "Unknown"), 
                residentNames.getOrDefault(bill.getResidentId(), "Unknown")
        ));
    }

    // --- Helper Methods ---

    private String generateUtilityNumber() {
        return "UTL-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
    
    private void calculateTotals(UtilityBill bill) {
        double current = bill.getCurrentReading() != null ? bill.getCurrentReading() : 0.0;
        double previous = bill.getPreviousReading() != null ? bill.getPreviousReading() : 0.0;
        
        double consumed = current - previous;
        if (consumed < 0) consumed = 0.0;
        bill.setUnitsConsumed(consumed);
        
        double rate = bill.getRatePerUnit() != null ? bill.getRatePerUnit() : 0.0;
        double fixed = bill.getFixedCharge() != null ? bill.getFixedCharge() : 0.0;
        double tax = bill.getTaxAmount() != null ? bill.getTaxAmount() : 0.0;
        
        double total = (consumed * rate) + fixed + tax;
        bill.setTotalAmount(total);
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
                        throw new AccessDeniedException("RESIDENT can only view their own bills.");
                    }
                }
            }
        }
    }
}
