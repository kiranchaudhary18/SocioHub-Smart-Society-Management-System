package com.resicore.modules.attendance.controller;

import com.resicore.common.response.ApiResponse;
import com.resicore.modules.attendance.dto.AttendanceRequestDTO;
import com.resicore.modules.attendance.dto.AttendanceResponseDTO;
import com.resicore.modules.attendance.dto.AttendanceSummaryDTO;
import com.resicore.modules.attendance.dto.MonthlyAttendanceReportDTO;
import com.resicore.modules.attendance.enums.AttendanceStatus;
import com.resicore.modules.attendance.service.AttendanceService;
import com.resicore.modules.staff.enums.Shift;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/attendance")
@RequiredArgsConstructor
@Tag(name = "Attendance Controller", description = "Endpoints for managing staff attendance records")
@SecurityRequirement(name = "bearerAuth")
public class AttendanceController {

    private final AttendanceService attendanceService;

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Mark attendance", description = "Creates a new daily attendance record for a staff member.")
    public ResponseEntity<ApiResponse<AttendanceResponseDTO>> markAttendance(
            @Valid @RequestBody AttendanceRequestDTO requestDTO) {
        AttendanceResponseDTO created = attendanceService.markAttendance(requestDTO);
        return new ResponseEntity<>(ApiResponse.success("Attendance marked successfully", created), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Update attendance", description = "Updates details of an existing attendance record.")
    public ResponseEntity<ApiResponse<AttendanceResponseDTO>> updateAttendance(
            @PathVariable String id,
            @Valid @RequestBody AttendanceRequestDTO requestDTO) {
        AttendanceResponseDTO updated = attendanceService.updateAttendance(id, requestDTO);
        return ResponseEntity.ok(ApiResponse.success("Attendance updated successfully", updated));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Get attendance by ID", description = "Retrieves attendance details by its ID.")
    public ResponseEntity<ApiResponse<AttendanceResponseDTO>> getAttendanceById(
            @PathVariable String id) {
        AttendanceResponseDTO response = attendanceService.getAttendanceById(id);
        return ResponseEntity.ok(ApiResponse.success("Attendance retrieved successfully", response));
    }

    @GetMapping("/staff/{staffId}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_STAFF')")
    @Operation(summary = "Get attendance by Staff", description = "Retrieves all attendance records for a specific staff member.")
    public ResponseEntity<ApiResponse<List<AttendanceSummaryDTO>>> getAttendanceByStaff(
            @PathVariable String staffId) {
        List<AttendanceSummaryDTO> response = attendanceService.getAttendanceByStaff(staffId);
        return ResponseEntity.ok(ApiResponse.success("Staff attendance retrieved successfully", response));
    }

    @GetMapping("/society/{societyId}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Get attendance by Society", description = "Retrieves all attendance records for a specific society.")
    public ResponseEntity<ApiResponse<List<AttendanceSummaryDTO>>> getAttendanceBySociety(
            @PathVariable String societyId) {
        List<AttendanceSummaryDTO> response = attendanceService.getAttendanceBySociety(societyId);
        return ResponseEntity.ok(ApiResponse.success("Society attendance retrieved successfully", response));
    }
    
    @GetMapping("/report/monthly")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Get monthly attendance report", description = "Generates a monthly attendance summary report for all staff in a society.")
    public ResponseEntity<ApiResponse<List<MonthlyAttendanceReportDTO>>> getMonthlyAttendanceReport(
            @RequestParam String societyId,
            @RequestParam int year,
            @RequestParam int month) {
        List<MonthlyAttendanceReportDTO> response = attendanceService.getMonthlyAttendanceReport(societyId, year, month);
        return ResponseEntity.ok(ApiResponse.success("Monthly report generated successfully", response));
    }

    @GetMapping("/search")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Search attendance records", description = "Search, filter, and paginate through attendance records.")
    public ResponseEntity<ApiResponse<Page<AttendanceSummaryDTO>>> searchAttendance(
            @Parameter(description = "Filter by society ID") @RequestParam(required = false) String societyId,
            @Parameter(description = "Filter by staff ID") @RequestParam(required = false) String staffId,
            @Parameter(description = "Keyword to search across remarks") @RequestParam(required = false) String keyword,
            @Parameter(description = "Filter by attendance status") @RequestParam(required = false) AttendanceStatus status,
            @Parameter(description = "Filter by shift") @RequestParam(required = false) Shift shift,
            @Parameter(description = "Start date filter") @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @Parameter(description = "End date filter") @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @Parameter(description = "Page number (0-based)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "10") int size,
            @Parameter(description = "Sort by field") @RequestParam(defaultValue = "attendanceDate") String sortBy,
            @Parameter(description = "Sort direction (asc/desc)") @RequestParam(defaultValue = "desc") String sortDir) {

        Page<AttendanceSummaryDTO> response = attendanceService.searchAttendance(societyId, staffId, keyword, status, shift, startDate, endDate, page, size, sortBy, sortDir);
        return ResponseEntity.ok(ApiResponse.success("Attendance records retrieved successfully", response));
    }

    @PatchMapping("/{id}/check-in")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Record check-in", description = "Records the check-in time for an attendance record.")
    public ResponseEntity<ApiResponse<AttendanceResponseDTO>> checkIn(
            @PathVariable String id,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) LocalTime time) {
        AttendanceResponseDTO updated = attendanceService.checkIn(id, time);
        return ResponseEntity.ok(ApiResponse.success("Check-in recorded successfully", updated));
    }

    @PatchMapping("/{id}/check-out")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Record check-out", description = "Records the check-out time and auto-calculates hours worked.")
    public ResponseEntity<ApiResponse<AttendanceResponseDTO>> checkOut(
            @PathVariable String id,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) LocalTime time) {
        AttendanceResponseDTO updated = attendanceService.checkOut(id, time);
        return ResponseEntity.ok(ApiResponse.success("Check-out recorded successfully", updated));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Delete attendance record", description = "Soft deletes an attendance record.")
    public ResponseEntity<ApiResponse<Void>> deleteAttendance(
            @PathVariable String id) {
        attendanceService.deleteAttendance(id);
        return ResponseEntity.ok(ApiResponse.success("Attendance deleted successfully", null));
    }
}
