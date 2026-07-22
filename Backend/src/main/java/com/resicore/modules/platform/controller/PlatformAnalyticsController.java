package com.resicore.modules.platform.controller;

import com.resicore.common.response.ApiResponse;
import com.resicore.modules.platform.dto.PlatformAnalyticsResponseDTO;
import com.resicore.modules.platform.service.PlatformAnalyticsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/platform/analytics")
@RequiredArgsConstructor
@Tag(name = "Platform Analytics", description = "Super Admin Platform Analytics APIs")
@SecurityRequirement(name = "bearerAuth")
public class PlatformAnalyticsController {

    private final PlatformAnalyticsService analyticsService;

    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN')")
    @Operation(summary = "Get Platform Analytics", description = "Retrieves analytical trends and growth data.")
    public ResponseEntity<ApiResponse<PlatformAnalyticsResponseDTO>> getAnalyticsData() {
        PlatformAnalyticsResponseDTO data = analyticsService.getPlatformAnalytics();
        return ResponseEntity.ok(ApiResponse.success("Analytics data retrieved successfully", data));
    }
}
