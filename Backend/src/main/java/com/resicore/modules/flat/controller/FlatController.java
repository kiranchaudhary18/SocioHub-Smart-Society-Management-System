package com.resicore.modules.flat.controller;

import com.resicore.common.response.ApiResponse;
import com.resicore.modules.flat.dto.FlatRequestDTO;
import com.resicore.modules.flat.dto.FlatResponseDTO;
import com.resicore.modules.flat.dto.FlatSummaryDTO;
import com.resicore.modules.flat.enums.FlatStatus;
import com.resicore.modules.flat.enums.FlatType;
import com.resicore.modules.flat.service.FlatService;
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
@RequestMapping("/api/v1/flats")
@RequiredArgsConstructor
@Tag(name = "Flat Controller", description = "Endpoints for managing flats")
@SecurityRequirement(name = "bearerAuth")
public class FlatController {

    private final FlatService flatService;

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Create a new flat", description = "Creates a new flat within a building. Accessible by SUPER_ADMIN or SOCIETY_ADMIN (for their own society).")
    public ResponseEntity<ApiResponse<FlatResponseDTO>> createFlat(
            @Valid @RequestBody FlatRequestDTO requestDTO) {
        FlatResponseDTO created = flatService.createFlat(requestDTO);
        return new ResponseEntity<>(ApiResponse.success("Flat created successfully", created), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Update an existing flat", description = "Updates flat details. Accessible by SUPER_ADMIN or SOCIETY_ADMIN (for their own society).")
    public ResponseEntity<ApiResponse<FlatResponseDTO>> updateFlat(
            @PathVariable String id,
            @Valid @RequestBody FlatRequestDTO requestDTO) {
        FlatResponseDTO updated = flatService.updateFlat(id, requestDTO);
        return ResponseEntity.ok(ApiResponse.success("Flat updated successfully", updated));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_RESIDENT', 'ROLE_STAFF')")
    @Operation(summary = "Get flat by ID", description = "Retrieves detailed information for a specific flat. Residents can only view their assigned flat.")
    public ResponseEntity<ApiResponse<FlatResponseDTO>> getFlatById(
            @PathVariable String id) {
        FlatResponseDTO flat = flatService.getFlatById(id);
        return ResponseEntity.ok(ApiResponse.success("Flat retrieved successfully", flat));
    }

    @GetMapping("/building/{buildingId}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_STAFF')")
    @Operation(summary = "Get flats by Building", description = "Retrieves a list of all flats inside a specific building.")
    public ResponseEntity<ApiResponse<List<FlatSummaryDTO>>> getFlatsByBuilding(
            @PathVariable String buildingId) {
        List<FlatSummaryDTO> flats = flatService.getFlatsByBuilding(buildingId);
        return ResponseEntity.ok(ApiResponse.success("Flats retrieved successfully", flats));
    }
    
    @GetMapping("/society/{societyId}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_STAFF')")
    @Operation(summary = "Get flats by Society", description = "Retrieves a list of all flats inside a specific society.")
    public ResponseEntity<ApiResponse<List<FlatSummaryDTO>>> getFlatsBySociety(
            @PathVariable String societyId) {
        List<FlatSummaryDTO> flats = flatService.getFlatsBySociety(societyId);
        return ResponseEntity.ok(ApiResponse.success("Flats retrieved successfully", flats));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Delete a flat", description = "Soft deletes a flat. Accessible by SUPER_ADMIN or SOCIETY_ADMIN (for their own society).")
    public ResponseEntity<ApiResponse<Void>> deleteFlat(
            @PathVariable String id) {
        flatService.deleteFlat(id);
        return ResponseEntity.ok(ApiResponse.success("Flat deleted successfully", null));
    }

    @GetMapping("/search")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_STAFF')")
    @Operation(summary = "Search flats", description = "Search, filter, and paginate through flats.")
    public ResponseEntity<ApiResponse<Page<FlatSummaryDTO>>> searchFlats(
            @Parameter(description = "Filter by society ID") @RequestParam(required = false) String societyId,
            @Parameter(description = "Filter by building ID") @RequestParam(required = false) String buildingId,
            @Parameter(description = "Keyword to search across block, wing, flatNumber") @RequestParam(required = false) String keyword,
            @Parameter(description = "Filter by status") @RequestParam(required = false) FlatStatus status,
            @Parameter(description = "Filter by flat type") @RequestParam(required = false) FlatType flatType,
            @Parameter(description = "Filter by occupancy") @RequestParam(required = false) Boolean isOccupied,
            @Parameter(description = "Page number (0-based)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "10") int size,
            @Parameter(description = "Sort by field") @RequestParam(defaultValue = "createdAt") String sortBy,
            @Parameter(description = "Sort direction (asc/desc)") @RequestParam(defaultValue = "desc") String sortDir) {

        Page<FlatSummaryDTO> flats = flatService.searchFlats(societyId, buildingId, keyword, status, flatType, isOccupied, page, size, sortBy, sortDir);
        return ResponseEntity.ok(ApiResponse.success("Flats retrieved successfully", flats));
    }
    
    @PatchMapping("/{id}/assign-resident")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Assign a resident to flat", description = "Assigns an existing user (resident) to a flat and marks it occupied.")
    public ResponseEntity<ApiResponse<FlatResponseDTO>> assignResident(
            @PathVariable String id,
            @Parameter(description = "User ID of the resident to assign") @RequestParam String residentId) {
        FlatResponseDTO updated = flatService.assignResident(id, residentId);
        return ResponseEntity.ok(ApiResponse.success("Resident assigned successfully", updated));
    }
    
    @PatchMapping("/{id}/remove-resident")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Remove resident from flat", description = "Removes the currently assigned resident from a flat and marks it available.")
    public ResponseEntity<ApiResponse<FlatResponseDTO>> removeResident(
            @PathVariable String id) {
        FlatResponseDTO updated = flatService.removeResident(id);
        return ResponseEntity.ok(ApiResponse.success("Resident removed successfully", updated));
    }
}
