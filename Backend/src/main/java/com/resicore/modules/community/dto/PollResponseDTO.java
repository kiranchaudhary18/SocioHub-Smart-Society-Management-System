package com.resicore.modules.community.dto;

import com.resicore.modules.community.enums.PollStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PollResponseDTO {
    private String id;
    private String pollCode;
    private String societyId;
    private String title;
    private String description;
    private List<PollOptionDTO> options;
    private Boolean multipleChoice;
    private Boolean anonymous;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private PollStatus status;
    private LocalDateTime createdAt;
}
