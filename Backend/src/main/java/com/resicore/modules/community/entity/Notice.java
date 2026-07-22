package com.resicore.modules.community.entity;

import com.resicore.common.entity.BaseEntity;
import com.resicore.modules.community.enums.NoticeCategory;
import com.resicore.modules.community.enums.NoticePriority;
import com.resicore.modules.community.enums.NoticeStatus;
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
@Document(collection = "notice")
public class Notice extends BaseEntity {

    private String noticeNumber;
    private String societyId;
    
    private String title;
    private String description;
    
    private NoticeCategory category;
    
    @Builder.Default
    private NoticePriority priority = NoticePriority.LOW;
    
    private List<String> attachments;
    
    private LocalDateTime publishDate;
    private LocalDateTime expiryDate;
    
    private String publishedBy;
    
    @Builder.Default
    private NoticeStatus status = NoticeStatus.DRAFT;
    
    @Builder.Default
    private Boolean isPinned = false;
    
    @Builder.Default
    private Boolean isDeleted = false;
}
