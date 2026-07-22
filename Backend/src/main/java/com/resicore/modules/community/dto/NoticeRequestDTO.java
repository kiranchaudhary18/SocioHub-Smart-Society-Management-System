package com.resicore.modules.community.dto;

import com.resicore.modules.community.enums.NoticeCategory;
import com.resicore.modules.community.enums.NoticePriority;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
public class NoticeRequestDTO {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Description is required")
    private String description;

    @NotNull(message = "Category is required")
    private NoticeCategory category;

    @Builder.Default
    private NoticePriority priority = NoticePriority.LOW;

    private List<String> attachments;

    private LocalDateTime expiryDate;

    @Builder.Default
    private Boolean isPinned = false;
}
