package com.resicore.modules.community.controller;

import com.resicore.common.response.ApiResponse;
import com.resicore.modules.community.dto.EventRegistrationDTO;
import com.resicore.modules.community.service.EventService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/event-registrations")
@RequiredArgsConstructor
@Tag(name = "Event Registration Controller", description = "Endpoints for resident event RSVP and check-ins")
@SecurityRequirement(name = "bearerAuth")
public class EventRegistrationController {

    private final EventService eventService;

    @PostMapping("/{eventId}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_RESIDENT')")
    @Operation(summary = "Register for an event", description = "Residents register/RSVP for an event, optionally supplying a payment ID.")
    public ResponseEntity<ApiResponse<EventRegistrationDTO>> registerForEvent(
            @PathVariable String eventId,
            @RequestParam(required = false) String paymentId) {
        EventRegistrationDTO registration = eventService.registerForEvent(eventId, paymentId);
        return new ResponseEntity<>(ApiResponse.success("Registered for event successfully", registration), HttpStatus.CREATED);
    }

    @PatchMapping("/{registrationId}/check-in")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_STAFF')")
    @Operation(summary = "Check in participant", description = "Staff checks in a registered resident to the event.")
    public ResponseEntity<ApiResponse<EventRegistrationDTO>> checkInParticipant(
            @PathVariable String registrationId) {
        EventRegistrationDTO checkedIn = eventService.checkInParticipant(registrationId);
        return ResponseEntity.ok(ApiResponse.success("Participant checked in successfully", checkedIn));
    }
}
