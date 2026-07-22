package com.resicore.modules.billing.controller;

import com.resicore.common.response.ApiResponse;
import com.resicore.modules.billing.dto.InvoiceSummaryDTO;
import com.resicore.modules.billing.dto.MaintenanceInvoiceRequestDTO;
import com.resicore.modules.billing.dto.MaintenanceInvoiceResponseDTO;
import com.resicore.modules.billing.enums.InvoiceStatus;
import com.resicore.modules.billing.enums.PaymentStatus;
import com.resicore.modules.billing.service.MaintenanceInvoiceService;
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
@RequestMapping("/api/v1/billing/maintenance")
@RequiredArgsConstructor
@Tag(name = "Maintenance Billing Controller", description = "Endpoints for managing and tracking flat maintenance invoices")
@SecurityRequirement(name = "bearerAuth")
public class MaintenanceBillingController {

    private final MaintenanceInvoiceService maintenanceService;

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Generate maintenance invoice", description = "Generates a new maintenance invoice for a specific flat and billing month.")
    public ResponseEntity<ApiResponse<MaintenanceInvoiceResponseDTO>> generateInvoice(
            @Valid @RequestBody MaintenanceInvoiceRequestDTO requestDTO) {
        MaintenanceInvoiceResponseDTO created = maintenanceService.generateInvoice(requestDTO);
        return new ResponseEntity<>(ApiResponse.success("Maintenance invoice generated successfully", created), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Update maintenance invoice", description = "Updates details of an unpaid maintenance invoice.")
    public ResponseEntity<ApiResponse<MaintenanceInvoiceResponseDTO>> updateInvoice(
            @PathVariable String id,
            @Valid @RequestBody MaintenanceInvoiceRequestDTO requestDTO) {
        MaintenanceInvoiceResponseDTO updated = maintenanceService.updateInvoice(id, requestDTO);
        return ResponseEntity.ok(ApiResponse.success("Maintenance invoice updated successfully", updated));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_STAFF', 'ROLE_RESIDENT')")
    @Operation(summary = "Get invoice by ID", description = "Retrieves maintenance invoice details by its ID.")
    public ResponseEntity<ApiResponse<MaintenanceInvoiceResponseDTO>> getInvoiceById(
            @PathVariable String id) {
        MaintenanceInvoiceResponseDTO response = maintenanceService.getInvoiceById(id);
        return ResponseEntity.ok(ApiResponse.success("Invoice retrieved successfully", response));
    }

    @GetMapping("/search")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_STAFF', 'ROLE_RESIDENT')")
    @Operation(summary = "Search maintenance invoices", description = "Search, filter, and paginate through maintenance invoices.")
    public ResponseEntity<ApiResponse<Page<InvoiceSummaryDTO>>> searchInvoices(
            @Parameter(description = "Filter by society ID") @RequestParam(required = false) String societyId,
            @Parameter(description = "Filter by building ID") @RequestParam(required = false) String buildingId,
            @Parameter(description = "Filter by flat ID") @RequestParam(required = false) String flatId,
            @Parameter(description = "Filter by resident ID") @RequestParam(required = false) String residentId,
            @Parameter(description = "Filter by billing month (1-12)") @RequestParam(required = false) Integer billingMonth,
            @Parameter(description = "Filter by billing year") @RequestParam(required = false) Integer billingYear,
            @Parameter(description = "Filter by invoice status") @RequestParam(required = false) InvoiceStatus invoiceStatus,
            @Parameter(description = "Filter by payment status") @RequestParam(required = false) PaymentStatus paymentStatus,
            @Parameter(description = "Creation start date") @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @Parameter(description = "Creation end date") @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate,
            @Parameter(description = "Keyword to search invoice number or notes") @RequestParam(required = false) String keyword,
            @Parameter(description = "Page number (0-based)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "10") int size,
            @Parameter(description = "Sort by field") @RequestParam(defaultValue = "createdAt") String sortBy,
            @Parameter(description = "Sort direction (asc/desc)") @RequestParam(defaultValue = "desc") String sortDir) {

        Page<InvoiceSummaryDTO> response = maintenanceService.searchInvoices(societyId, buildingId, flatId, residentId, billingMonth, billingYear, invoiceStatus, paymentStatus, startDate, endDate, keyword, page, size, sortBy, sortDir);
        return ResponseEntity.ok(ApiResponse.success("Invoices retrieved successfully", response));
    }
    
    @PatchMapping("/{id}/cancel")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Cancel maintenance invoice", description = "Cancels an unpaid maintenance invoice.")
    public ResponseEntity<ApiResponse<Void>> cancelInvoice(
            @PathVariable String id) {
        maintenanceService.cancelInvoice(id);
        return ResponseEntity.ok(ApiResponse.success("Invoice cancelled successfully", null));
    }
}
