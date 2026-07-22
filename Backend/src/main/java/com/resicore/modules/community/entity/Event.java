package com.resicore.modules.community.entity;

import com.resicore.common.entity.BaseEntity;
import com.resicore.modules.community.enums.EventStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Document(collection = "event")
public class Event extends BaseEntity {

    private String eventCode;
    private String societyId;
    
    private String title;
    private String description;
    private String category;
    
    private String location;
    
    private LocalDateTime startDateTime;
    private LocalDateTime endDateTime;
    
    @Builder.Default
    private Boolean registrationRequired = false;
    
    private Integer maxParticipants;
    
    @Builder.Default
    private Integer registeredCount = 0;
    
    @Builder.Default
    private Double entryFee = 0.0;
    
    @Builder.Default
    private Boolean paymentRequired = false;
    
    private String paymentId;
    
    private String bannerImage;
    private String organizer;
    
    @Builder.Default
    private EventStatus status = EventStatus.UPCOMING;
    
    @Builder.Default
    private Boolean isDeleted = false;
}
