package com.resicore.modules.community.dto;

import com.resicore.modules.community.enums.EventStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EventResponseDTO {
    private String id;
    private String eventCode;
    private String societyId;
    private String title;
    private String description;
    private String category;
    private String location;
    private LocalDateTime startDateTime;
    private LocalDateTime endDateTime;
    private Boolean registrationRequired;
    private Integer maxParticipants;
    private Integer registeredCount;
    private Double entryFee;
    private Boolean paymentRequired;
    private String bannerImage;
    private String organizer;
    private EventStatus status;
    private LocalDateTime createdAt;
}
