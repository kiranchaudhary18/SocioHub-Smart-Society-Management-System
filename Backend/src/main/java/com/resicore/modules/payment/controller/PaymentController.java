package com.resicore.modules.payment.controller;

import com.resicore.common.response.ApiResponse;
import com.resicore.modules.payment.dto.OfflinePaymentDTO;
import com.resicore.modules.payment.dto.PaymentRequestDTO;
import com.resicore.modules.payment.dto.PaymentResponseDTO;
import com.resicore.modules.payment.dto.PaymentSummaryDTO;
import com.resicore.modules.payment.dto.RefundRequestDTO;
import com.resicore.modules.payment.dto.WebhookDTO;
import com.resicore.modules.payment.enums.PaymentGateway;
import com.resicore.modules.payment.enums.PaymentMethod;
import com.resicore.modules.payment.enums.PaymentStatus;
import com.resicore.modules.payment.service.PaymentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/payments")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Payment Controller", description = "Endpoints for initiating and managing payments, including offline records and webhooks.")
@SecurityRequirement(name = "bearerAuth")
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_RESIDENT')")
    @Operation(summary = "Initiate an online payment", description = "Generates a transaction session ID via gateway integration.")
    public ResponseEntity<ApiResponse<PaymentResponseDTO>> initiatePayment(
            @Valid @RequestBody PaymentRequestDTO requestDTO) {
        PaymentResponseDTO created = paymentService.initiatePayment(requestDTO);
        return new ResponseEntity<>(ApiResponse.success("Payment initiated successfully", created), HttpStatus.CREATED);
    }

    @PostMapping("/offline")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Record offline payment", description = "SOCIETY_ADMINs can manually log Cash or Cheque payments instantly.")
    public ResponseEntity<ApiResponse<PaymentResponseDTO>> recordOfflinePayment(
            @Valid @RequestBody OfflinePaymentDTO requestDTO) {
        PaymentResponseDTO created = paymentService.recordOfflinePayment(requestDTO);
        return new ResponseEntity<>(ApiResponse.success("Offline payment recorded successfully", created), HttpStatus.CREATED);
    }

    @PostMapping("/verify")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_RESIDENT')")
    @Operation(summary = "Verify frontend payment callback", description = "Manually trigger verification of a gateway callback signature.")
    public ResponseEntity<ApiResponse<PaymentResponseDTO>> verifyPayment(
            @RequestParam String transactionId,
            @RequestParam String gatewayTransactionId,
            @RequestParam String signature) {
        PaymentResponseDTO verified = paymentService.verifyPayment(transactionId, gatewayTransactionId, signature);
        return ResponseEntity.ok(ApiResponse.success("Payment verification processed", verified));
    }
    
    @PostMapping("/refund")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Process refund", description = "Initiate a partial or full refund for a SUCCESSFUL payment.")
    public ResponseEntity<ApiResponse<PaymentResponseDTO>> processRefund(
            @RequestParam String transactionId,
            @Valid @RequestBody RefundRequestDTO refundDTO) {
        PaymentResponseDTO refunded = paymentService.processRefund(transactionId, refundDTO);
        return ResponseEntity.ok(ApiResponse.success("Refund processed successfully", refunded));
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_STAFF')")
    @Operation(summary = "Get all payments (Admin)", description = "Use the Search endpoint for pagination and filtering.")
    public ResponseEntity<ApiResponse<String>> getAllPayments() {
        return ResponseEntity.ok(ApiResponse.success("Use /search for fetching payments", null));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_STAFF', 'ROLE_RESIDENT')")
    @Operation(summary = "Get payment by ID", description = "Fetch complete payment details by its Database ID.")
    public ResponseEntity<ApiResponse<PaymentResponseDTO>> getPaymentById(
            @PathVariable String id) {
        PaymentResponseDTO payment = paymentService.getPaymentById(id);
        return ResponseEntity.ok(ApiResponse.success("Payment retrieved successfully", payment));
    }
    
    @GetMapping("/transaction/{transactionId}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_STAFF', 'ROLE_RESIDENT')")
    @Operation(summary = "Get payment by Transaction ID", description = "Fetch complete payment details by internal transaction ID.")
    public ResponseEntity<ApiResponse<PaymentResponseDTO>> getPaymentByTransactionId(
            @PathVariable String transactionId) {
        PaymentResponseDTO payment = paymentService.getPaymentByTransactionId(transactionId);
        return ResponseEntity.ok(ApiResponse.success("Payment retrieved successfully", payment));
    }
    
    @GetMapping("/resident/{residentId}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_STAFF', 'ROLE_RESIDENT')")
    @Operation(summary = "Get payments by Resident ID", description = "Fetch a list of payment summaries belonging to a specific resident.")
    public ResponseEntity<ApiResponse<List<PaymentSummaryDTO>>> getPaymentsByResident(
            @PathVariable String residentId) {
        List<PaymentSummaryDTO> payments = paymentService.getPaymentsByResident(residentId);
        return ResponseEntity.ok(ApiResponse.success("Payments retrieved successfully", payments));
    }
    
    @GetMapping("/invoice/{invoiceId}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_STAFF', 'ROLE_RESIDENT')")
    @Operation(summary = "Get payments by Invoice ID", description = "Fetch all payments mapped to a specific invoice (Maintenance or Utility).")
    public ResponseEntity<ApiResponse<List<PaymentSummaryDTO>>> getPaymentsByInvoice(
            @PathVariable String invoiceId) {
        List<PaymentSummaryDTO> payments = paymentService.getPaymentsByInvoice(invoiceId);
        return ResponseEntity.ok(ApiResponse.success("Payments retrieved successfully", payments));
    }

    @GetMapping("/search")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_STAFF', 'ROLE_RESIDENT')")
    @Operation(summary = "Search and Paginate Payments", description = "Advanced filtering for payment records.")
    public ResponseEntity<ApiResponse<Page<PaymentSummaryDTO>>> searchPayments(
            @Parameter(description = "Filter by society ID") @RequestParam(required = false) String societyId,
            @Parameter(description = "Filter by resident ID") @RequestParam(required = false) String residentId,
            @Parameter(description = "Filter by invoice ID") @RequestParam(required = false) String invoiceId,
            @Parameter(description = "Filter by payment status") @RequestParam(required = false) PaymentStatus status,
            @Parameter(description = "Filter by payment gateway") @RequestParam(required = false) PaymentGateway gateway,
            @Parameter(description = "Filter by payment method") @RequestParam(required = false) PaymentMethod method,
            @Parameter(description = "Creation start date") @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @Parameter(description = "Creation end date") @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate,
            @Parameter(description = "Keyword to search Transaction ID, Payment Number or Receipt") @RequestParam(required = false) String keyword,
            @Parameter(description = "Page number (0-based)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "10") int size,
            @Parameter(description = "Sort by field") @RequestParam(defaultValue = "createdAt") String sortBy,
            @Parameter(description = "Sort direction (asc/desc)") @RequestParam(defaultValue = "desc") String sortDir) {

        Page<PaymentSummaryDTO> response = paymentService.searchPayments(societyId, residentId, invoiceId, status, gateway, method, startDate, endDate, keyword, page, size, sortBy, sortDir);
        return ResponseEntity.ok(ApiResponse.success("Payments retrieved successfully", response));
    }

    // --- Webhooks ---

    @PostMapping("/webhook/razorpay")
    @Operation(summary = "Razorpay Webhook Callback", description = "Receives asynchronous callback from Razorpay servers.")
    public ResponseEntity<String> handleRazorpayWebhook(
            @RequestHeader(value = "X-Razorpay-Signature", required = false) String signature,
            @RequestBody WebhookDTO payload) {
        log.info("Received Razorpay webhook: {}", payload.getEventId());
        
        // In a real scenario, we'd extract the internal transaction ID from the notes/payload
        // paymentService.verifyPayment(extractedTxnId, payload.payment_id, signature);
        
        return ResponseEntity.ok("Webhook Received");
    }
    
    @PostMapping("/webhook/stripe")
    @Operation(summary = "Stripe Webhook Callback", description = "Receives asynchronous callback from Stripe servers.")
    public ResponseEntity<String> handleStripeWebhook(
            @RequestHeader(value = "Stripe-Signature", required = false) String signature,
            @RequestBody WebhookDTO payload) {
        log.info("Received Stripe webhook: {}", payload.getEventId());
        
        // In a real scenario, we'd extract the client_reference_id
        // paymentService.verifyPayment(extractedTxnId, payload.payment_intent_id, signature);
        
        return ResponseEntity.ok("Webhook Received");
    }
}
