package com.resicore.modules.platform.controller;

import com.resicore.common.response.ApiResponse;
import com.resicore.modules.platform.dto.AdminProfileDTO;
import com.resicore.modules.platform.service.PlatformAdminManagementService;
import com.resicore.modules.platform.dto.AdminRequestDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/platform/admins")
@RequiredArgsConstructor
@Tag(name = "Platform Admin Management", description = "Super Admin APIs for managing Society Admins")
@SecurityRequirement(name = "bearerAuth")
public class PlatformAdminController {

    private final PlatformAdminManagementService adminService;

    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN')")
    @Operation(summary = "Create Society Admin", description = "Creates a new Society Admin.")
    public ResponseEntity<ApiResponse<AdminProfileDTO>> createSocietyAdmin(
            @Valid @RequestBody AdminRequestDTO requestDTO) {
        AdminProfileDTO admin = adminService.createSocietyAdmin(requestDTO);
        return new ResponseEntity<>(ApiResponse.success("Admin created successfully", admin), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN')")
    @Operation(summary = "Update Society Admin", description = "Updates a Society Admin's details.")
    public ResponseEntity<ApiResponse<AdminProfileDTO>> updateSocietyAdmin(
            @PathVariable String id,
            @Valid @RequestBody AdminRequestDTO requestDTO) {
        AdminProfileDTO admin = adminService.updateSocietyAdmin(id, requestDTO);
        return ResponseEntity.ok(ApiResponse.success("Admin updated successfully", admin));
    }
    
    @PatchMapping("/{id}/deactivate")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN')")
    @Operation(summary = "Deactivate Society Admin", description = "Deactivates a Society Admin.")
    public ResponseEntity<ApiResponse<AdminProfileDTO>> deactivateSocietyAdmin(@PathVariable String id) {
        AdminProfileDTO admin = adminService.deactivateSocietyAdmin(id);
        return ResponseEntity.ok(ApiResponse.success("Admin deactivated successfully", admin));
    }

    @PatchMapping("/{id}/reset-password")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN')")
    @Operation(summary = "Reset Admin Password", description = "Force resets an Admin's password.")
    public ResponseEntity<ApiResponse<Void>> resetSocietyAdminPassword(
            @PathVariable String id,
            @RequestParam String newPassword) {
        adminService.resetSocietyAdminPassword(id, newPassword);
        return ResponseEntity.ok(ApiResponse.success("Password reset successfully", null));
    }
    
    @PatchMapping("/{id}/assign-society")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN')")
    @Operation(summary = "Assign Society", description = "Assigns an Admin to a Society.")
    public ResponseEntity<ApiResponse<AdminProfileDTO>> assignSociety(
            @PathVariable String id,
            @RequestParam String societyId) {
        AdminProfileDTO admin = adminService.assignSociety(id, societyId);
        return ResponseEntity.ok(ApiResponse.success("Society assigned successfully", admin));
    }
    
    @PatchMapping("/{id}/remove-society")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN')")
    @Operation(summary = "Remove Society Assignment", description = "Removes an Admin's society assignment.")
    public ResponseEntity<ApiResponse<AdminProfileDTO>> removeSocietyAssignment(@PathVariable String id) {
        AdminProfileDTO admin = adminService.removeSocietyAssignment(id);
        return ResponseEntity.ok(ApiResponse.success("Society assignment removed successfully", admin));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN')")
    @Operation(summary = "Get Admin Profile", description = "Retrieves an Admin's profile.")
    public ResponseEntity<ApiResponse<AdminProfileDTO>> getAdminProfile(@PathVariable String id) {
        AdminProfileDTO admin = adminService.getAdminProfile(id);
        return ResponseEntity.ok(ApiResponse.success("Admin profile retrieved", admin));
    }

    @GetMapping("/search")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN')")
    @Operation(summary = "Search Admins", description = "Search and filter Society Admins.")
    public ResponseEntity<ApiResponse<Page<AdminProfileDTO>>> searchAdmins(
            @Parameter(description = "Keyword to search email/name") @RequestParam(required = false) String keyword,
            @Parameter(description = "Filter by society ID") @RequestParam(required = false) String societyId,
            @Parameter(description = "Filter by active status") @RequestParam(required = false) Boolean isActive,
            @Parameter(description = "Page number (0-based)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "10") int size,
            @Parameter(description = "Sort by field") @RequestParam(defaultValue = "createdAt") String sortBy,
            @Parameter(description = "Sort direction (asc/desc)") @RequestParam(defaultValue = "desc") String sortDir) {

        Page<AdminProfileDTO> response = adminService.searchAdmins(keyword, societyId, isActive, page, size, sortBy, sortDir);
        return ResponseEntity.ok(ApiResponse.success("Admins retrieved", response));
    }
}
