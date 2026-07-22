package com.resicore.modules.societyadmin.controller;

import com.resicore.common.response.ApiResponse;
import com.resicore.modules.societyadmin.dto.SocietySettingsRequestDTO;
import com.resicore.modules.societyadmin.dto.SocietySettingsResponseDTO;
import com.resicore.modules.societyadmin.service.SocietyAdminSettingsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/society-admin/settings")
@RequiredArgsConstructor
@Tag(name = "Society Admin - Settings", description = "APIs for managing society settings and rules")
public class SocietyAdminSettingsController {

    private final SocietyAdminSettingsService settingsService;

    @GetMapping("/{societyId}")
    @PreAuthorize("hasAnyAuthority('ROLE_SOCIETY_ADMIN', 'ROLE_SUPER_ADMIN')")
    @Operation(summary = "Get Society Settings", description = "Retrieves current settings and rules for the society")
    public ResponseEntity<ApiResponse<SocietySettingsResponseDTO>> getSettings(@PathVariable String societyId) {
        SocietySettingsResponseDTO settings = settingsService.getSettings(societyId);
        return ResponseEntity.ok(ApiResponse.success("Society settings fetched successfully", settings));
    }

    @PutMapping("/{societyId}")
    @PreAuthorize("hasAnyAuthority('ROLE_SOCIETY_ADMIN', 'ROLE_SUPER_ADMIN')")
    @Operation(summary = "Update Society Settings", description = "Updates society profile and operating rules")
    public ResponseEntity<ApiResponse<SocietySettingsResponseDTO>> updateSettings(
            @PathVariable String societyId,
            @RequestBody SocietySettingsRequestDTO request) {
        SocietySettingsResponseDTO settings = settingsService.updateSettings(societyId, request);
        return ResponseEntity.ok(ApiResponse.success("Society settings updated successfully", settings));
    }
}
