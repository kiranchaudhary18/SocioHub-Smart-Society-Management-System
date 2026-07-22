package com.resicore.modules.community.controller;

import com.resicore.common.response.ApiResponse;
import com.resicore.modules.community.dto.NoticeRequestDTO;
import com.resicore.modules.community.dto.NoticeResponseDTO;
import com.resicore.modules.community.enums.NoticeCategory;
import com.resicore.modules.community.enums.NoticeStatus;
import com.resicore.modules.community.service.NoticeService;
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
@RequestMapping("/api/v1/notices")
@RequiredArgsConstructor
@Tag(name = "Notice Controller", description = "Endpoints for managing society notices and broadcasts")
@SecurityRequirement(name = "bearerAuth")
public class NoticeController {

    private final NoticeService noticeService;

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Create a notice", description = "Creates a draft notice.")
    public ResponseEntity<ApiResponse<NoticeResponseDTO>> createNotice(
            @Valid @RequestBody NoticeRequestDTO requestDTO) {
        NoticeResponseDTO created = noticeService.createNotice(requestDTO);
        return new ResponseEntity<>(ApiResponse.success("Notice created", created), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Update a notice", description = "Updates a draft notice.")
    public ResponseEntity<ApiResponse<NoticeResponseDTO>> updateNotice(
            @PathVariable String id,
            @Valid @RequestBody NoticeRequestDTO requestDTO) {
        NoticeResponseDTO updated = noticeService.updateNotice(id, requestDTO);
        return ResponseEntity.ok(ApiResponse.success("Notice updated", updated));
    }

    @PatchMapping("/{id}/publish")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Publish a notice", description = "Marks a draft notice as PUBLISHED so residents can see it.")
    public ResponseEntity<ApiResponse<NoticeResponseDTO>> publishNotice(
            @PathVariable String id) {
        NoticeResponseDTO published = noticeService.publishNotice(id);
        return ResponseEntity.ok(ApiResponse.success("Notice published", published));
    }
    
    @PatchMapping("/{id}/archive")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Archive a notice", description = "Archives a notice, hiding it from general views.")
    public ResponseEntity<ApiResponse<NoticeResponseDTO>> archiveNotice(
            @PathVariable String id) {
        NoticeResponseDTO archived = noticeService.archiveNotice(id);
        return ResponseEntity.ok(ApiResponse.success("Notice archived", archived));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Delete a notice", description = "Soft deletes a notice.")
    public ResponseEntity<ApiResponse<Void>> deleteNotice(
            @PathVariable String id) {
        noticeService.deleteNotice(id);
        return ResponseEntity.ok(ApiResponse.success("Notice deleted", null));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_STAFF', 'ROLE_RESIDENT')")
    @Operation(summary = "Get a notice", description = "Retrieves notice details.")
    public ResponseEntity<ApiResponse<NoticeResponseDTO>> getNoticeById(
            @PathVariable String id) {
        NoticeResponseDTO notice = noticeService.getNoticeById(id);
        return ResponseEntity.ok(ApiResponse.success("Notice retrieved", notice));
    }

    @GetMapping("/search")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_STAFF', 'ROLE_RESIDENT')")
    @Operation(summary = "Search notices", description = "Search and filter notices.")
    public ResponseEntity<ApiResponse<Page<NoticeResponseDTO>>> searchNotices(
            @Parameter(description = "Filter by society ID") @RequestParam(required = false) String societyId,
            @Parameter(description = "Filter by category") @RequestParam(required = false) NoticeCategory category,
            @Parameter(description = "Filter by status") @RequestParam(required = false) NoticeStatus status,
            @Parameter(description = "Filter by pinned") @RequestParam(required = false) Boolean isPinned,
            @Parameter(description = "Publish date start range") @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @Parameter(description = "Publish date end range") @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate,
            @Parameter(description = "Keyword to search title/description") @RequestParam(required = false) String keyword,
            @Parameter(description = "Page number (0-based)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "10") int size,
            @Parameter(description = "Sort by field") @RequestParam(defaultValue = "publishDate") String sortBy,
            @Parameter(description = "Sort direction (asc/desc)") @RequestParam(defaultValue = "desc") String sortDir) {

        Page<NoticeResponseDTO> response = noticeService.searchNotices(societyId, category, status, isPinned, startDate, endDate, keyword, page, size, sortBy, sortDir);
        return ResponseEntity.ok(ApiResponse.success("Notices retrieved", response));
    }
}
