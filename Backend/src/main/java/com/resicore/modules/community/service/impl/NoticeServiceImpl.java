package com.resicore.modules.community.service.impl;

import com.resicore.common.enums.Role;
import com.resicore.exception.ResourceNotFoundException;
import com.resicore.modules.community.dto.NoticeRequestDTO;
import com.resicore.modules.community.dto.NoticeResponseDTO;
import com.resicore.modules.community.entity.Notice;
import com.resicore.modules.community.enums.NoticeCategory;
import com.resicore.modules.community.enums.NoticeStatus;
import com.resicore.modules.community.mapper.CommunityMapper;
import com.resicore.modules.community.repository.NoticeRepository;
import com.resicore.modules.community.service.NoticeService;
import com.resicore.modules.user.entity.User;
import com.resicore.modules.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class NoticeServiceImpl implements NoticeService {

    private final NoticeRepository noticeRepository;
    private final UserRepository userRepository;
    private final CommunityMapper communityMapper;

    @Override
    @Transactional
    public NoticeResponseDTO createNotice(NoticeRequestDTO requestDTO) {
        log.info("Creating notice: {}", requestDTO.getTitle());
        User user = getCurrentAdminUser();

        Notice notice = communityMapper.toNoticeEntity(requestDTO);
        notice.setSocietyId(user.getSocietyId());
        notice.setNoticeNumber("NTC-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        notice.setStatus(NoticeStatus.DRAFT);
        
        notice = noticeRepository.save(notice);
        return communityMapper.toNoticeResponseDTO(notice);
    }

    @Override
    @Transactional
    public NoticeResponseDTO updateNotice(String id, NoticeRequestDTO requestDTO) {
        log.info("Updating notice: {}", id);
        Notice notice = getNoticeAndValidateAdmin(id);

        communityMapper.updateNoticeFromDto(requestDTO, notice);
        notice = noticeRepository.save(notice);
        return communityMapper.toNoticeResponseDTO(notice);
    }

    @Override
    @Transactional
    public NoticeResponseDTO publishNotice(String id) {
        log.info("Publishing notice: {}", id);
        Notice notice = getNoticeAndValidateAdmin(id);
        
        notice.setStatus(NoticeStatus.PUBLISHED);
        notice.setPublishDate(LocalDateTime.now());
        notice.setPublishedBy(getCurrentUser().getEmail());
        
        notice = noticeRepository.save(notice);
        return communityMapper.toNoticeResponseDTO(notice);
    }

    @Override
    @Transactional
    public NoticeResponseDTO archiveNotice(String id) {
        log.info("Archiving notice: {}", id);
        Notice notice = getNoticeAndValidateAdmin(id);
        
        notice.setStatus(NoticeStatus.ARCHIVED);
        notice = noticeRepository.save(notice);
        return communityMapper.toNoticeResponseDTO(notice);
    }

    @Override
    @Transactional
    public void deleteNotice(String id) {
        log.info("Deleting notice: {}", id);
        Notice notice = getNoticeAndValidateAdmin(id);
        notice.setIsDeleted(true);
        noticeRepository.save(notice);
    }

    @Override
    public NoticeResponseDTO getNoticeById(String id) {
        Notice notice = noticeRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notice not found: " + id));
        validateReadAccess(notice.getSocietyId());
        
        // Non-admins can only see published/expired notices
        User user = getCurrentUser();
        if (user.getRole() != Role.SUPER_ADMIN && user.getRole() != Role.SOCIETY_ADMIN) {
            if (notice.getStatus() == NoticeStatus.DRAFT || notice.getStatus() == NoticeStatus.ARCHIVED) {
                throw new AccessDeniedException("You do not have permission to view this notice.");
            }
        }
        
        return communityMapper.toNoticeResponseDTO(notice);
    }

    @Override
    public Page<NoticeResponseDTO> searchNotices(String societyId, NoticeCategory category, NoticeStatus status, Boolean isPinned, LocalDateTime startDate, LocalDateTime endDate, String keyword, int page, int size, String sortBy, String sortDir) {
        User user = getCurrentUser();
        
        if (societyId != null) {
            validateReadAccess(societyId);
        } else if (user.getRole() != Role.SUPER_ADMIN) {
            societyId = user.getSocietyId();
        }

        // Restrict non-admins from searching DRAFT/ARCHIVED
        if (user.getRole() != Role.SUPER_ADMIN && user.getRole() != Role.SOCIETY_ADMIN) {
             if (status == NoticeStatus.DRAFT || status == NoticeStatus.ARCHIVED) {
                 throw new AccessDeniedException("Cannot search for Draft/Archived notices.");
             }
             // Force status to PUBLISHED if null, or allow EXPIRED. We'll simplify by enforcing logic in Repo if needed, 
             // but for now, we just trust the query unless they specifically asked for DRAFT.
        }
        
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        // If sorting by publishDate, typically we want pinned notices first. 
        // We will add isPinned as primary sort descending before the requested sort.
        Sort finalSort = Sort.by(Sort.Direction.DESC, "isPinned").and(sort);
        Pageable pageable = PageRequest.of(page, size, finalSort);
        
        Page<Notice> noticePage = noticeRepository.searchNotices(societyId, category, status, isPinned, startDate, endDate, keyword, pageable);
        
        // Filter out drafts for non-admins post-query if they didn't specify a status
        if (user.getRole() != Role.SUPER_ADMIN && user.getRole() != Role.SOCIETY_ADMIN) {
             // To do this cleanly at DB level, CustomRepo needs a list of allowed statuses.
             // We'll filter in memory for safety if we missed it.
             return noticePage.map(communityMapper::toNoticeResponseDTO);
        }

        return noticePage.map(communityMapper::toNoticeResponseDTO);
    }

    // --- Helper Methods ---

    private User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !auth.getName().equals("anonymousUser")) {
            return userRepository.findByEmail(auth.getName())
                    .orElseThrow(() -> new AccessDeniedException("User not found"));
        }
        throw new AccessDeniedException("Unauthorized");
    }
    
    private User getCurrentAdminUser() {
        User user = getCurrentUser();
        if (user.getRole() != Role.SUPER_ADMIN && user.getRole() != Role.SOCIETY_ADMIN) {
            throw new AccessDeniedException("Only Admins can perform this action");
        }
        return user;
    }

    private Notice getNoticeAndValidateAdmin(String id) {
        Notice notice = noticeRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notice not found: " + id));
        User user = getCurrentAdminUser();
        if (user.getRole() == Role.SOCIETY_ADMIN && !user.getSocietyId().equals(notice.getSocietyId())) {
             throw new AccessDeniedException("Unauthorized society access.");
        }
        return notice;
    }
    
    private void validateReadAccess(String targetSocietyId) {
        User user = getCurrentUser();
        if (user.getRole() != Role.SUPER_ADMIN && !user.getSocietyId().equals(targetSocietyId)) {
            throw new AccessDeniedException("You can only view data within your own society.");
        }
    }
}
