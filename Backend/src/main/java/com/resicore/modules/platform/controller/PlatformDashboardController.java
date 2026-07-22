package com.resicore.modules.platform.controller;

import com.resicore.common.response.ApiResponse;
import com.resicore.modules.platform.dto.PlatformDashboardResponseDTO;
import com.resicore.modules.platform.service.PlatformDashboardService;
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
@RequestMapping("/api/v1/platform/dashboard")
@RequiredArgsConstructor
@Tag(name = "Platform Dashboard", description = "Super Admin Platform Dashboard APIs")
@SecurityRequirement(name = "bearerAuth")
public class PlatformDashboardController {

    private final PlatformDashboardService dashboardService;

    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN')")
    @Operation(summary = "Get Dashboard Data", description = "Retrieves aggregated metrics for the Super Admin dashboard.")
    public ResponseEntity<ApiResponse<PlatformDashboardResponseDTO>> getDashboardData() {
        PlatformDashboardResponseDTO data = dashboardService.getDashboardData();
        return ResponseEntity.ok(ApiResponse.success("Dashboard data retrieved successfully", data));
    }
}
