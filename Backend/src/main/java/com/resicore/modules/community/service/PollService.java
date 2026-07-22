package com.resicore.modules.community.service;

import com.resicore.modules.community.dto.PollRequestDTO;
import com.resicore.modules.community.dto.PollResponseDTO;
import com.resicore.modules.community.dto.PollResultDTO;
import com.resicore.modules.community.dto.VoteRequestDTO;
import com.resicore.modules.community.enums.PollStatus;
import org.springframework.data.domain.Page;

public interface PollService {
    PollResponseDTO createPoll(PollRequestDTO requestDTO);
    PollResponseDTO updatePoll(String id, PollRequestDTO requestDTO);
    PollResponseDTO activatePoll(String id);
    PollResponseDTO closePoll(String id);
    void deletePoll(String id);
    
    PollResponseDTO getPollById(String id);
    
    void vote(String pollId, VoteRequestDTO voteDTO);
    PollResultDTO getPollResults(String pollId);
    
    Page<PollResponseDTO> searchPolls(String societyId, PollStatus status, String keyword, int page, int size, String sortBy, String sortDir);
}
