package com.resicore.modules.platform.controller;

import com.resicore.common.response.ApiResponse;
import com.resicore.modules.platform.service.PlatformSocietyService;
import com.resicore.modules.society.dto.SocietyResponseDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/platform/societies")
@RequiredArgsConstructor
@Tag(name = "Platform Society Management", description = "Super Admin APIs for managing societies")
@SecurityRequirement(name = "bearerAuth")
public class PlatformSocietyController {

    private final PlatformSocietyService societyService;

    @PatchMapping("/{id}/approve")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN')")
    @Operation(summary = "Approve Society", description = "Approves a pending society.")
    public ResponseEntity<ApiResponse<SocietyResponseDTO>> approveSociety(@PathVariable String id) {
        SocietyResponseDTO society = societyService.approveSociety(id);
        return ResponseEntity.ok(ApiResponse.success("Society approved successfully", society));
    }

    @PatchMapping("/{id}/reject")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN')")
    @Operation(summary = "Reject Society", description = "Rejects a pending society.")
    public ResponseEntity<ApiResponse<SocietyResponseDTO>> rejectSociety(@PathVariable String id) {
        SocietyResponseDTO society = societyService.rejectSociety(id);
        return ResponseEntity.ok(ApiResponse.success("Society rejected successfully", society));
    }
    
    @PatchMapping("/{id}/suspend")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN')")
    @Operation(summary = "Suspend Society", description = "Suspends an active society.")
    public ResponseEntity<ApiResponse<SocietyResponseDTO>> suspendSociety(@PathVariable String id) {
        SocietyResponseDTO society = societyService.suspendSociety(id);
        return ResponseEntity.ok(ApiResponse.success("Society suspended successfully", society));
    }
    
    @PatchMapping("/{id}/activate")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN')")
    @Operation(summary = "Activate Society", description = "Re-activates a suspended society.")
    public ResponseEntity<ApiResponse<SocietyResponseDTO>> activateSociety(@PathVariable String id) {
        SocietyResponseDTO society = societyService.activateSociety(id);
        return ResponseEntity.ok(ApiResponse.success("Society activated successfully", society));
    }
    
    @PatchMapping("/{id}/deactivate")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN')")
    @Operation(summary = "Deactivate Society", description = "Deactivates a society.")
    public ResponseEntity<ApiResponse<SocietyResponseDTO>> deactivateSociety(@PathVariable String id) {
        SocietyResponseDTO society = societyService.deactivateSociety(id);
        return ResponseEntity.ok(ApiResponse.success("Society deactivated successfully", society));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN')")
    @Operation(summary = "Get Society Details", description = "Retrieves full details of a society.")
    public ResponseEntity<ApiResponse<SocietyResponseDTO>> getSocietyDetails(@PathVariable String id) {
        SocietyResponseDTO society = societyService.getSocietyDetails(id);
        return ResponseEntity.ok(ApiResponse.success("Society details retrieved", society));
    }
    
    @GetMapping("/{id}/statistics")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN')")
    @Operation(summary = "Get Society Statistics", description = "Retrieves statistics for a specific society.")
    public ResponseEntity<ApiResponse<Object>> getSocietyStatistics(@PathVariable String id) {
        Object stats = societyService.getSocietyStatistics(id);
        return ResponseEntity.ok(ApiResponse.success("Society statistics retrieved", stats));
    }

    @GetMapping("/search")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN')")
    @Operation(summary = "Search Societies", description = "Search and filter all societies on the platform.")
    public ResponseEntity<ApiResponse<Page<SocietyResponseDTO>>> searchSocieties(
            @Parameter(description = "Filter by status") @RequestParam(required = false) String status,
            @Parameter(description = "Keyword to search name/regNumber") @RequestParam(required = false) String keyword,
            @Parameter(description = "Page number (0-based)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "10") int size,
            @Parameter(description = "Sort by field") @RequestParam(defaultValue = "createdAt") String sortBy,
            @Parameter(description = "Sort direction (asc/desc)") @RequestParam(defaultValue = "desc") String sortDir) {

        Page<SocietyResponseDTO> response = societyService.searchSocieties(status, keyword, page, size, sortBy, sortDir);
        return ResponseEntity.ok(ApiResponse.success("Societies retrieved", response));
    }
}
