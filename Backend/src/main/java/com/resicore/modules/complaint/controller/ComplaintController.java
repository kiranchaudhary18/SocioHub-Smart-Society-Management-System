package com.resicore.modules.complaint.controller;

import com.resicore.common.response.ApiResponse;
import com.resicore.modules.complaint.dto.AssignComplaintDTO;
import com.resicore.modules.complaint.dto.ComplaintRequestDTO;
import com.resicore.modules.complaint.dto.ComplaintResponseDTO;
import com.resicore.modules.complaint.dto.ComplaintSummaryDTO;
import com.resicore.modules.complaint.dto.ComplaintUpdateDTO;
import com.resicore.modules.complaint.dto.FeedbackDTO;
import com.resicore.modules.complaint.dto.ResolveComplaintDTO;
import com.resicore.modules.complaint.enums.ComplaintCategory;
import com.resicore.modules.complaint.enums.ComplaintPriority;
import com.resicore.modules.complaint.enums.ComplaintStatus;
import com.resicore.modules.complaint.service.ComplaintService;
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

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/complaints")
@RequiredArgsConstructor
@Tag(name = "Complaint Controller", description = "Endpoints for managing resident complaints and issue resolution workflows")
@SecurityRequirement(name = "bearerAuth")
public class ComplaintController {

    private final ComplaintService complaintService;

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_RESIDENT')")
    @Operation(summary = "Create complaint", description = "Creates a new complaint. Residents can only create complaints linked to their own flats.")
    public ResponseEntity<ApiResponse<ComplaintResponseDTO>> createComplaint(
            @Valid @RequestBody ComplaintRequestDTO requestDTO) {
        ComplaintResponseDTO created = complaintService.createComplaint(requestDTO);
        return new ResponseEntity<>(ApiResponse.success("Complaint created successfully", created), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_RESIDENT')")
    @Operation(summary = "Update complaint", description = "Updates details of an existing complaint. Residents can only update before assignment (OPEN status).")
    public ResponseEntity<ApiResponse<ComplaintResponseDTO>> updateComplaint(
            @PathVariable String id,
            @Valid @RequestBody ComplaintUpdateDTO updateDTO) {
        ComplaintResponseDTO updated = complaintService.updateComplaint(id, updateDTO);
        return ResponseEntity.ok(ApiResponse.success("Complaint updated successfully", updated));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_STAFF', 'ROLE_RESIDENT')")
    @Operation(summary = "Get complaint by ID", description = "Retrieves complaint details by its ID.")
    public ResponseEntity<ApiResponse<ComplaintResponseDTO>> getComplaintById(
            @PathVariable String id) {
        ComplaintResponseDTO response = complaintService.getComplaintById(id);
        return ResponseEntity.ok(ApiResponse.success("Complaint retrieved successfully", response));
    }

    @GetMapping("/number/{complaintNumber}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_STAFF', 'ROLE_RESIDENT')")
    @Operation(summary = "Get complaint by Number", description = "Retrieves complaint details by its unique auto-generated tracking number.")
    public ResponseEntity<ApiResponse<ComplaintResponseDTO>> getComplaintByNumber(
            @PathVariable String complaintNumber) {
        ComplaintResponseDTO response = complaintService.getComplaintByNumber(complaintNumber);
        return ResponseEntity.ok(ApiResponse.success("Complaint retrieved successfully", response));
    }

    @GetMapping("/resident/{residentId}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_RESIDENT')")
    @Operation(summary = "Get complaints by Resident", description = "Retrieves all complaints created by a specific resident.")
    public ResponseEntity<ApiResponse<List<ComplaintSummaryDTO>>> getComplaintsByResident(
            @PathVariable String residentId) {
        List<ComplaintSummaryDTO> response = complaintService.getComplaintsByResident(residentId);
        return ResponseEntity.ok(ApiResponse.success("Resident complaints retrieved successfully", response));
    }

    @GetMapping("/staff/{staffId}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_STAFF')")
    @Operation(summary = "Get complaints by Staff", description = "Retrieves all complaints assigned to a specific staff member.")
    public ResponseEntity<ApiResponse<List<ComplaintSummaryDTO>>> getComplaintsByStaff(
            @PathVariable String staffId) {
        List<ComplaintSummaryDTO> response = complaintService.getComplaintsByStaff(staffId);
        return ResponseEntity.ok(ApiResponse.success("Assigned complaints retrieved successfully", response));
    }

    @GetMapping("/society/{societyId}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Get complaints by Society", description = "Retrieves all complaints within a specific society.")
    public ResponseEntity<ApiResponse<List<ComplaintSummaryDTO>>> getComplaintsBySociety(
            @PathVariable String societyId) {
        List<ComplaintSummaryDTO> response = complaintService.getComplaintsBySociety(societyId);
        return ResponseEntity.ok(ApiResponse.success("Society complaints retrieved successfully", response));
    }

    @GetMapping("/search")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Search complaints", description = "Search, filter, and paginate through complaints.")
    public ResponseEntity<ApiResponse<Page<ComplaintSummaryDTO>>> searchComplaints(
            @Parameter(description = "Filter by society ID") @RequestParam(required = false) String societyId,
            @Parameter(description = "Filter by resident ID") @RequestParam(required = false) String residentId,
            @Parameter(description = "Filter by assigned staff ID") @RequestParam(required = false) String staffId,
            @Parameter(description = "Filter by building ID") @RequestParam(required = false) String buildingId,
            @Parameter(description = "Filter by flat ID") @RequestParam(required = false) String flatId,
            @Parameter(description = "Keyword to search title, desc, complaint number") @RequestParam(required = false) String keyword,
            @Parameter(description = "Filter by complaint status") @RequestParam(required = false) ComplaintStatus status,
            @Parameter(description = "Filter by priority") @RequestParam(required = false) ComplaintPriority priority,
            @Parameter(description = "Filter by category") @RequestParam(required = false) ComplaintCategory category,
            @Parameter(description = "Creation start date") @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @Parameter(description = "Creation end date") @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate,
            @Parameter(description = "Page number (0-based)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "10") int size,
            @Parameter(description = "Sort by field") @RequestParam(defaultValue = "createdAt") String sortBy,
            @Parameter(description = "Sort direction (asc/desc)") @RequestParam(defaultValue = "desc") String sortDir) {

        Page<ComplaintSummaryDTO> response = complaintService.searchComplaints(societyId, residentId, staffId, buildingId, flatId, keyword, status, priority, category, startDate, endDate, page, size, sortBy, sortDir);
        return ResponseEntity.ok(ApiResponse.success("Complaints retrieved successfully", response));
    }

    @PatchMapping("/{id}/assign")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Assign complaint", description = "Assigns a complaint to a staff member.")
    public ResponseEntity<ApiResponse<ComplaintResponseDTO>> assignComplaint(
            @PathVariable String id,
            @Valid @RequestBody AssignComplaintDTO assignDTO) {
        ComplaintResponseDTO updated = complaintService.assignComplaint(id, assignDTO);
        return ResponseEntity.ok(ApiResponse.success("Complaint assigned successfully", updated));
    }
    
    @PatchMapping("/{id}/start")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_STAFF')")
    @Operation(summary = "Start work on complaint", description = "Transitions an assigned complaint to IN_PROGRESS.")
    public ResponseEntity<ApiResponse<ComplaintResponseDTO>> startWork(
            @PathVariable String id) {
        ComplaintResponseDTO updated = complaintService.startWork(id);
        return ResponseEntity.ok(ApiResponse.success("Work started on complaint", updated));
    }
    
    @PatchMapping("/{id}/hold")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_STAFF')")
    @Operation(summary = "Put complaint on hold", description = "Pauses an in-progress complaint.")
    public ResponseEntity<ApiResponse<ComplaintResponseDTO>> putOnHold(
            @PathVariable String id) {
        ComplaintResponseDTO updated = complaintService.putOnHold(id);
        return ResponseEntity.ok(ApiResponse.success("Complaint put on hold", updated));
    }

    @PatchMapping("/{id}/resolve")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_STAFF')")
    @Operation(summary = "Resolve complaint", description = "Marks a complaint as resolved with resolution notes.")
    public ResponseEntity<ApiResponse<ComplaintResponseDTO>> resolveComplaint(
            @PathVariable String id,
            @Valid @RequestBody ResolveComplaintDTO resolveDTO) {
        ComplaintResponseDTO updated = complaintService.resolveComplaint(id, resolveDTO);
        return ResponseEntity.ok(ApiResponse.success("Complaint resolved successfully", updated));
    }

    @PatchMapping("/{id}/close")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Close complaint", description = "Formally closes a resolved complaint.")
    public ResponseEntity<ApiResponse<ComplaintResponseDTO>> closeComplaint(
            @PathVariable String id) {
        ComplaintResponseDTO updated = complaintService.closeComplaint(id);
        return ResponseEntity.ok(ApiResponse.success("Complaint closed successfully", updated));
    }

    @PatchMapping("/{id}/reject")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Reject complaint", description = "Rejects a complaint without resolution.")
    public ResponseEntity<ApiResponse<ComplaintResponseDTO>> rejectComplaint(
            @PathVariable String id) {
        ComplaintResponseDTO updated = complaintService.rejectComplaint(id);
        return ResponseEntity.ok(ApiResponse.success("Complaint rejected successfully", updated));
    }
    
    @PatchMapping("/{id}/feedback")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_RESIDENT')")
    @Operation(summary = "Submit feedback", description = "Allows a resident to submit a rating and feedback for a resolved complaint.")
    public ResponseEntity<ApiResponse<ComplaintResponseDTO>> submitFeedback(
            @PathVariable String id,
            @Valid @RequestBody FeedbackDTO feedbackDTO) {
        ComplaintResponseDTO updated = complaintService.submitFeedback(id, feedbackDTO);
        return ResponseEntity.ok(ApiResponse.success("Feedback submitted successfully", updated));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Delete complaint record", description = "Soft deletes a closed or rejected complaint.")
    public ResponseEntity<ApiResponse<Void>> deleteComplaint(
            @PathVariable String id) {
        complaintService.deleteComplaint(id);
        return ResponseEntity.ok(ApiResponse.success("Complaint deleted successfully", null));
    }
}
