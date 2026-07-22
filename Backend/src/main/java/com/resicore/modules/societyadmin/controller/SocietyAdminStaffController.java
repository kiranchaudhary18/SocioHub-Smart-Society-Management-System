package com.resicore.modules.societyadmin.controller;

import com.resicore.common.response.ApiResponse;
import com.resicore.modules.staff.entity.Staff;
import com.resicore.modules.societyadmin.dto.AssignStaffRequestDTO;
import com.resicore.modules.societyadmin.service.SocietyAdminStaffService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/society-admin/staff")
@RequiredArgsConstructor
@Tag(name = "Society Admin - Staff Management", description = "APIs for managing staff assignments")
public class SocietyAdminStaffController {

    private final SocietyAdminStaffService staffService;

    @PostMapping("/assign")
    @PreAuthorize("hasAnyAuthority('ROLE_SOCIETY_ADMIN', 'ROLE_SUPER_ADMIN')")
    @Operation(summary = "Assign Staff", description = "Assign staff to a society or complaint")
    public ResponseEntity<ApiResponse<Staff>> assignStaff(
            @RequestParam String societyId,
            @RequestBody AssignStaffRequestDTO request) {
        Staff staff = staffService.assignStaff(request.getStaffId(), societyId, request.getAssignmentDetails());
        return ResponseEntity.ok(ApiResponse.success("Staff assigned successfully", staff));
    }

    @PostMapping("/deactivate/{staffId}")
    @PreAuthorize("hasAnyAuthority('ROLE_SOCIETY_ADMIN', 'ROLE_SUPER_ADMIN')")
    @Operation(summary = "Deactivate Staff", description = "Deactivates a staff member")
    public ResponseEntity<ApiResponse<Staff>> deactivateStaff(@PathVariable String staffId) {
        Staff staff = staffService.deactivateStaff(staffId);
        return ResponseEntity.ok(ApiResponse.success("Staff deactivated successfully", staff));
    }

    @PostMapping("/transfer/{staffId}")
    @PreAuthorize("hasAnyAuthority('ROLE_SOCIETY_ADMIN', 'ROLE_SUPER_ADMIN')")
    @Operation(summary = "Transfer Staff", description = "Transfers a staff member to another society")
    public ResponseEntity<ApiResponse<Staff>> transferStaff(
            @PathVariable String staffId,
            @RequestParam String newSocietyId) {
        Staff staff = staffService.transferStaff(staffId, newSocietyId);
        return ResponseEntity.ok(ApiResponse.success("Staff transferred successfully", staff));
    }

    @PostMapping("/reset-password/{staffId}")
    @PreAuthorize("hasAnyAuthority('ROLE_SOCIETY_ADMIN', 'ROLE_SUPER_ADMIN')")
    @Operation(summary = "Reset Staff Password", description = "Resets the password for a staff member")
    public ResponseEntity<ApiResponse<Void>> resetStaffPassword(
            @PathVariable String staffId,
            @RequestParam String newPassword) {
        staffService.resetStaffPassword(staffId, newPassword);
        return ResponseEntity.ok(ApiResponse.success("Staff password reset successfully", null));
    }

    @GetMapping("/statistics/{societyId}")
    @PreAuthorize("hasAnyAuthority('ROLE_SOCIETY_ADMIN', 'ROLE_SUPER_ADMIN')")
    @Operation(summary = "Get Staff Statistics", description = "Retrieves statistics about staff")
    public ResponseEntity<ApiResponse<Object>> getStaffStatistics(@PathVariable String societyId) {
        Object stats = staffService.getStaffStatistics(societyId);
        return ResponseEntity.ok(ApiResponse.success("Staff statistics fetched successfully", stats));
    }
}
