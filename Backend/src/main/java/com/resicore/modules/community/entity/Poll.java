package com.resicore.modules.community.entity;

import com.resicore.common.entity.BaseEntity;
import com.resicore.modules.community.enums.PollStatus;
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
@Document(collection = "poll")
public class Poll extends BaseEntity {

    private String pollCode;
    private String societyId;
    
    private String title;
    private String description;
    
    private List<PollOption> options;
    
    @Builder.Default
    private Boolean multipleChoice = false;
    
    @Builder.Default
    private Boolean anonymous = true;
    
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    
    @Builder.Default
    private PollStatus status = PollStatus.DRAFT;
    
    @Builder.Default
    private Boolean isDeleted = false;
}
