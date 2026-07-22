package com.resicore.modules.society.controller;

import com.resicore.common.response.ApiResponse;
import com.resicore.modules.society.dto.SocietyRequestDTO;
import com.resicore.modules.society.dto.SocietyResponseDTO;
import com.resicore.modules.society.dto.SocietySummaryDTO;
import com.resicore.modules.society.enums.SocietyStatus;
import com.resicore.modules.society.service.SocietyService;
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
@RequestMapping("/api/v1/societies")
@RequiredArgsConstructor
@Tag(name = "Society Controller", description = "Endpoints for managing societies")
@SecurityRequirement(name = "bearerAuth")
public class SocietyController {

    private final SocietyService societyService;

    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN')")
    @Operation(summary = "Create a new society", description = "Creates a new society. Only accessible by SUPER_ADMIN.")
    public ResponseEntity<ApiResponse<SocietyResponseDTO>> createSociety(
            @Valid @RequestBody SocietyRequestDTO requestDTO) {
        SocietyResponseDTO created = societyService.createSociety(requestDTO);
        return new ResponseEntity<>(ApiResponse.success("Society created successfully", created), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Update an existing society", description = "Updates society details. Accessible by SUPER_ADMIN or SOCIETY_ADMIN.")
    public ResponseEntity<ApiResponse<SocietyResponseDTO>> updateSociety(
            @PathVariable String id,
            @Valid @RequestBody SocietyRequestDTO requestDTO) {
        SocietyResponseDTO updated = societyService.updateSociety(id, requestDTO);
        return ResponseEntity.ok(ApiResponse.success("Society updated successfully", updated));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Get society by ID", description = "Retrieves detailed information for a specific society.")
    public ResponseEntity<ApiResponse<SocietyResponseDTO>> getSocietyById(
            @PathVariable String id) {
        SocietyResponseDTO society = societyService.getSocietyById(id);
        return ResponseEntity.ok(ApiResponse.success("Society retrieved successfully", society));
    }

    @GetMapping("/code/{societyCode}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Get society by Code", description = "Retrieves detailed information for a specific society by its unique code.")
    public ResponseEntity<ApiResponse<SocietyResponseDTO>> getSocietyByCode(
            @PathVariable String societyCode) {
        SocietyResponseDTO society = societyService.getSocietyByCode(societyCode);
        return ResponseEntity.ok(ApiResponse.success("Society retrieved successfully", society));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN')")
    @Operation(summary = "Delete a society", description = "Soft deletes a society. Only accessible by SUPER_ADMIN.")
    public ResponseEntity<ApiResponse<Void>> deleteSociety(
            @PathVariable String id) {
        societyService.deleteSociety(id);
        return ResponseEntity.ok(ApiResponse.success("Society deleted successfully", null));
    }

    @GetMapping("/search")
    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN')")
    @Operation(summary = "Search societies", description = "Search, filter, and paginate through all societies. Only accessible by SUPER_ADMIN.")
    public ResponseEntity<ApiResponse<Page<SocietySummaryDTO>>> searchSocieties(
            @Parameter(description = "Keyword to search across name, code, registration, email") @RequestParam(required = false) String keyword,
            @Parameter(description = "Filter by status") @RequestParam(required = false) SocietyStatus status,
            @Parameter(description = "Filter by city") @RequestParam(required = false) String city,
            @Parameter(description = "Filter by state") @RequestParam(required = false) String state,
            @Parameter(description = "Page number (0-based)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "10") int size,
            @Parameter(description = "Sort by field") @RequestParam(defaultValue = "createdAt") String sortBy,
            @Parameter(description = "Sort direction (asc/desc)") @RequestParam(defaultValue = "desc") String sortDir) {

        Page<SocietySummaryDTO> societies = societyService.searchSocieties(keyword, status, city, state, page, size, sortBy, sortDir);
        return ResponseEntity.ok(ApiResponse.success("Societies retrieved successfully", societies));
    }
}
