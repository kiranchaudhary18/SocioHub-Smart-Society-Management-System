package com.resicore.modules.societyadmin.controller;

import com.resicore.common.response.ApiResponse;
import com.resicore.modules.complaint.entity.Complaint;
import com.resicore.modules.societyadmin.dto.AssignStaffRequestDTO;
import com.resicore.modules.societyadmin.service.SocietyAdminComplaintService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/society-admin/complaint")
@RequiredArgsConstructor
@Tag(name = "Society Admin - Complaint Management", description = "APIs for managing complaints and staff assignment")
public class SocietyAdminComplaintController {

    private final SocietyAdminComplaintService complaintService;

    @PostMapping("/assign")
    @PreAuthorize("hasAnyAuthority('ROLE_SOCIETY_ADMIN', 'ROLE_SUPER_ADMIN')")
    @Operation(summary = "Assign Staff to Complaint", description = "Assigns a staff member to resolve a complaint")
    public ResponseEntity<ApiResponse<Complaint>> assignStaffToComplaint(@RequestBody AssignStaffRequestDTO request) {
        Complaint complaint = complaintService.assignStaffToComplaint(request);
        return ResponseEntity.ok(ApiResponse.success("Staff assigned to complaint successfully", complaint));
    }

    @PostMapping("/reassign")
    @PreAuthorize("hasAnyAuthority('ROLE_SOCIETY_ADMIN', 'ROLE_SUPER_ADMIN')")
    @Operation(summary = "Reassign Staff", description = "Reassigns a complaint to a different staff member")
    public ResponseEntity<ApiResponse<Complaint>> reassignStaffToComplaint(@RequestBody AssignStaffRequestDTO request) {
        Complaint complaint = complaintService.reassignStaffToComplaint(request);
        return ResponseEntity.ok(ApiResponse.success("Staff reassigned to complaint successfully", complaint));
    }

    @GetMapping("/analytics/{societyId}")
    @PreAuthorize("hasAnyAuthority('ROLE_SOCIETY_ADMIN', 'ROLE_SUPER_ADMIN')")
    @Operation(summary = "Complaint Analytics", description = "Retrieves analytics for complaints")
    public ResponseEntity<ApiResponse<Object>> getComplaintAnalytics(@PathVariable String societyId) {
        Object analytics = complaintService.getComplaintAnalytics(societyId);
        return ResponseEntity.ok(ApiResponse.success("Complaint analytics fetched successfully", analytics));
    }

    @GetMapping("/priority/{societyId}")
    @PreAuthorize("hasAnyAuthority('ROLE_SOCIETY_ADMIN', 'ROLE_SUPER_ADMIN')")
    @Operation(summary = "Priority Dashboard", description = "Retrieves complaints ordered by priority")
    public ResponseEntity<ApiResponse<Page<Complaint>>> getPriorityDashboard(
            @PathVariable String societyId,
            @RequestParam(required = false) String priority,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Complaint> complaints = complaintService.getPriorityDashboard(societyId, priority, pageable);
        return ResponseEntity.ok(ApiResponse.success("Priority dashboard fetched successfully", complaints));
    }

    @GetMapping("/escalated/{societyId}")
    @PreAuthorize("hasAnyAuthority('ROLE_SOCIETY_ADMIN', 'ROLE_SUPER_ADMIN')")
    @Operation(summary = "Escalated Complaints", description = "Retrieves all escalated complaints")
    public ResponseEntity<ApiResponse<Page<Complaint>>> getEscalatedComplaints(
            @PathVariable String societyId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Complaint> complaints = complaintService.getEscalatedComplaints(societyId, pageable);
        return ResponseEntity.ok(ApiResponse.success("Escalated complaints fetched successfully", complaints));
    }
}
