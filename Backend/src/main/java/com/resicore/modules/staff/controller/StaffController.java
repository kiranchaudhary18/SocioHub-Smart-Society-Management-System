package com.resicore.modules.staff.controller;

import com.resicore.common.response.ApiResponse;
import com.resicore.modules.staff.dto.StaffProfileDTO;
import com.resicore.modules.staff.dto.StaffRequestDTO;
import com.resicore.modules.staff.dto.StaffResponseDTO;
import com.resicore.modules.staff.dto.StaffSummaryDTO;
import com.resicore.modules.staff.enums.EmploymentType;
import com.resicore.modules.staff.enums.Shift;
import com.resicore.modules.staff.enums.StaffStatus;
import com.resicore.modules.staff.enums.StaffType;
import com.resicore.modules.staff.service.StaffService;
import com.resicore.modules.user.entity.User;
import com.resicore.modules.user.repository.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/staff")
@RequiredArgsConstructor
@Tag(name = "Staff Controller", description = "Endpoints for managing society staff members")
@SecurityRequirement(name = "bearerAuth")
public class StaffController {

    private final StaffService staffService;
    private final UserRepository userRepository;

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Create staff member", description = "Creates a new staff member and links them to a user.")
    public ResponseEntity<ApiResponse<StaffResponseDTO>> createStaff(
            @Valid @RequestBody StaffRequestDTO requestDTO) {
        StaffResponseDTO created = staffService.createStaff(requestDTO);
        return new ResponseEntity<>(ApiResponse.success("Staff created successfully", created), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_STAFF')")
    @Operation(summary = "Update staff member", description = "Updates details of an existing staff member. Staff can only update their own profile.")
    public ResponseEntity<ApiResponse<StaffResponseDTO>> updateStaff(
            @PathVariable String id,
            @Valid @RequestBody StaffRequestDTO requestDTO) {
        StaffResponseDTO updated = staffService.updateStaff(id, requestDTO);
        return ResponseEntity.ok(ApiResponse.success("Staff updated successfully", updated));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Get staff by ID", description = "Retrieves staff details by their ID.")
    public ResponseEntity<ApiResponse<StaffResponseDTO>> getStaffById(
            @PathVariable String id) {
        StaffResponseDTO response = staffService.getStaffById(id);
        return ResponseEntity.ok(ApiResponse.success("Staff retrieved successfully", response));
    }

    @GetMapping("/me")
    @PreAuthorize("hasAnyAuthority('ROLE_STAFF')")
    @Operation(summary = "Get my profile", description = "Retrieves the profile of the currently logged-in staff member.")
    public ResponseEntity<ApiResponse<StaffProfileDTO>> getMyProfile() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
                
        StaffProfileDTO profile = staffService.getStaffByUserId(user.getId());
        return ResponseEntity.ok(ApiResponse.success("Profile retrieved successfully", profile));
    }

    @GetMapping("/society/{societyId}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Get staff by Society", description = "Retrieves all staff members belonging to a specific society.")
    public ResponseEntity<ApiResponse<List<StaffSummaryDTO>>> getStaffBySociety(
            @PathVariable String societyId) {
        List<StaffSummaryDTO> response = staffService.getStaffBySociety(societyId);
        return ResponseEntity.ok(ApiResponse.success("Staff members retrieved successfully", response));
    }

    @GetMapping("/search")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Search staff members", description = "Search, filter, and paginate through staff members.")
    public ResponseEntity<ApiResponse<Page<StaffSummaryDTO>>> searchStaff(
            @Parameter(description = "Filter by society ID") @RequestParam(required = false) String societyId,
            @Parameter(description = "Keyword to search across names, emails, phones, codes") @RequestParam(required = false) String keyword,
            @Parameter(description = "Filter by department") @RequestParam(required = false) String department,
            @Parameter(description = "Filter by staff type") @RequestParam(required = false) StaffType staffType,
            @Parameter(description = "Filter by employment type") @RequestParam(required = false) EmploymentType employmentType,
            @Parameter(description = "Filter by shift") @RequestParam(required = false) Shift shift,
            @Parameter(description = "Filter by status") @RequestParam(required = false) StaffStatus status,
            @Parameter(description = "Page number (0-based)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "10") int size,
            @Parameter(description = "Sort by field") @RequestParam(defaultValue = "createdAt") String sortBy,
            @Parameter(description = "Sort direction (asc/desc)") @RequestParam(defaultValue = "desc") String sortDir) {

        Page<StaffSummaryDTO> response = staffService.searchStaff(societyId, keyword, department, staffType, employmentType, shift, status, page, size, sortBy, sortDir);
        return ResponseEntity.ok(ApiResponse.success("Staff members retrieved successfully", response));
    }

    @PatchMapping("/{id}/activate")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Activate staff", description = "Marks a staff member as active.")
    public ResponseEntity<ApiResponse<StaffResponseDTO>> activateStaff(
            @PathVariable String id) {
        StaffResponseDTO updated = staffService.activateStaff(id);
        return ResponseEntity.ok(ApiResponse.success("Staff activated successfully", updated));
    }

    @PatchMapping("/{id}/deactivate")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Deactivate staff", description = "Marks a staff member as inactive.")
    public ResponseEntity<ApiResponse<StaffResponseDTO>> deactivateStaff(
            @PathVariable String id) {
        StaffResponseDTO updated = staffService.deactivateStaff(id);
        return ResponseEntity.ok(ApiResponse.success("Staff deactivated successfully", updated));
    }

    @PatchMapping("/{id}/terminate")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Terminate staff", description = "Marks a staff member as terminated.")
    public ResponseEntity<ApiResponse<StaffResponseDTO>> terminateStaff(
            @PathVariable String id) {
        StaffResponseDTO updated = staffService.terminateStaff(id);
        return ResponseEntity.ok(ApiResponse.success("Staff terminated successfully", updated));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Delete staff member", description = "Soft deletes a staff member record.")
    public ResponseEntity<ApiResponse<Void>> deleteStaff(
            @PathVariable String id) {
        staffService.deleteStaff(id);
        return ResponseEntity.ok(ApiResponse.success("Staff deleted successfully", null));
    }
}
