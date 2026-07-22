package com.resicore.modules.community.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EventRequestDTO {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Description is required")
    private String description;

    @NotBlank(message = "Category is required")
    private String category;

    @NotBlank(message = "Location is required")
    private String location;

    @NotNull(message = "Start date time is required")
    @Future(message = "Start date time must be in the future")
    private LocalDateTime startDateTime;

    @NotNull(message = "End date time is required")
    @Future(message = "End date time must be in the future")
    private LocalDateTime endDateTime;

    @Builder.Default
    private Boolean registrationRequired = false;

    private Integer maxParticipants;

    @Builder.Default
    private Double entryFee = 0.0;

    private String bannerImage;

    private String organizer;
}
