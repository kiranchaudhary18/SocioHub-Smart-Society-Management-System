package com.resicore.modules.societyadmin.controller;

import com.resicore.common.response.ApiResponse;
import com.resicore.modules.societyadmin.dto.ReportFilterRequestDTO;
import com.resicore.modules.societyadmin.service.SocietyAdminReportService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/society-admin/reports")
@RequiredArgsConstructor
@Tag(name = "Society Admin - Reports", description = "APIs for generating society reports")
public class SocietyAdminReportController {

    private final SocietyAdminReportService reportService;

    @PostMapping("/resident/{societyId}")
    @PreAuthorize("hasAnyAuthority('ROLE_SOCIETY_ADMIN', 'ROLE_SUPER_ADMIN')")
    @Operation(summary = "Generate Resident Report", description = "Generates report of residents based on filters")
    public ResponseEntity<?> generateResidentReport(
            @PathVariable String societyId,
            @RequestBody ReportFilterRequestDTO filter) {
        
        List<Map<String, Object>> data = reportService.generateResidentReport(societyId, filter);
        return handleReportResponse(data, filter.getFormat(), "resident_report");
    }

    @PostMapping("/visitor/{societyId}")
    @PreAuthorize("hasAnyAuthority('ROLE_SOCIETY_ADMIN', 'ROLE_SUPER_ADMIN')")
    @Operation(summary = "Generate Visitor Report", description = "Generates report of visitors based on filters")
    public ResponseEntity<?> generateVisitorReport(
            @PathVariable String societyId,
            @RequestBody ReportFilterRequestDTO filter) {
        
        List<Map<String, Object>> data = reportService.generateVisitorReport(societyId, filter);
        return handleReportResponse(data, filter.getFormat(), "visitor_report");
    }

    @PostMapping("/complaint/{societyId}")
    @PreAuthorize("hasAnyAuthority('ROLE_SOCIETY_ADMIN', 'ROLE_SUPER_ADMIN')")
    @Operation(summary = "Generate Complaint Report", description = "Generates report of complaints based on filters")
    public ResponseEntity<?> generateComplaintReport(
            @PathVariable String societyId,
            @RequestBody ReportFilterRequestDTO filter) {
        
        List<Map<String, Object>> data = reportService.generateComplaintReport(societyId, filter);
        return handleReportResponse(data, filter.getFormat(), "complaint_report");
    }

    @PostMapping("/revenue/{societyId}")
    @PreAuthorize("hasAnyAuthority('ROLE_SOCIETY_ADMIN', 'ROLE_SUPER_ADMIN')")
    @Operation(summary = "Generate Revenue Report", description = "Generates report of revenue based on filters")
    public ResponseEntity<?> generateRevenueReport(
            @PathVariable String societyId,
            @RequestBody ReportFilterRequestDTO filter) {
        
        List<Map<String, Object>> data = reportService.generateRevenueReport(societyId, filter);
        return handleReportResponse(data, filter.getFormat(), "revenue_report");
    }

    private ResponseEntity<?> handleReportResponse(List<Map<String, Object>> data, String format, String filename) {
        if ("CSV".equalsIgnoreCase(format)) {
            byte[] csvData = reportService.exportToCsv(data);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename + ".csv")
                    .contentType(MediaType.parseMediaType("text/csv"))
                    .body(csvData);
        }
        
        // Default returns JSON
        return ResponseEntity.ok(ApiResponse.success("Report generated successfully", data));
    }
}
