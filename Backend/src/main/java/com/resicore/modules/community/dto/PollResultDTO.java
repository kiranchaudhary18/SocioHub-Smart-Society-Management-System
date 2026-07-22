package com.resicore.modules.community.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PollResultDTO {
    private String pollId;
    private String title;
    private long totalVotes;
    
    // Map of optionId to number of votes received
    private Map<String, Long> optionVoteCounts;
}
