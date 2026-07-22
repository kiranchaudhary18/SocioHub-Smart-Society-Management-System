package com.resicore.modules.platform.controller;

import com.resicore.common.response.ApiResponse;
import com.resicore.modules.platform.dto.AuditLogResponseDTO;
import com.resicore.modules.platform.enums.AuditLogAction;
import com.resicore.modules.platform.service.PlatformAuditService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/v1/platform/audit-logs")
@RequiredArgsConstructor
@Tag(name = "Platform Audit Logs", description = "Super Admin APIs for viewing platform audit trails")
@SecurityRequirement(name = "bearerAuth")
public class PlatformAuditController {

    private final PlatformAuditService auditService;

    @GetMapping("/search")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN')")
    @Operation(summary = "Search Audit Logs", description = "Search and filter platform audit logs.")
    public ResponseEntity<ApiResponse<Page<AuditLogResponseDTO>>> searchAuditLogs(
            @Parameter(description = "Filter by Action") @RequestParam(required = false) AuditLogAction action,
            @Parameter(description = "Filter by Performed By Email") @RequestParam(required = false) String performedByEmail,
            @Parameter(description = "Filter by Target Entity ID") @RequestParam(required = false) String targetEntityId,
            @Parameter(description = "Start date range") @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @Parameter(description = "End date range") @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate,
            @Parameter(description = "Keyword to search details") @RequestParam(required = false) String keyword,
            @Parameter(description = "Page number (0-based)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "20") int size,
            @Parameter(description = "Sort by field") @RequestParam(defaultValue = "timestamp") String sortBy,
            @Parameter(description = "Sort direction (asc/desc)") @RequestParam(defaultValue = "desc") String sortDir) {

        Page<AuditLogResponseDTO> response = auditService.searchAuditLogs(action, performedByEmail, targetEntityId, startDate, endDate, keyword, page, size, sortBy, sortDir);
        return ResponseEntity.ok(ApiResponse.success("Audit logs retrieved", response));
    }
}
