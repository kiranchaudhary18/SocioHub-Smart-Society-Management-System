package com.resicore.modules.platform.dto;

import com.resicore.modules.platform.enums.AuditLogAction;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuditLogResponseDTO {
    private String id;
    private AuditLogAction action;
    private String performedByUserId;
    private String performedByEmail;
    private String targetEntityId;
    private String details;
    private String ipAddress;
    private LocalDateTime timestamp;
}
