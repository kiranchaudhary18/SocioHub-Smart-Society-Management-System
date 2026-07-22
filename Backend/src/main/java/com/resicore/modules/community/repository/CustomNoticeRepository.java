package com.resicore.modules.community.repository;

import com.resicore.modules.community.entity.Notice;
import com.resicore.modules.community.enums.NoticeCategory;
import com.resicore.modules.community.enums.NoticeStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;

public interface CustomNoticeRepository {
    Page<Notice> searchNotices(String societyId, NoticeCategory category, NoticeStatus status, Boolean isPinned, LocalDateTime startDate, LocalDateTime endDate, String keyword, Pageable pageable);
}
