package com.resicore.modules.societyadmin.controller;

import com.resicore.common.response.ApiResponse;
import com.resicore.modules.resident.entity.Resident;
import com.resicore.modules.societyadmin.dto.ResidentApprovalRequestDTO;
import com.resicore.modules.societyadmin.service.SocietyAdminResidentService;
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
@RequestMapping("/api/v1/society-admin/resident")
@RequiredArgsConstructor
@Tag(name = "Society Admin - Resident Management", description = "APIs for managing and approving residents")
public class SocietyAdminResidentController {

    private final SocietyAdminResidentService residentService;

    @GetMapping("/pending/{societyId}")
    @PreAuthorize("hasAnyAuthority('ROLE_SOCIETY_ADMIN', 'ROLE_SUPER_ADMIN')")
    @Operation(summary = "Get pending residents", description = "Retrieves all pending resident requests for a society")
    public ResponseEntity<ApiResponse<Page<Resident>>> getPendingResidents(
            @PathVariable String societyId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Resident> residents = residentService.getPendingResidents(societyId, pageable);
        return ResponseEntity.ok(ApiResponse.success("Pending residents fetched successfully", residents));
    }

    @PostMapping("/approve")
    @PreAuthorize("hasAnyAuthority('ROLE_SOCIETY_ADMIN', 'ROLE_SUPER_ADMIN')")
    @Operation(summary = "Approve Resident", description = "Approves a resident's request")
    public ResponseEntity<ApiResponse<Resident>> approveResident(@RequestBody ResidentApprovalRequestDTO request) {
        Resident resident = residentService.approveResident(request);
        return ResponseEntity.ok(ApiResponse.success("Resident approved successfully", resident));
    }

    @PostMapping("/reject")
    @PreAuthorize("hasAnyAuthority('ROLE_SOCIETY_ADMIN', 'ROLE_SUPER_ADMIN')")
    @Operation(summary = "Reject Resident", description = "Rejects a resident's request")
    public ResponseEntity<ApiResponse<Resident>> rejectResident(@RequestBody ResidentApprovalRequestDTO request) {
        Resident resident = residentService.rejectResident(request);
        return ResponseEntity.ok(ApiResponse.success("Resident rejected successfully", resident));
    }

    @PostMapping("/suspend")
    @PreAuthorize("hasAnyAuthority('ROLE_SOCIETY_ADMIN', 'ROLE_SUPER_ADMIN')")
    @Operation(summary = "Suspend Resident", description = "Suspends a resident's account")
    public ResponseEntity<ApiResponse<Resident>> suspendResident(@RequestBody ResidentApprovalRequestDTO request) {
        Resident resident = residentService.suspendResident(request);
        return ResponseEntity.ok(ApiResponse.success("Resident suspended successfully", resident));
    }

    @PostMapping("/activate")
    @PreAuthorize("hasAnyAuthority('ROLE_SOCIETY_ADMIN', 'ROLE_SUPER_ADMIN')")
    @Operation(summary = "Activate Resident", description = "Re-activates a suspended resident")
    public ResponseEntity<ApiResponse<Resident>> activateResident(@RequestBody ResidentApprovalRequestDTO request) {
        Resident resident = residentService.activateResident(request);
        return ResponseEntity.ok(ApiResponse.success("Resident activated successfully", resident));
    }

    @PostMapping("/bulk/approve")
    @PreAuthorize("hasAnyAuthority('ROLE_SOCIETY_ADMIN', 'ROLE_SUPER_ADMIN')")
    @Operation(summary = "Bulk Approve", description = "Approves multiple residents at once")
    public ResponseEntity<ApiResponse<Void>> bulkApprove(@RequestBody ResidentApprovalRequestDTO request) {
        residentService.bulkApprove(request);
        return ResponseEntity.ok(ApiResponse.success("Residents approved successfully", null));
    }

    @PostMapping("/bulk/reject")
    @PreAuthorize("hasAnyAuthority('ROLE_SOCIETY_ADMIN', 'ROLE_SUPER_ADMIN')")
    @Operation(summary = "Bulk Reject", description = "Rejects multiple residents at once")
    public ResponseEntity<ApiResponse<Void>> bulkReject(@RequestBody ResidentApprovalRequestDTO request) {
        residentService.bulkReject(request);
        return ResponseEntity.ok(ApiResponse.success("Residents rejected successfully", null));
    }
}
