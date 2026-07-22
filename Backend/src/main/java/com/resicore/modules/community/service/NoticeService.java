package com.resicore.modules.community.service;

import com.resicore.modules.community.dto.NoticeRequestDTO;
import com.resicore.modules.community.dto.NoticeResponseDTO;
import com.resicore.modules.community.enums.NoticeCategory;
import com.resicore.modules.community.enums.NoticeStatus;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;

public interface NoticeService {
    NoticeResponseDTO createNotice(NoticeRequestDTO requestDTO);
    NoticeResponseDTO updateNotice(String id, NoticeRequestDTO requestDTO);
    NoticeResponseDTO publishNotice(String id);
    NoticeResponseDTO archiveNotice(String id);
    void deleteNotice(String id);
    
    NoticeResponseDTO getNoticeById(String id);
    
    Page<NoticeResponseDTO> searchNotices(String societyId, NoticeCategory category, NoticeStatus status, Boolean isPinned, LocalDateTime startDate, LocalDateTime endDate, String keyword, int page, int size, String sortBy, String sortDir);
}
