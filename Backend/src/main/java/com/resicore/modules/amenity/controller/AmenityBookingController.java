package com.resicore.modules.amenity.controller;

import com.resicore.common.response.ApiResponse;
import com.resicore.modules.amenity.dto.AmenityBookingRequestDTO;
import com.resicore.modules.amenity.dto.AmenityBookingResponseDTO;
import com.resicore.modules.amenity.enums.BookingStatus;
import com.resicore.modules.amenity.service.AmenityBookingService;
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

import java.time.LocalDate;

@RestController
@RequestMapping("/api/v1/amenity-bookings")
@RequiredArgsConstructor
@Tag(name = "Amenity Booking Controller", description = "Endpoints for resident amenity slot reservations and administrative approvals")
@SecurityRequirement(name = "bearerAuth")
public class AmenityBookingController {

    private final AmenityBookingService bookingService;

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_RESIDENT')")
    @Operation(summary = "Create an amenity booking", description = "Residents reserve an amenity slot. Auto validates overlaps and operational rules.")
    public ResponseEntity<ApiResponse<AmenityBookingResponseDTO>> createBooking(
            @Valid @RequestBody AmenityBookingRequestDTO requestDTO) {
        AmenityBookingResponseDTO created = bookingService.createBooking(requestDTO);
        return new ResponseEntity<>(ApiResponse.success("Booking created successfully", created), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_STAFF', 'ROLE_RESIDENT')")
    @Operation(summary = "Get booking by ID", description = "Retrieves complete booking details.")
    public ResponseEntity<ApiResponse<AmenityBookingResponseDTO>> getBookingById(
            @PathVariable String id) {
        AmenityBookingResponseDTO response = bookingService.getBookingById(id);
        return ResponseEntity.ok(ApiResponse.success("Booking retrieved successfully", response));
    }

    @PatchMapping("/{id}/approve")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Approve booking", description = "Admins explicitly approve a PENDING booking.")
    public ResponseEntity<ApiResponse<AmenityBookingResponseDTO>> approveBooking(
            @PathVariable String id) {
        AmenityBookingResponseDTO response = bookingService.approveBooking(id);
        return ResponseEntity.ok(ApiResponse.success("Booking approved", response));
    }
    
    @PatchMapping("/{id}/reject")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Reject booking", description = "Admins reject a PENDING booking with remarks.")
    public ResponseEntity<ApiResponse<AmenityBookingResponseDTO>> rejectBooking(
            @PathVariable String id,
            @RequestParam String remarks) {
        AmenityBookingResponseDTO response = bookingService.rejectBooking(id, remarks);
        return ResponseEntity.ok(ApiResponse.success("Booking rejected", response));
    }
    
    @PatchMapping("/{id}/cancel")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_RESIDENT')")
    @Operation(summary = "Cancel booking", description = "Residents can cancel their own bookings, admins can cancel any.")
    public ResponseEntity<ApiResponse<AmenityBookingResponseDTO>> cancelBooking(
            @PathVariable String id) {
        AmenityBookingResponseDTO response = bookingService.cancelBooking(id);
        return ResponseEntity.ok(ApiResponse.success("Booking cancelled", response));
    }
    
    @PatchMapping("/{id}/check-in")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_STAFF')")
    @Operation(summary = "Check in to amenity", description = "Staff verifies the resident has arrived and occupied the slot.")
    public ResponseEntity<ApiResponse<AmenityBookingResponseDTO>> checkIn(
            @PathVariable String id) {
        AmenityBookingResponseDTO response = bookingService.checkIn(id);
        return ResponseEntity.ok(ApiResponse.success("Resident checked in", response));
    }
    
    @PatchMapping("/{id}/check-out")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_STAFF')")
    @Operation(summary = "Check out of amenity", description = "Staff logs the departure of the resident.")
    public ResponseEntity<ApiResponse<AmenityBookingResponseDTO>> checkOut(
            @PathVariable String id) {
        AmenityBookingResponseDTO response = bookingService.checkOut(id);
        return ResponseEntity.ok(ApiResponse.success("Resident checked out", response));
    }
    
    @PatchMapping("/{id}/complete")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Complete booking", description = "Force mark a booking as COMPLETED administratively.")
    public ResponseEntity<ApiResponse<AmenityBookingResponseDTO>> completeBooking(
            @PathVariable String id) {
        AmenityBookingResponseDTO response = bookingService.completeBooking(id);
        return ResponseEntity.ok(ApiResponse.success("Booking marked as complete", response));
    }

    @GetMapping("/search")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_STAFF', 'ROLE_RESIDENT')")
    @Operation(summary = "Search bookings", description = "Search and filter amenity bookings.")
    public ResponseEntity<ApiResponse<Page<AmenityBookingResponseDTO>>> searchBookings(
            @Parameter(description = "Filter by society ID") @RequestParam(required = false) String societyId,
            @Parameter(description = "Filter by resident ID") @RequestParam(required = false) String residentId,
            @Parameter(description = "Filter by amenity ID") @RequestParam(required = false) String amenityId,
            @Parameter(description = "Filter by booking status") @RequestParam(required = false) BookingStatus status,
            @Parameter(description = "Booking date start range") @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @Parameter(description = "Booking date end range") @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @Parameter(description = "Keyword to search booking number") @RequestParam(required = false) String keyword,
            @Parameter(description = "Page number (0-based)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "10") int size,
            @Parameter(description = "Sort by field") @RequestParam(defaultValue = "createdAt") String sortBy,
            @Parameter(description = "Sort direction (asc/desc)") @RequestParam(defaultValue = "desc") String sortDir) {

        Page<AmenityBookingResponseDTO> response = bookingService.searchBookings(societyId, residentId, amenityId, status, startDate, endDate, keyword, page, size, sortBy, sortDir);
        return ResponseEntity.ok(ApiResponse.success("Bookings retrieved successfully", response));
    }
}
