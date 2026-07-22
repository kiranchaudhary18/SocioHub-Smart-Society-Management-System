package com.resicore.modules.billing.controller;

import com.resicore.common.response.ApiResponse;
import com.resicore.modules.billing.dto.InvoiceSummaryDTO;
import com.resicore.modules.billing.dto.UtilityBillRequestDTO;
import com.resicore.modules.billing.dto.UtilityBillResponseDTO;
import com.resicore.modules.billing.enums.InvoiceStatus;
import com.resicore.modules.billing.enums.PaymentStatus;
import com.resicore.modules.billing.enums.UtilityType;
import com.resicore.modules.billing.service.UtilityBillService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/v1/billing/utilities")
@RequiredArgsConstructor
@Tag(name = "Utility Billing Controller", description = "Endpoints for managing consumption-based utility bills (electricity, water, etc.)")
@SecurityRequirement(name = "bearerAuth")
public class UtilityBillingController {

    private final UtilityBillService utilityService;

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Generate utility bill", description = "Generates a new utility bill based on consumption readings.")
    public ResponseEntity<ApiResponse<UtilityBillResponseDTO>> generateUtilityBill(
            @Valid @RequestBody UtilityBillRequestDTO requestDTO) {
        UtilityBillResponseDTO created = utilityService.generateUtilityBill(requestDTO);
        return new ResponseEntity<>(ApiResponse.success("Utility bill generated successfully", created), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Update utility bill", description = "Updates details of an unpaid utility bill.")
    public ResponseEntity<ApiResponse<UtilityBillResponseDTO>> updateUtilityBill(
            @PathVariable String id,
            @Valid @RequestBody UtilityBillRequestDTO requestDTO) {
        UtilityBillResponseDTO updated = utilityService.updateUtilityBill(id, requestDTO);
        return ResponseEntity.ok(ApiResponse.success("Utility bill updated successfully", updated));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_STAFF', 'ROLE_RESIDENT')")
    @Operation(summary = "Get utility bill by ID", description = "Retrieves utility bill details by its ID.")
    public ResponseEntity<ApiResponse<UtilityBillResponseDTO>> getUtilityBillById(
            @PathVariable String id) {
        UtilityBillResponseDTO response = utilityService.getUtilityBillById(id);
        return ResponseEntity.ok(ApiResponse.success("Utility bill retrieved successfully", response));
    }

    @GetMapping("/search")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_STAFF', 'ROLE_RESIDENT')")
    @Operation(summary = "Search utility bills", description = "Search, filter, and paginate through utility bills.")
    public ResponseEntity<ApiResponse<Page<InvoiceSummaryDTO>>> searchUtilityBills(
            @Parameter(description = "Filter by society ID") @RequestParam(required = false) String societyId,
            @Parameter(description = "Filter by building ID") @RequestParam(required = false) String buildingId,
            @Parameter(description = "Filter by flat ID") @RequestParam(required = false) String flatId,
            @Parameter(description = "Filter by resident ID") @RequestParam(required = false) String residentId,
            @Parameter(description = "Filter by utility type") @RequestParam(required = false) UtilityType utilityType,
            @Parameter(description = "Filter by billing month (1-12)") @RequestParam(required = false) Integer billingMonth,
            @Parameter(description = "Filter by billing year") @RequestParam(required = false) Integer billingYear,
            @Parameter(description = "Filter by bill status") @RequestParam(required = false) InvoiceStatus billStatus,
            @Parameter(description = "Filter by payment status") @RequestParam(required = false) PaymentStatus paymentStatus,
            @Parameter(description = "Creation start date") @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @Parameter(description = "Creation end date") @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate,
            @Parameter(description = "Keyword to search utility number") @RequestParam(required = false) String keyword,
            @Parameter(description = "Page number (0-based)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "10") int size,
            @Parameter(description = "Sort by field") @RequestParam(defaultValue = "createdAt") String sortBy,
            @Parameter(description = "Sort direction (asc/desc)") @RequestParam(defaultValue = "desc") String sortDir) {

        Page<InvoiceSummaryDTO> response = utilityService.searchUtilityBills(societyId, buildingId, flatId, residentId, utilityType, billingMonth, billingYear, billStatus, paymentStatus, startDate, endDate, keyword, page, size, sortBy, sortDir);
        return ResponseEntity.ok(ApiResponse.success("Utility bills retrieved successfully", response));
    }
    
    @PatchMapping("/{id}/cancel")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Cancel utility bill", description = "Cancels an unpaid utility bill.")
    public ResponseEntity<ApiResponse<Void>> cancelUtilityBill(
            @PathVariable String id) {
        utilityService.cancelUtilityBill(id);
        return ResponseEntity.ok(ApiResponse.success("Utility bill cancelled successfully", null));
    }
}
