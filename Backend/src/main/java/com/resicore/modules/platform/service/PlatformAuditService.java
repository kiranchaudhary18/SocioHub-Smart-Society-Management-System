package com.resicore.modules.platform.service;

import com.resicore.modules.platform.dto.AuditLogResponseDTO;
import com.resicore.modules.platform.enums.AuditLogAction;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;

public interface PlatformAuditService {
    void logAction(AuditLogAction action, String targetEntityId, String details);
    
    Page<AuditLogResponseDTO> searchAuditLogs(AuditLogAction action, String performedByEmail, String targetEntityId, LocalDateTime startDate, LocalDateTime endDate, String keyword, int page, int size, String sortBy, String sortDir);
}
