package com.resicore.modules.community.controller;

import com.resicore.common.response.ApiResponse;
import com.resicore.modules.community.dto.PollRequestDTO;
import com.resicore.modules.community.dto.PollResponseDTO;
import com.resicore.modules.community.dto.PollResultDTO;
import com.resicore.modules.community.dto.VoteRequestDTO;
import com.resicore.modules.community.enums.PollStatus;
import com.resicore.modules.community.service.PollService;
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
@RequestMapping("/api/v1/polls")
@RequiredArgsConstructor
@Tag(name = "Poll Controller", description = "Endpoints for managing community polls and voting")
@SecurityRequirement(name = "bearerAuth")
public class PollController {

    private final PollService pollService;

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Create a poll", description = "Creates a draft poll.")
    public ResponseEntity<ApiResponse<PollResponseDTO>> createPoll(
            @Valid @RequestBody PollRequestDTO requestDTO) {
        PollResponseDTO created = pollService.createPoll(requestDTO);
        return new ResponseEntity<>(ApiResponse.success("Poll created", created), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Update a poll", description = "Updates a draft poll.")
    public ResponseEntity<ApiResponse<PollResponseDTO>> updatePoll(
            @PathVariable String id,
            @Valid @RequestBody PollRequestDTO requestDTO) {
        PollResponseDTO updated = pollService.updatePoll(id, requestDTO);
        return ResponseEntity.ok(ApiResponse.success("Poll updated", updated));
    }

    @PatchMapping("/{id}/activate")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Activate a poll", description = "Marks a poll as ACTIVE, opening voting.")
    public ResponseEntity<ApiResponse<PollResponseDTO>> activatePoll(
            @PathVariable String id) {
        PollResponseDTO activated = pollService.activatePoll(id);
        return ResponseEntity.ok(ApiResponse.success("Poll activated", activated));
    }
    
    @PatchMapping("/{id}/close")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Close a poll", description = "Closes an active poll, freezing voting.")
    public ResponseEntity<ApiResponse<PollResponseDTO>> closePoll(
            @PathVariable String id) {
        PollResponseDTO closed = pollService.closePoll(id);
        return ResponseEntity.ok(ApiResponse.success("Poll closed", closed));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN')")
    @Operation(summary = "Delete a poll", description = "Soft deletes a poll.")
    public ResponseEntity<ApiResponse<Void>> deletePoll(
            @PathVariable String id) {
        pollService.deletePoll(id);
        return ResponseEntity.ok(ApiResponse.success("Poll deleted", null));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_STAFF', 'ROLE_RESIDENT')")
    @Operation(summary = "Get a poll", description = "Retrieves poll details and options.")
    public ResponseEntity<ApiResponse<PollResponseDTO>> getPollById(
            @PathVariable String id) {
        PollResponseDTO poll = pollService.getPollById(id);
        return ResponseEntity.ok(ApiResponse.success("Poll retrieved", poll));
    }

    @PostMapping("/{id}/vote")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_RESIDENT')")
    @Operation(summary = "Vote in a poll", description = "Residents cast their vote in an active poll.")
    public ResponseEntity<ApiResponse<Void>> vote(
            @PathVariable String id,
            @Valid @RequestBody VoteRequestDTO voteDTO) {
        pollService.vote(id, voteDTO);
        return ResponseEntity.ok(ApiResponse.success("Vote recorded successfully", null));
    }
    
    @GetMapping("/{id}/results")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_STAFF', 'ROLE_RESIDENT')")
    @Operation(summary = "Get poll results", description = "Retrieves current tallied vote counts for the poll.")
    public ResponseEntity<ApiResponse<PollResultDTO>> getPollResults(
            @PathVariable String id) {
        PollResultDTO results = pollService.getPollResults(id);
        return ResponseEntity.ok(ApiResponse.success("Poll results retrieved", results));
    }

    @GetMapping("/search")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN', 'ROLE_SOCIETY_ADMIN', 'ROLE_STAFF', 'ROLE_RESIDENT')")
    @Operation(summary = "Search polls", description = "Search and filter polls.")
    public ResponseEntity<ApiResponse<Page<PollResponseDTO>>> searchPolls(
            @Parameter(description = "Filter by society ID") @RequestParam(required = false) String societyId,
            @Parameter(description = "Filter by status") @RequestParam(required = false) PollStatus status,
            @Parameter(description = "Keyword to search title/code") @RequestParam(required = false) String keyword,
            @Parameter(description = "Page number (0-based)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "10") int size,
            @Parameter(description = "Sort by field") @RequestParam(defaultValue = "createdAt") String sortBy,
            @Parameter(description = "Sort direction (asc/desc)") @RequestParam(defaultValue = "desc") String sortDir) {

        Page<PollResponseDTO> response = pollService.searchPolls(societyId, status, keyword, page, size, sortBy, sortDir);
        return ResponseEntity.ok(ApiResponse.success("Polls retrieved", response));
    }
}
