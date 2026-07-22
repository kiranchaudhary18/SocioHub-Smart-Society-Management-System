package com.resicore.modules.platform.entity;

import com.resicore.modules.platform.enums.AuditLogAction;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "audit_log")
public class AuditLog {
    
    @Id
    private String id;
    
    private AuditLogAction action;
    
    private String performedByUserId;
    
    private String performedByEmail;
    
    private String targetEntityId; // ID of the society/user/etc being affected
    
    private String details; // JSON or text description
    
    private String ipAddress;
    
    @CreatedDate
    private LocalDateTime timestamp;
}
