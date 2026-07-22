package com.resicore.modules.visitor.controller;

import com.resicore.common.response.ApiResponse;
import com.resicore.modules.visitor.dto.VisitorCheckInDTO;
import com.resicore.modules.visitor.dto.VisitorCheckOutDTO;
import com.resicore.modules.visitor.dto.VisitorRequestDTO;
import com.resicore.modules.visitor.dto.VisitorResponseDTO;
import com.resicore.modules.visitor.dto.VisitorSummaryDTO;
import com.resicore.modules.visitor.enums.Purpose;
import com.resicore.modules.visitor.enums.VisitorStatus;
import com.resicore.modules.visitor.service.VisitorService;
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
import java.util.List;

@RestController
@RequestMapping("/api/v1/visitors")
@RequiredArgsConstructor
@Tag(name = "Visitor Controller", description = "Endpoints for managing visitors and gate operations")
@SecurityRequirement(name = "bearerAuth")
public class VisitorController {

    private final VisitorService visitorService;

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_RESIDENT')")
    @Operation(summary = "Create visitor request", description = "Creates a pre-approved visitor request. Residents can only create requests for their own flats.")
    public ResponseEntity<ApiResponse<VisitorResponseDTO>> createVisitorRequest(
            @Valid @RequestBody VisitorRequestDTO requestDTO) {
        VisitorResponseDTO created = visitorService.createVisitorRequest(requestDTO);
        return new ResponseEntity<>(ApiResponse.success("Visitor request created successfully", created), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Update visitor", description = "Updates details of an existing visitor.")
    public ResponseEntity<ApiResponse<VisitorResponseDTO>> updateVisitor(
            @PathVariable String id,
            @Valid @RequestBody VisitorRequestDTO requestDTO) {
        VisitorResponseDTO updated = visitorService.updateVisitor(id, requestDTO);
        return ResponseEntity.ok(ApiResponse.success("Visitor updated successfully", updated));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_STAFF', 'ROLE_RESIDENT')")
    @Operation(summary = "Get visitor by ID", description = "Retrieves visitor details by their ID.")
    public ResponseEntity<ApiResponse<VisitorResponseDTO>> getVisitorById(
            @PathVariable String id) {
        VisitorResponseDTO response = visitorService.getVisitorById(id);
        return ResponseEntity.ok(ApiResponse.success("Visitor retrieved successfully", response));
    }

    @GetMapping("/code/{visitorCode}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_STAFF')")
    @Operation(summary = "Get visitor by Code", description = "Retrieves visitor details by their unique auto-generated code.")
    public ResponseEntity<ApiResponse<VisitorResponseDTO>> getVisitorByCode(
            @PathVariable String visitorCode) {
        VisitorResponseDTO response = visitorService.getVisitorByCode(visitorCode);
        return ResponseEntity.ok(ApiResponse.success("Visitor retrieved successfully", response));
    }

    @GetMapping("/resident/{residentId}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_RESIDENT')")
    @Operation(summary = "Get visitors by Resident", description = "Retrieves all visitors expected by a specific resident.")
    public ResponseEntity<ApiResponse<List<VisitorSummaryDTO>>> getVisitorsByResident(
            @PathVariable String residentId) {
        List<VisitorSummaryDTO> response = visitorService.getVisitorsByResident(residentId);
        return ResponseEntity.ok(ApiResponse.success("Visitors retrieved successfully", response));
    }

    @GetMapping("/society/{societyId}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_STAFF')")
    @Operation(summary = "Get visitors by Society", description = "Retrieves all visitors for a specific society.")
    public ResponseEntity<ApiResponse<List<VisitorSummaryDTO>>> getVisitorsBySociety(
            @PathVariable String societyId) {
        List<VisitorSummaryDTO> response = visitorService.getVisitorsBySociety(societyId);
        return ResponseEntity.ok(ApiResponse.success("Society visitors retrieved successfully", response));
    }

    @GetMapping("/search")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_STAFF')")
    @Operation(summary = "Search visitors", description = "Search, filter, and paginate through visitors.")
    public ResponseEntity<ApiResponse<Page<VisitorSummaryDTO>>> searchVisitors(
            @Parameter(description = "Filter by society ID") @RequestParam(required = false) String societyId,
            @Parameter(description = "Filter by resident ID") @RequestParam(required = false) String residentId,
            @Parameter(description = "Filter by building ID") @RequestParam(required = false) String buildingId,
            @Parameter(description = "Filter by flat ID") @RequestParam(required = false) String flatId,
            @Parameter(description = "Keyword to search names, phones, vehicle numbers") @RequestParam(required = false) String keyword,
            @Parameter(description = "Filter by visitor status") @RequestParam(required = false) VisitorStatus status,
            @Parameter(description = "Filter by purpose") @RequestParam(required = false) Purpose purpose,
            @Parameter(description = "Expected arrival start date") @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @Parameter(description = "Expected arrival end date") @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate,
            @Parameter(description = "Page number (0-based)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "10") int size,
            @Parameter(description = "Sort by field") @RequestParam(defaultValue = "createdAt") String sortBy,
            @Parameter(description = "Sort direction (asc/desc)") @RequestParam(defaultValue = "desc") String sortDir) {

        Page<VisitorSummaryDTO> response = visitorService.searchVisitors(societyId, residentId, buildingId, flatId, keyword, status, purpose, startDate, endDate, page, size, sortBy, sortDir);
        return ResponseEntity.ok(ApiResponse.success("Visitors retrieved successfully", response));
    }

    @PatchMapping("/{id}/approve")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_RESIDENT')")
    @Operation(summary = "Approve visitor", description = "Approves a pending visitor request.")
    public ResponseEntity<ApiResponse<VisitorResponseDTO>> approveVisitor(
            @PathVariable String id) {
        VisitorResponseDTO updated = visitorService.approveVisitor(id);
        return ResponseEntity.ok(ApiResponse.success("Visitor approved successfully", updated));
    }

    @PatchMapping("/{id}/reject")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_RESIDENT')")
    @Operation(summary = "Reject visitor", description = "Rejects a pending visitor request.")
    public ResponseEntity<ApiResponse<VisitorResponseDTO>> rejectVisitor(
            @PathVariable String id,
            @RequestParam(required = false) String remarks) {
        VisitorResponseDTO updated = visitorService.rejectVisitor(id, remarks);
        return ResponseEntity.ok(ApiResponse.success("Visitor rejected successfully", updated));
    }

    @PatchMapping("/{id}/cancel")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_RESIDENT')")
    @Operation(summary = "Cancel visitor", description = "Cancels a visitor request.")
    public ResponseEntity<ApiResponse<VisitorResponseDTO>> cancelVisitor(
            @PathVariable String id,
            @RequestParam(required = false) String remarks) {
        VisitorResponseDTO updated = visitorService.cancelVisitor(id, remarks);
        return ResponseEntity.ok(ApiResponse.success("Visitor cancelled successfully", updated));
    }

    @PatchMapping("/{id}/check-in")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_STAFF')")
    @Operation(summary = "Check in visitor", description = "Records actual check-in at the security gate.")
    public ResponseEntity<ApiResponse<VisitorResponseDTO>> checkInVisitor(
            @PathVariable String id,
            @Valid @RequestBody VisitorCheckInDTO checkInDTO) {
        VisitorResponseDTO updated = visitorService.checkInVisitor(id, checkInDTO);
        return ResponseEntity.ok(ApiResponse.success("Visitor checked in successfully", updated));
    }

    @PatchMapping("/{id}/check-out")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_STAFF')")
    @Operation(summary = "Check out visitor", description = "Records actual check-out at the security gate.")
    public ResponseEntity<ApiResponse<VisitorResponseDTO>> checkOutVisitor(
            @PathVariable String id,
            @Valid @RequestBody VisitorCheckOutDTO checkOutDTO) {
        VisitorResponseDTO updated = visitorService.checkOutVisitor(id, checkOutDTO);
        return ResponseEntity.ok(ApiResponse.success("Visitor checked out successfully", updated));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Delete visitor record", description = "Soft deletes a visitor record.")
    public ResponseEntity<ApiResponse<Void>> deleteVisitor(
            @PathVariable String id) {
        visitorService.deleteVisitor(id);
        return ResponseEntity.ok(ApiResponse.success("Visitor deleted successfully", null));
    }
}
