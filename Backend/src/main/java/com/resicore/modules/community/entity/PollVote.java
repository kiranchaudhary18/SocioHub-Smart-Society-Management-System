package com.resicore.modules.community.entity;

import com.resicore.common.entity.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Document(collection = "poll_vote")
public class PollVote extends BaseEntity {

    private String pollId;
    private String residentId;
    
    private List<String> selectedOptions; // IDs of the selected options
    
    private LocalDateTime votedAt;
}
