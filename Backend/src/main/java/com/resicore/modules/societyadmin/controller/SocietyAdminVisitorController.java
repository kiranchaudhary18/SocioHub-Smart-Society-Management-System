package com.resicore.modules.societyadmin.controller;

import com.resicore.common.response.ApiResponse;
import com.resicore.modules.visitor.entity.Visitor;
import com.resicore.modules.societyadmin.dto.VisitorApprovalRequestDTO;
import com.resicore.modules.societyadmin.service.SocietyAdminVisitorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/society-admin/visitor")
@RequiredArgsConstructor
@Tag(name = "Society Admin - Visitor Management", description = "APIs for managing and approving visitors")
public class SocietyAdminVisitorController {

    private final SocietyAdminVisitorService visitorService;

    @GetMapping("/pending/{societyId}")
    @PreAuthorize("hasAnyAuthority('ROLE_SOCIETY_ADMIN', 'ROLE_SUPER_ADMIN')")
    @Operation(summary = "Get pending visitors", description = "Retrieves all pending visitor requests for a society")
    public ResponseEntity<ApiResponse<Page<Visitor>>> getPendingVisitors(
            @PathVariable String societyId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Visitor> visitors = visitorService.getPendingVisitors(societyId, pageable);
        return ResponseEntity.ok(ApiResponse.success("Pending visitors fetched successfully", visitors));
    }

    @PostMapping("/approve")
    @PreAuthorize("hasAnyAuthority('ROLE_SOCIETY_ADMIN', 'ROLE_SUPER_ADMIN')")
    @Operation(summary = "Approve Visitor", description = "Approves a visitor's request")
    public ResponseEntity<ApiResponse<Visitor>> approveVisitor(@RequestBody VisitorApprovalRequestDTO request) {
        Visitor visitor = visitorService.approveVisitor(request);
        return ResponseEntity.ok(ApiResponse.success("Visitor approved successfully", visitor));
    }

    @PostMapping("/reject")
    @PreAuthorize("hasAnyAuthority('ROLE_SOCIETY_ADMIN', 'ROLE_SUPER_ADMIN')")
    @Operation(summary = "Reject Visitor", description = "Rejects a visitor's request")
    public ResponseEntity<ApiResponse<Visitor>> rejectVisitor(@RequestBody VisitorApprovalRequestDTO request) {
        Visitor visitor = visitorService.rejectVisitor(request);
        return ResponseEntity.ok(ApiResponse.success("Visitor rejected successfully", visitor));
    }

    @GetMapping("/history/{societyId}")
    @PreAuthorize("hasAnyAuthority('ROLE_SOCIETY_ADMIN', 'ROLE_SUPER_ADMIN')")
    @Operation(summary = "Get visitor history", description = "Retrieves the historical log of all visitors")
    public ResponseEntity<ApiResponse<Page<Visitor>>> getVisitorHistory(
            @PathVariable String societyId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Visitor> visitors = visitorService.getVisitorHistory(societyId, pageable);
        return ResponseEntity.ok(ApiResponse.success("Visitor history fetched successfully", visitors));
    }
    
    @GetMapping("/today/{societyId}")
    @PreAuthorize("hasAnyAuthority('ROLE_SOCIETY_ADMIN', 'ROLE_SUPER_ADMIN')")
    @Operation(summary = "Get today's visitors", description = "Retrieves all visitors for today")
    public ResponseEntity<ApiResponse<Page<Visitor>>> getTodaysVisitors(
            @PathVariable String societyId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Visitor> visitors = visitorService.getTodaysVisitors(societyId, pageable);
        return ResponseEntity.ok(ApiResponse.success("Today's visitors fetched successfully", visitors));
    }
}
