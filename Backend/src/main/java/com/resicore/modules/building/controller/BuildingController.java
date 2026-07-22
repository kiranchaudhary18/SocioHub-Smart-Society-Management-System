package com.resicore.modules.building.controller;

import com.resicore.common.response.ApiResponse;
import com.resicore.modules.building.dto.BuildingRequestDTO;
import com.resicore.modules.building.dto.BuildingResponseDTO;
import com.resicore.modules.building.dto.BuildingSummaryDTO;
import com.resicore.modules.building.enums.BuildingStatus;
import com.resicore.modules.building.service.BuildingService;
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
@RequestMapping("/api/v1/buildings")
@RequiredArgsConstructor
@Tag(name = "Building Controller", description = "Endpoints for managing buildings within a society")
@SecurityRequirement(name = "bearerAuth")
public class BuildingController {

    private final BuildingService buildingService;

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Create a new building", description = "Creates a new building. Accessible by SUPER_ADMIN or SOCIETY_ADMIN (for their own society).")
    public ResponseEntity<ApiResponse<BuildingResponseDTO>> createBuilding(
            @Valid @RequestBody BuildingRequestDTO requestDTO) {
        BuildingResponseDTO created = buildingService.createBuilding(requestDTO);
        return new ResponseEntity<>(ApiResponse.success("Building created successfully", created), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Update an existing building", description = "Updates building details. Accessible by SUPER_ADMIN or SOCIETY_ADMIN (for their own society).")
    public ResponseEntity<ApiResponse<BuildingResponseDTO>> updateBuilding(
            @PathVariable String id,
            @Valid @RequestBody BuildingRequestDTO requestDTO) {
        BuildingResponseDTO updated = buildingService.updateBuilding(id, requestDTO);
        return ResponseEntity.ok(ApiResponse.success("Building updated successfully", updated));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get building by ID", description = "Retrieves detailed information for a specific building. Accessible by all authenticated users.")
    public ResponseEntity<ApiResponse<BuildingResponseDTO>> getBuildingById(
            @PathVariable String id) {
        BuildingResponseDTO building = buildingService.getBuildingById(id);
        return ResponseEntity.ok(ApiResponse.success("Building retrieved successfully", building));
    }

    @GetMapping("/society/{societyId}")
    @Operation(summary = "Get buildings by Society", description = "Retrieves a list of all buildings inside a specific society. Accessible by all authenticated users.")
    public ResponseEntity<ApiResponse<List<BuildingSummaryDTO>>> getBuildingsBySociety(
            @PathVariable String societyId) {
        List<BuildingSummaryDTO> buildings = buildingService.getBuildingsBySociety(societyId);
        return ResponseEntity.ok(ApiResponse.success("Buildings retrieved successfully", buildings));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Delete a building", description = "Soft deletes a building. Accessible by SUPER_ADMIN or SOCIETY_ADMIN (for their own society).")
    public ResponseEntity<ApiResponse<Void>> deleteBuilding(
            @PathVariable String id) {
        buildingService.deleteBuilding(id);
        return ResponseEntity.ok(ApiResponse.success("Building deleted successfully", null));
    }

    @GetMapping("/search")
    @Operation(summary = "Search buildings", description = "Search, filter, and paginate through buildings. Accessible by all authenticated users.")
    public ResponseEntity<ApiResponse<Page<BuildingSummaryDTO>>> searchBuildings(
            @Parameter(description = "Filter by society ID") @RequestParam(required = false) String societyId,
            @Parameter(description = "Keyword to search across name and code") @RequestParam(required = false) String keyword,
            @Parameter(description = "Filter by status") @RequestParam(required = false) BuildingStatus status,
            @Parameter(description = "Page number (0-based)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "10") int size,
            @Parameter(description = "Sort by field") @RequestParam(defaultValue = "createdAt") String sortBy,
            @Parameter(description = "Sort direction (asc/desc)") @RequestParam(defaultValue = "desc") String sortDir) {

        Page<BuildingSummaryDTO> buildings = buildingService.searchBuildings(societyId, keyword, status, page, size, sortBy, sortDir);
        return ResponseEntity.ok(ApiResponse.success("Buildings retrieved successfully", buildings));
    }
}
