package com.resicore.modules.community.service.impl;

import com.resicore.common.enums.Role;
import com.resicore.exception.ResourceNotFoundException;
import com.resicore.modules.community.dto.PollRequestDTO;
import com.resicore.modules.community.dto.PollResponseDTO;
import com.resicore.modules.community.dto.PollResultDTO;
import com.resicore.modules.community.dto.VoteRequestDTO;
import com.resicore.modules.community.entity.Poll;
import com.resicore.modules.community.entity.PollOption;
import com.resicore.modules.community.entity.PollVote;
import com.resicore.modules.community.enums.PollStatus;
import com.resicore.modules.community.mapper.CommunityMapper;
import com.resicore.modules.community.repository.PollRepository;
import com.resicore.modules.community.repository.PollVoteRepository;
import com.resicore.modules.community.service.PollService;
import com.resicore.modules.resident.entity.Resident;
import com.resicore.modules.resident.repository.ResidentRepository;
import com.resicore.modules.user.entity.User;
import com.resicore.modules.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class PollServiceImpl implements PollService {

    private final PollRepository pollRepository;
    private final PollVoteRepository pollVoteRepository;
    private final ResidentRepository residentRepository;
    private final UserRepository userRepository;
    private final CommunityMapper communityMapper;

    @Override
    @Transactional
    public PollResponseDTO createPoll(PollRequestDTO requestDTO) {
        log.info("Creating poll: {}", requestDTO.getTitle());
        User user = getCurrentAdminUser();

        Poll poll = communityMapper.toPollEntity(requestDTO);
        poll.setSocietyId(user.getSocietyId());
        poll.setPollCode("POL-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        
        poll = pollRepository.save(poll);
        return communityMapper.toPollResponseDTO(poll);
    }

    @Override
    @Transactional
    public PollResponseDTO updatePoll(String id, PollRequestDTO requestDTO) {
        log.info("Updating poll: {}", id);
        Poll poll = getPollAndValidateAdmin(id);

        if (poll.getStatus() != PollStatus.DRAFT) {
             throw new IllegalArgumentException("Only DRAFT polls can be updated.");
        }

        communityMapper.updatePollFromDto(requestDTO, poll);
        poll = pollRepository.save(poll);
        return communityMapper.toPollResponseDTO(poll);
    }

    @Override
    @Transactional
    public PollResponseDTO activatePoll(String id) {
        log.info("Activating poll: {}", id);
        Poll poll = getPollAndValidateAdmin(id);
        
        if (poll.getStatus() != PollStatus.DRAFT) {
             throw new IllegalArgumentException("Poll is not in DRAFT state.");
        }
        
        poll.setStatus(PollStatus.ACTIVE);
        poll = pollRepository.save(poll);
        return communityMapper.toPollResponseDTO(poll);
    }

    @Override
    @Transactional
    public PollResponseDTO closePoll(String id) {
        log.info("Closing poll: {}", id);
        Poll poll = getPollAndValidateAdmin(id);
        
        poll.setStatus(PollStatus.CLOSED);
        poll = pollRepository.save(poll);
        return communityMapper.toPollResponseDTO(poll);
    }

    @Override
    @Transactional
    public void deletePoll(String id) {
        log.info("Deleting poll: {}", id);
        Poll poll = getPollAndValidateAdmin(id);
        poll.setIsDeleted(true);
        pollRepository.save(poll);
    }

    @Override
    public PollResponseDTO getPollById(String id) {
        Poll poll = pollRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Poll not found: " + id));
        validateReadAccess(poll.getSocietyId());
        return communityMapper.toPollResponseDTO(poll);
    }

    @Override
    @Transactional
    public void vote(String pollId, VoteRequestDTO voteDTO) {
        log.info("Voting on poll: {}", pollId);
        
        Poll poll = pollRepository.findByIdAndIsDeletedFalse(pollId)
                .orElseThrow(() -> new ResourceNotFoundException("Poll not found: " + pollId));
                
        Resident resident = getCurrentResident();
        if (!resident.getSocietyId().equals(poll.getSocietyId())) {
             throw new AccessDeniedException("Cannot vote in another society's poll.");
        }
        
        if (poll.getStatus() != PollStatus.ACTIVE) {
             throw new IllegalArgumentException("Poll is not currently active.");
        }
        
        if (LocalDateTime.now().isBefore(poll.getStartDate()) || LocalDateTime.now().isAfter(poll.getEndDate())) {
             throw new IllegalArgumentException("Voting is outside the allowed time window.");
        }
        
        if (pollVoteRepository.existsByPollIdAndResidentId(pollId, resident.getId())) {
             throw new IllegalArgumentException("You have already voted on this poll.");
        }
        
        List<String> validOptionIds = poll.getOptions().stream().map(PollOption::getId).collect(Collectors.toList());
        for (String selectedId : voteDTO.getSelectedOptionIds()) {
            if (!validOptionIds.contains(selectedId)) {
                throw new IllegalArgumentException("Invalid option ID selected: " + selectedId);
            }
        }
        
        if (!poll.getMultipleChoice() && voteDTO.getSelectedOptionIds().size() > 1) {
             throw new IllegalArgumentException("This poll only allows a single choice.");
        }
        
        PollVote vote = PollVote.builder()
                .pollId(pollId)
                .residentId(resident.getId())
                .selectedOptions(voteDTO.getSelectedOptionIds())
                .votedAt(LocalDateTime.now())
                .build();
                
        pollVoteRepository.save(vote);
    }

    @Override
    public PollResultDTO getPollResults(String pollId) {
        Poll poll = pollRepository.findByIdAndIsDeletedFalse(pollId)
                .orElseThrow(() -> new ResourceNotFoundException("Poll not found: " + pollId));
        validateReadAccess(poll.getSocietyId());
        
        List<PollVote> votes = pollVoteRepository.findByPollId(pollId);
        
        Map<String, Long> optionVoteCounts = new HashMap<>();
        for (PollOption opt : poll.getOptions()) {
            optionVoteCounts.put(opt.getId(), 0L);
        }
        
        for (PollVote vote : votes) {
            for (String selectedOpt : vote.getSelectedOptions()) {
                optionVoteCounts.put(selectedOpt, optionVoteCounts.getOrDefault(selectedOpt, 0L) + 1);
            }
        }
        
        return PollResultDTO.builder()
                .pollId(pollId)
                .title(poll.getTitle())
                .totalVotes(votes.size())
                .optionVoteCounts(optionVoteCounts)
                .build();
    }

    @Override
    public Page<PollResponseDTO> searchPolls(String societyId, PollStatus status, String keyword, int page, int size, String sortBy, String sortDir) {
        User user = getCurrentUser();
        
        if (societyId != null) {
            validateReadAccess(societyId);
        } else if (user.getRole() != Role.SUPER_ADMIN) {
            societyId = user.getSocietyId();
        }

        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Page<Poll> pollPage = pollRepository.searchPolls(societyId, status, keyword, pageable);
        return pollPage.map(communityMapper::toPollResponseDTO);
    }

    // --- Helper Methods ---

    private User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !auth.getName().equals("anonymousUser")) {
            return userRepository.findByEmail(auth.getName())
                    .orElseThrow(() -> new AccessDeniedException("User not found"));
        }
        throw new AccessDeniedException("Unauthorized");
    }
    
    private User getCurrentAdminUser() {
        User user = getCurrentUser();
        if (user.getRole() != Role.SUPER_ADMIN && user.getRole() != Role.SOCIETY_ADMIN) {
            throw new AccessDeniedException("Only Admins can perform this action");
        }
        return user;
    }
    
    private Resident getCurrentResident() {
        User user = getCurrentUser();
        if (user.getRole() != Role.RESIDENT) {
             throw new AccessDeniedException("Only RESIDENTs can vote.");
        }
        return residentRepository.findByUserIdAndIsDeletedFalse(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Resident profile not found"));
    }

    private Poll getPollAndValidateAdmin(String id) {
        Poll poll = pollRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Poll not found: " + id));
        User user = getCurrentAdminUser();
        if (user.getRole() == Role.SOCIETY_ADMIN && !user.getSocietyId().equals(poll.getSocietyId())) {
             throw new AccessDeniedException("Unauthorized society access.");
        }
        return poll;
    }
    
    private void validateReadAccess(String targetSocietyId) {
        User user = getCurrentUser();
        if (user.getRole() != Role.SUPER_ADMIN && !user.getSocietyId().equals(targetSocietyId)) {
            throw new AccessDeniedException("You can only view data within your own society.");
        }
    }
}
