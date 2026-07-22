package com.resicore.modules.platform.controller;

import com.resicore.common.response.ApiResponse;
import com.resicore.modules.platform.dto.PlatformSettingsRequestDTO;
import com.resicore.modules.platform.dto.PlatformSettingsResponseDTO;
import com.resicore.modules.platform.service.PlatformSettingsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/platform/settings")
@RequiredArgsConstructor
@Tag(name = "Platform Settings", description = "Super Admin Platform Settings APIs")
@SecurityRequirement(name = "bearerAuth")
public class PlatformSettingsController {

    private final PlatformSettingsService settingsService;

    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN')")
    @Operation(summary = "Get Platform Settings", description = "Retrieves global platform configuration.")
    public ResponseEntity<ApiResponse<PlatformSettingsResponseDTO>> getSettings() {
        PlatformSettingsResponseDTO data = settingsService.getSettings();
        return ResponseEntity.ok(ApiResponse.success("Settings retrieved successfully", data));
    }
    
    @PutMapping
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN')")
    @Operation(summary = "Update All Settings", description = "Updates all platform configuration via full payload.")
    public ResponseEntity<ApiResponse<PlatformSettingsResponseDTO>> updateAllSettings(
            @Valid @RequestBody PlatformSettingsRequestDTO requestDTO) {
        PlatformSettingsResponseDTO data = settingsService.updateAllSettings(requestDTO);
        return ResponseEntity.ok(ApiResponse.success("Settings updated successfully", data));
    }

    @PatchMapping("/name")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN')")
    @Operation(summary = "Update Platform Name", description = "Updates the global platform name.")
    public ResponseEntity<ApiResponse<PlatformSettingsResponseDTO>> updatePlatformName(
            @RequestParam String name) {
        PlatformSettingsResponseDTO data = settingsService.updatePlatformName(name);
        return ResponseEntity.ok(ApiResponse.success("Platform name updated", data));
    }

    @PatchMapping("/logo")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN')")
    @Operation(summary = "Update Logo", description = "Updates the global platform logo URL.")
    public ResponseEntity<ApiResponse<PlatformSettingsResponseDTO>> updateLogo(
            @RequestParam String logoUrl) {
        PlatformSettingsResponseDTO data = settingsService.updateLogo(logoUrl);
        return ResponseEntity.ok(ApiResponse.success("Logo updated", data));
    }
    
    @PatchMapping("/currency")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN')")
    @Operation(summary = "Update Currency", description = "Updates the global default currency.")
    public ResponseEntity<ApiResponse<PlatformSettingsResponseDTO>> updateDefaultCurrency(
            @RequestParam String currency) {
        PlatformSettingsResponseDTO data = settingsService.updateDefaultCurrency(currency);
        return ResponseEntity.ok(ApiResponse.success("Currency updated", data));
    }
    
    @PatchMapping("/timezone")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN')")
    @Operation(summary = "Update TimeZone", description = "Updates the global default time zone.")
    public ResponseEntity<ApiResponse<PlatformSettingsResponseDTO>> updateDefaultTimeZone(
            @RequestParam String timeZone) {
        PlatformSettingsResponseDTO data = settingsService.updateDefaultTimeZone(timeZone);
        return ResponseEntity.ok(ApiResponse.success("TimeZone updated", data));
    }
    
    @PatchMapping("/maintenance-rules")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN')")
    @Operation(summary = "Update Maintenance Rules", description = "Updates the global maintenance rules.")
    public ResponseEntity<ApiResponse<PlatformSettingsResponseDTO>> updateMaintenanceRules(
            @RequestParam String rules) {
        PlatformSettingsResponseDTO data = settingsService.updateMaintenanceRules(rules);
        return ResponseEntity.ok(ApiResponse.success("Maintenance rules updated", data));
    }
    
    @PatchMapping("/global-configuration")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN')")
    @Operation(summary = "Update Global Configuration", description = "Updates the global configuration JSON/string.")
    public ResponseEntity<ApiResponse<PlatformSettingsResponseDTO>> updateGlobalConfiguration(
            @RequestParam String config) {
        PlatformSettingsResponseDTO data = settingsService.updateGlobalConfiguration(config);
        return ResponseEntity.ok(ApiResponse.success("Global configuration updated", data));
    }
}
