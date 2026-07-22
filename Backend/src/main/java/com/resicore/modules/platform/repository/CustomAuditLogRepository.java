package com.resicore.modules.platform.repository;

import com.resicore.modules.platform.entity.AuditLog;
import com.resicore.modules.platform.enums.AuditLogAction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;

public interface CustomAuditLogRepository {
    Page<AuditLog> searchAuditLogs(AuditLogAction action, String performedByEmail, String targetEntityId, LocalDateTime startDate, LocalDateTime endDate, String keyword, Pageable pageable);
}
