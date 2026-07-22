package com.resicore.modules.platform.service.impl;

import com.resicore.common.enums.Role;
import com.resicore.modules.platform.dto.AuditLogResponseDTO;
import com.resicore.modules.platform.entity.AuditLog;
import com.resicore.modules.platform.enums.AuditLogAction;
import com.resicore.modules.platform.mapper.PlatformMapper;
import com.resicore.modules.platform.repository.AuditLogRepository;
import com.resicore.modules.platform.service.PlatformAuditService;
import com.resicore.modules.user.entity.User;
import com.resicore.modules.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
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
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class PlatformAuditServiceImpl implements PlatformAuditService {

    private final AuditLogRepository auditLogRepository;
    private final UserRepository userRepository;
    private final PlatformMapper platformMapper;

    @Override
    public void logAction(AuditLogAction action, String targetEntityId, String details) {
        try {
            String userId = "SYSTEM";
            String userEmail = "system@resicore.com";
            
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth != null && auth.isAuthenticated() && !auth.getName().equals("anonymousUser")) {
                userEmail = auth.getName();
                User user = userRepository.findByEmail(userEmail).orElse(null);
                if (user != null) {
                    userId = user.getId();
                }
            }
            
            String ipAddress = "UNKNOWN";
            try {
                ServletRequestAttributes attrs = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
                if (attrs != null) {
                    HttpServletRequest request = attrs.getRequest();
                    ipAddress = request.getRemoteAddr();
                    String xfHeader = request.getHeader("X-Forwarded-For");
                    if (xfHeader != null && !xfHeader.isEmpty()) {
                        ipAddress = xfHeader.split(",")[0];
                    }
                }
            } catch (Exception e) {
                log.warn("Could not retrieve IP address for audit log");
            }
            
            AuditLog auditLog = AuditLog.builder()
                    .action(action)
                    .performedByUserId(userId)
                    .performedByEmail(userEmail)
                    .targetEntityId(targetEntityId)
                    .details(details)
                    .ipAddress(ipAddress)
                    .timestamp(LocalDateTime.now())
                    .build();
                    
            auditLogRepository.save(auditLog);
        } catch (Exception e) {
            log.error("Failed to save audit log: {}", e.getMessage());
            // Intentionally not re-throwing to avoid blocking main business logic
        }
    }

    @Override
    public Page<AuditLogResponseDTO> searchAuditLogs(AuditLogAction action, String performedByEmail, String targetEntityId, LocalDateTime startDate, LocalDateTime endDate, String keyword, int page, int size, String sortBy, String sortDir) {
        validateSuperAdmin();
        
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Page<AuditLog> logs = auditLogRepository.searchAuditLogs(action, performedByEmail, targetEntityId, startDate, endDate, keyword, pageable);
        return logs.map(platformMapper::toAuditLogResponseDTO);
    }
    
    private void validateSuperAdmin() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !auth.getName().equals("anonymousUser")) {
            User user = userRepository.findByEmail(auth.getName())
                    .orElseThrow(() -> new AccessDeniedException("User not found"));
            if (user.getRole() != Role.SUPER_ADMIN) {
                throw new AccessDeniedException("Only SUPER_ADMIN can view platform audit logs.");
            }
            return;
        }
        throw new AccessDeniedException("Unauthorized");
    }
}
