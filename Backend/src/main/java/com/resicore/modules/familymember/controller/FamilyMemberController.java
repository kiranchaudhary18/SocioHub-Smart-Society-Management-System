package com.resicore.modules.familymember.controller;

import com.resicore.common.response.ApiResponse;
import com.resicore.modules.familymember.dto.FamilyMemberRequestDTO;
import com.resicore.modules.familymember.dto.FamilyMemberResponseDTO;
import com.resicore.modules.familymember.dto.FamilyMemberSummaryDTO;
import com.resicore.modules.familymember.enums.FamilyMemberStatus;
import com.resicore.modules.familymember.enums.Relationship;
import com.resicore.modules.familymember.service.FamilyMemberService;
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
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/family-members")
@RequiredArgsConstructor
@Tag(name = "Family Member Controller", description = "Endpoints for managing family members associated with residents")
@SecurityRequirement(name = "bearerAuth")
public class FamilyMemberController {

    private final FamilyMemberService familyMemberService;

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Add a family member", description = "Adds a family member to an existing resident.")
    public ResponseEntity<ApiResponse<FamilyMemberResponseDTO>> addFamilyMember(
            @Valid @RequestBody FamilyMemberRequestDTO requestDTO) {
        FamilyMemberResponseDTO created = familyMemberService.addFamilyMember(requestDTO);
        return new ResponseEntity<>(ApiResponse.success("Family member added successfully", created), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Update family member", description = "Updates details of an existing family member.")
    public ResponseEntity<ApiResponse<FamilyMemberResponseDTO>> updateFamilyMember(
            @PathVariable String id,
            @Valid @RequestBody FamilyMemberRequestDTO requestDTO) {
        FamilyMemberResponseDTO updated = familyMemberService.updateFamilyMember(id, requestDTO);
        return ResponseEntity.ok(ApiResponse.success("Family member updated successfully", updated));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_STAFF', 'ROLE_RESIDENT')")
    @Operation(summary = "Get family member by ID", description = "Retrieves family member details by their ID.")
    public ResponseEntity<ApiResponse<FamilyMemberResponseDTO>> getFamilyMemberById(
            @PathVariable String id) {
        FamilyMemberResponseDTO response = familyMemberService.getFamilyMemberById(id);
        return ResponseEntity.ok(ApiResponse.success("Family member retrieved successfully", response));
    }

    @GetMapping("/resident/{residentId}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_STAFF', 'ROLE_RESIDENT')")
    @Operation(summary = "Get family members by Resident", description = "Retrieves all family members associated with a specific resident.")
    public ResponseEntity<ApiResponse<List<FamilyMemberSummaryDTO>>> getFamilyMembersByResident(
            @PathVariable String residentId) {
        List<FamilyMemberSummaryDTO> response = familyMemberService.getFamilyMembersByResident(residentId);
        return ResponseEntity.ok(ApiResponse.success("Family members retrieved successfully", response));
    }

    @GetMapping("/flat/{flatId}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_STAFF', 'ROLE_RESIDENT')")
    @Operation(summary = "Get family members by Flat", description = "Retrieves all family members residing in a specific flat.")
    public ResponseEntity<ApiResponse<List<FamilyMemberSummaryDTO>>> getFamilyMembersByFlat(
            @PathVariable String flatId) {
        List<FamilyMemberSummaryDTO> response = familyMemberService.getFamilyMembersByFlat(flatId);
        return ResponseEntity.ok(ApiResponse.success("Family members retrieved successfully", response));
    }

    @GetMapping("/search")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_STAFF')")
    @Operation(summary = "Search family members", description = "Search, filter, and paginate through family members.")
    public ResponseEntity<ApiResponse<Page<FamilyMemberSummaryDTO>>> searchFamilyMembers(
            @Parameter(description = "Filter by society ID") @RequestParam(required = false) String societyId,
            @Parameter(description = "Filter by building ID") @RequestParam(required = false) String buildingId,
            @Parameter(description = "Filter by flat ID") @RequestParam(required = false) String flatId,
            @Parameter(description = "Filter by resident ID") @RequestParam(required = false) String residentId,
            @Parameter(description = "Keyword to search across names, emails, phones") @RequestParam(required = false) String keyword,
            @Parameter(description = "Filter by status") @RequestParam(required = false) FamilyMemberStatus status,
            @Parameter(description = "Filter by relationship") @RequestParam(required = false) Relationship relationship,
            @Parameter(description = "Page number (0-based)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "10") int size,
            @Parameter(description = "Sort by field") @RequestParam(defaultValue = "createdAt") String sortBy,
            @Parameter(description = "Sort direction (asc/desc)") @RequestParam(defaultValue = "desc") String sortDir) {

        Page<FamilyMemberSummaryDTO> response = familyMemberService.searchFamilyMembers(societyId, buildingId, flatId, residentId, keyword, status, relationship, page, size, sortBy, sortDir);
        return ResponseEntity.ok(ApiResponse.success("Family members retrieved successfully", response));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Delete family member", description = "Soft deletes a family member record.")
    public ResponseEntity<ApiResponse<Void>> deleteFamilyMember(
            @PathVariable String id) {
        familyMemberService.removeFamilyMember(id);
        return ResponseEntity.ok(ApiResponse.success("Family member deleted successfully", null));
    }
}
