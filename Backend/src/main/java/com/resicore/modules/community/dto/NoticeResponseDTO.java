package com.resicore.modules.community.dto;

import com.resicore.modules.community.enums.NoticeCategory;
import com.resicore.modules.community.enums.NoticePriority;
import com.resicore.modules.community.enums.NoticeStatus;
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
public class NoticeResponseDTO {
    private String id;
    private String noticeNumber;
    private String societyId;
    private String title;
    private String description;
    private NoticeCategory category;
    private NoticePriority priority;
    private List<String> attachments;
    private LocalDateTime publishDate;
    private LocalDateTime expiryDate;
    private String publishedBy;
    private NoticeStatus status;
    private Boolean isPinned;
    private LocalDateTime createdAt;
}
