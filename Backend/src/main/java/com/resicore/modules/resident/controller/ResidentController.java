package com.resicore.modules.resident.controller;

import com.resicore.common.response.ApiResponse;
import com.resicore.modules.resident.dto.ResidentProfileDTO;
import com.resicore.modules.resident.dto.ResidentRequestDTO;
import com.resicore.modules.resident.dto.ResidentResponseDTO;
import com.resicore.modules.resident.dto.ResidentSummaryDTO;
import com.resicore.modules.resident.enums.OwnerType;
import com.resicore.modules.resident.enums.ResidentStatus;
import com.resicore.modules.resident.service.ResidentService;
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
@RequestMapping("/api/v1/residents")
@RequiredArgsConstructor
@Tag(name = "Resident Controller", description = "Endpoints for managing residents")
@SecurityRequirement(name = "bearerAuth")
public class ResidentController {

    private final ResidentService residentService;
    private final UserRepository userRepository;

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Register a new resident", description = "Registers a new resident and links them to a user and flat.")
    public ResponseEntity<ApiResponse<ResidentResponseDTO>> registerResident(
            @Valid @RequestBody ResidentRequestDTO requestDTO) {
        ResidentResponseDTO created = residentService.registerResident(requestDTO);
        return new ResponseEntity<>(ApiResponse.success("Resident registered successfully", created), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_RESIDENT')")
    @Operation(summary = "Update an existing resident", description = "Updates resident details. Residents can only update their own profile.")
    public ResponseEntity<ApiResponse<ResidentResponseDTO>> updateResident(
            @PathVariable String id,
            @Valid @RequestBody ResidentRequestDTO requestDTO) {
        ResidentResponseDTO updated = residentService.updateResident(id, requestDTO);
        return ResponseEntity.ok(ApiResponse.success("Resident updated successfully", updated));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_RESIDENT', 'ROLE_STAFF')")
    @Operation(summary = "Get resident by ID", description = "Retrieves detailed information for a specific resident.")
    public ResponseEntity<ApiResponse<ResidentResponseDTO>> getResidentById(
            @PathVariable String id) {
        ResidentResponseDTO resident = residentService.getResidentById(id);
        return ResponseEntity.ok(ApiResponse.success("Resident retrieved successfully", resident));
    }

    @GetMapping("/me")
    @PreAuthorize("hasAnyAuthority('ROLE_RESIDENT')")
    @Operation(summary = "Get my profile", description = "Retrieves the profile of the currently logged-in resident.")
    public ResponseEntity<ApiResponse<ResidentProfileDTO>> getMyProfile() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
                
        ResidentProfileDTO profile = residentService.getResidentByUserId(user.getId());
        return ResponseEntity.ok(ApiResponse.success("Profile retrieved successfully", profile));
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Get resident by User ID", description = "Retrieves the resident profile using the User ID.")
    public ResponseEntity<ApiResponse<ResidentProfileDTO>> getResidentByUserId(
            @PathVariable String userId) {
        ResidentProfileDTO profile = residentService.getResidentByUserId(userId);
        return ResponseEntity.ok(ApiResponse.success("Resident profile retrieved successfully", profile));
    }

    @GetMapping("/flat/{flatId}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_STAFF')")
    @Operation(summary = "Get residents by Flat", description = "Retrieves all residents assigned to a specific flat.")
    public ResponseEntity<ApiResponse<List<ResidentSummaryDTO>>> getResidentsByFlat(
            @PathVariable String flatId) {
        List<ResidentSummaryDTO> residents = residentService.getResidentsByFlat(flatId);
        return ResponseEntity.ok(ApiResponse.success("Residents retrieved successfully", residents));
    }

    @GetMapping("/search")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_STAFF')")
    @Operation(summary = "Search residents", description = "Search, filter, and paginate through residents.")
    public ResponseEntity<ApiResponse<Page<ResidentSummaryDTO>>> searchResidents(
            @Parameter(description = "Filter by society ID") @RequestParam(required = false) String societyId,
            @Parameter(description = "Filter by building ID") @RequestParam(required = false) String buildingId,
            @Parameter(description = "Filter by flat ID") @RequestParam(required = false) String flatId,
            @Parameter(description = "Keyword to search across names, emails, phones, and codes") @RequestParam(required = false) String keyword,
            @Parameter(description = "Filter by status") @RequestParam(required = false) ResidentStatus status,
            @Parameter(description = "Filter by owner type") @RequestParam(required = false) OwnerType ownerType,
            @Parameter(description = "Page number (0-based)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "10") int size,
            @Parameter(description = "Sort by field") @RequestParam(defaultValue = "createdAt") String sortBy,
            @Parameter(description = "Sort direction (asc/desc)") @RequestParam(defaultValue = "desc") String sortDir) {

        Page<ResidentSummaryDTO> residents = residentService.searchResidents(societyId, buildingId, flatId, keyword, status, ownerType, page, size, sortBy, sortDir);
        return ResponseEntity.ok(ApiResponse.success("Residents retrieved successfully", residents));
    }

    @PatchMapping("/{id}/approve")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Approve resident", description = "Approves a resident's registration, marking them active.")
    public ResponseEntity<ApiResponse<ResidentResponseDTO>> approveResident(
            @PathVariable String id) {
        ResidentResponseDTO updated = residentService.approveResident(id);
        return ResponseEntity.ok(ApiResponse.success("Resident approved successfully", updated));
    }

    @PatchMapping("/{id}/reject")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Reject resident", description = "Rejects a resident's registration, marking them blocked.")
    public ResponseEntity<ApiResponse<ResidentResponseDTO>> rejectResident(
            @PathVariable String id) {
        ResidentResponseDTO updated = residentService.rejectResident(id);
        return ResponseEntity.ok(ApiResponse.success("Resident rejected successfully", updated));
    }

    @PatchMapping("/{id}/move-out")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Move resident out", description = "Marks a resident as moved out and updates flat occupancy if they were the primary resident.")
    public ResponseEntity<ApiResponse<ResidentResponseDTO>> moveResidentOut(
            @PathVariable String id) {
        ResidentResponseDTO updated = residentService.moveResidentOut(id);
        return ResponseEntity.ok(ApiResponse.success("Resident moved out successfully", updated));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Delete a resident", description = "Soft deletes a resident record.")
    public ResponseEntity<ApiResponse<Void>> deleteResident(
            @PathVariable String id) {
        residentService.deleteResident(id);
        return ResponseEntity.ok(ApiResponse.success("Resident deleted successfully", null));
    }
}
