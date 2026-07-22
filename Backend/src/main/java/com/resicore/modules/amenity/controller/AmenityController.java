package com.resicore.modules.amenity.controller;

import com.resicore.common.response.ApiResponse;
import com.resicore.modules.amenity.dto.AmenityRequestDTO;
import com.resicore.modules.amenity.dto.AmenityResponseDTO;
import com.resicore.modules.amenity.dto.AmenitySummaryDTO;
import com.resicore.modules.amenity.enums.AmenityCategory;
import com.resicore.modules.amenity.enums.AmenityStatus;
import com.resicore.modules.amenity.service.AmenityService;
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

@RestController
@RequestMapping("/api/v1/amenities")
@RequiredArgsConstructor
@Tag(name = "Amenity Controller", description = "Endpoints for managing society amenities")
@SecurityRequirement(name = "bearerAuth")
public class AmenityController {

    private final AmenityService amenityService;

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Create an amenity", description = "Creates a new amenity available for booking in the society.")
    public ResponseEntity<ApiResponse<AmenityResponseDTO>> createAmenity(
            @Valid @RequestBody AmenityRequestDTO requestDTO) {
        AmenityResponseDTO created = amenityService.createAmenity(requestDTO);
        return new ResponseEntity<>(ApiResponse.success("Amenity created successfully", created), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Update an amenity", description = "Updates details, configuration, and rules of an amenity.")
    public ResponseEntity<ApiResponse<AmenityResponseDTO>> updateAmenity(
            @PathVariable String id,
            @Valid @RequestBody AmenityRequestDTO requestDTO) {
        AmenityResponseDTO updated = amenityService.updateAmenity(id, requestDTO);
        return ResponseEntity.ok(ApiResponse.success("Amenity updated successfully", updated));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_STAFF', 'ROLE_RESIDENT')")
    @Operation(summary = "Get amenity by ID", description = "Retrieves complete details of an amenity.")
    public ResponseEntity<ApiResponse<AmenityResponseDTO>> getAmenityById(
            @PathVariable String id) {
        AmenityResponseDTO response = amenityService.getAmenityById(id);
        return ResponseEntity.ok(ApiResponse.success("Amenity retrieved successfully", response));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Delete an amenity", description = "Soft deletes an amenity.")
    public ResponseEntity<ApiResponse<Void>> deleteAmenity(
            @PathVariable String id) {
        amenityService.deleteAmenity(id);
        return ResponseEntity.ok(ApiResponse.success("Amenity deleted successfully", null));
    }
    
    @PatchMapping("/{id}/deactivate")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Deactivate an amenity", description = "Sets amenity status to INACTIVE, preventing new bookings.")
    public ResponseEntity<ApiResponse<AmenityResponseDTO>> deactivateAmenity(
            @PathVariable String id) {
        AmenityResponseDTO response = amenityService.deactivateAmenity(id);
        return ResponseEntity.ok(ApiResponse.success("Amenity deactivated successfully", response));
    }

    @GetMapping("/search")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_STAFF', 'ROLE_RESIDENT')")
    @Operation(summary = "Search amenities", description = "Paginated search and filtering for amenities.")
    public ResponseEntity<ApiResponse<Page<AmenitySummaryDTO>>> searchAmenities(
            @Parameter(description = "Filter by society ID") @RequestParam(required = false) String societyId,
            @Parameter(description = "Filter by category") @RequestParam(required = false) AmenityCategory category,
            @Parameter(description = "Filter by status") @RequestParam(required = false) AmenityStatus status,
            @Parameter(description = "Search keyword (name/code)") @RequestParam(required = false) String keyword,
            @Parameter(description = "Page number (0-based)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "10") int size,
            @Parameter(description = "Sort by field") @RequestParam(defaultValue = "createdAt") String sortBy,
            @Parameter(description = "Sort direction (asc/desc)") @RequestParam(defaultValue = "desc") String sortDir) {

        Page<AmenitySummaryDTO> response = amenityService.searchAmenities(societyId, category, status, keyword, page, size, sortBy, sortDir);
        return ResponseEntity.ok(ApiResponse.success("Amenities retrieved successfully", response));
    }
}
