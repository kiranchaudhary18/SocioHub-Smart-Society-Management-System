package com.resicore.modules.community.controller;

import com.resicore.common.response.ApiResponse;
import com.resicore.modules.community.dto.EventRequestDTO;
import com.resicore.modules.community.dto.EventResponseDTO;
import com.resicore.modules.community.enums.EventStatus;
import com.resicore.modules.community.service.EventService;
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

@RestController
@RequestMapping("/api/v1/events")
@RequiredArgsConstructor
@Tag(name = "Event Controller", description = "Endpoints for managing society events")
@SecurityRequirement(name = "bearerAuth")
public class EventController {

    private final EventService eventService;

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Create an event", description = "Creates a new society event.")
    public ResponseEntity<ApiResponse<EventResponseDTO>> createEvent(
            @Valid @RequestBody EventRequestDTO requestDTO) {
        EventResponseDTO created = eventService.createEvent(requestDTO);
        return new ResponseEntity<>(ApiResponse.success("Event created", created), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Update an event", description = "Updates an event.")
    public ResponseEntity<ApiResponse<EventResponseDTO>> updateEvent(
            @PathVariable String id,
            @Valid @RequestBody EventRequestDTO requestDTO) {
        EventResponseDTO updated = eventService.updateEvent(id, requestDTO);
        return ResponseEntity.ok(ApiResponse.success("Event updated", updated));
    }

    @PatchMapping("/{id}/cancel")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Cancel an event", description = "Cancels a scheduled event.")
    public ResponseEntity<ApiResponse<EventResponseDTO>> cancelEvent(
            @PathVariable String id) {
        EventResponseDTO response = eventService.cancelEvent(id);
        return ResponseEntity.ok(ApiResponse.success("Event cancelled", response));
    }
    
    @PatchMapping("/{id}/complete")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Complete an event", description = "Marks an event as COMPLETED.")
    public ResponseEntity<ApiResponse<EventResponseDTO>> completeEvent(
            @PathVariable String id) {
        EventResponseDTO response = eventService.completeEvent(id);
        return ResponseEntity.ok(ApiResponse.success("Event completed", response));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Delete an event", description = "Soft deletes an event.")
    public ResponseEntity<ApiResponse<Void>> deleteEvent(
            @PathVariable String id) {
        eventService.deleteEvent(id);
        return ResponseEntity.ok(ApiResponse.success("Event deleted", null));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_STAFF', 'ROLE_RESIDENT')")
    @Operation(summary = "Get an event", description = "Retrieves event details.")
    public ResponseEntity<ApiResponse<EventResponseDTO>> getEventById(
            @PathVariable String id) {
        EventResponseDTO event = eventService.getEventById(id);
        return ResponseEntity.ok(ApiResponse.success("Event retrieved", event));
    }

    @GetMapping("/search")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_STAFF', 'ROLE_RESIDENT')")
    @Operation(summary = "Search events", description = "Search and filter events.")
    public ResponseEntity<ApiResponse<Page<EventResponseDTO>>> searchEvents(
            @Parameter(description = "Filter by society ID") @RequestParam(required = false) String societyId,
            @Parameter(description = "Filter by category") @RequestParam(required = false) String category,
            @Parameter(description = "Filter by status") @RequestParam(required = false) EventStatus status,
            @Parameter(description = "Start date range") @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @Parameter(description = "End date range") @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate,
            @Parameter(description = "Keyword to search title/description") @RequestParam(required = false) String keyword,
            @Parameter(description = "Page number (0-based)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "10") int size,
            @Parameter(description = "Sort by field") @RequestParam(defaultValue = "startDateTime") String sortBy,
            @Parameter(description = "Sort direction (asc/desc)") @RequestParam(defaultValue = "desc") String sortDir) {

        Page<EventResponseDTO> response = eventService.searchEvents(societyId, category, status, startDate, endDate, keyword, page, size, sortBy, sortDir);
        return ResponseEntity.ok(ApiResponse.success("Events retrieved", response));
    }
}
