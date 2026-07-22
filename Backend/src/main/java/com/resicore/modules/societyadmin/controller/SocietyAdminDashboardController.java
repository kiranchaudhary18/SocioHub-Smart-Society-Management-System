package com.resicore.modules.societyadmin.controller;

import com.resicore.common.response.ApiResponse;
import com.resicore.modules.societyadmin.dto.AdminDashboardResponseDTO;
import com.resicore.modules.societyadmin.service.SocietyAdminDashboardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/society-admin/dashboard")
@RequiredArgsConstructor
@Tag(name = "Society Admin Dashboard", description = "APIs for Society Admin Dashboard aggregation")
public class SocietyAdminDashboardController {

    private final SocietyAdminDashboardService dashboardService;

    @GetMapping("/{societyId}")
    @PreAuthorize("hasAnyAuthority('ROLE_SOCIETY_ADMIN', 'ROLE_SUPER_ADMIN')")
    @Operation(summary = "Get Society Admin Dashboard Data", description = "Retrieves aggregated metrics for the dashboard")
    public ResponseEntity<ApiResponse<AdminDashboardResponseDTO>> getDashboardData(@PathVariable String societyId) {
        AdminDashboardResponseDTO data = dashboardService.getDashboardData(societyId);
        return ResponseEntity.ok(ApiResponse.success("Dashboard data fetched successfully", data));
    }
}
