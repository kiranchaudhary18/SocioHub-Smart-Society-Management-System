package com.resicore.modules.societyadmin.controller;

import com.resicore.common.response.ApiResponse;
import com.resicore.modules.payment.entity.Payment;
import com.resicore.modules.societyadmin.service.SocietyAdminPaymentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/society-admin/payment")
@RequiredArgsConstructor
@Tag(name = "Society Admin - Payment Management", description = "APIs for managing society payments and revenue")
public class SocietyAdminPaymentController {

    private final SocietyAdminPaymentService paymentService;

    @GetMapping("/outstanding-dues/{societyId}")
    @PreAuthorize("hasAnyAuthority('ROLE_SOCIETY_ADMIN', 'ROLE_SUPER_ADMIN')")
    @Operation(summary = "Get Outstanding Dues", description = "Retrieves a paginated list of outstanding and overdue payments")
    public ResponseEntity<ApiResponse<Page<Payment>>> getOutstandingDues(
            @PathVariable String societyId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Payment> payments = paymentService.getOutstandingDues(societyId, pageable);
        return ResponseEntity.ok(ApiResponse.success("Outstanding dues fetched successfully", payments));
    }

    @GetMapping("/monthly-collection/{societyId}")
    @PreAuthorize("hasAnyAuthority('ROLE_SOCIETY_ADMIN', 'ROLE_SUPER_ADMIN')")
    @Operation(summary = "Get Monthly Collection", description = "Calculates the total revenue collected in a specific month")
    public ResponseEntity<ApiResponse<Double>> getMonthlyCollection(
            @PathVariable String societyId,
            @RequestParam int year,
            @RequestParam int month) {
        double collection = paymentService.getMonthlyCollection(societyId, year, month);
        return ResponseEntity.ok(ApiResponse.success("Monthly collection fetched successfully", collection));
    }

    @GetMapping("/pending/{societyId}")
    @PreAuthorize("hasAnyAuthority('ROLE_SOCIETY_ADMIN', 'ROLE_SUPER_ADMIN')")
    @Operation(summary = "Get Pending Payments", description = "Retrieves a paginated list of pending payments")
    public ResponseEntity<ApiResponse<Page<Payment>>> getPendingPayments(
            @PathVariable String societyId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Payment> payments = paymentService.getPendingPayments(societyId, pageable);
        return ResponseEntity.ok(ApiResponse.success("Pending payments fetched successfully", payments));
    }

    @GetMapping("/statistics/{societyId}")
    @PreAuthorize("hasAnyAuthority('ROLE_SOCIETY_ADMIN', 'ROLE_SUPER_ADMIN')")
    @Operation(summary = "Get Payment Statistics", description = "Retrieves aggregated statistics on payments")
    public ResponseEntity<ApiResponse<Object>> getPaymentStatistics(@PathVariable String societyId) {
        Object stats = paymentService.getPaymentStatistics(societyId);
        return ResponseEntity.ok(ApiResponse.success("Payment statistics fetched successfully", stats));
    }

    @GetMapping("/revenue/{societyId}")
    @PreAuthorize("hasAnyAuthority('ROLE_SOCIETY_ADMIN', 'ROLE_SUPER_ADMIN')")
    @Operation(summary = "Get Revenue Summary", description = "Retrieves the total revenue summary")
    public ResponseEntity<ApiResponse<Object>> getRevenueSummary(@PathVariable String societyId) {
        Object summary = paymentService.getRevenueSummary(societyId);
        return ResponseEntity.ok(ApiResponse.success("Revenue summary fetched successfully", summary));
    }
}
