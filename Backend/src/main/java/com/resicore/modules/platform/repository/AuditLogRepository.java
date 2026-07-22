package com.resicore.modules.platform.repository;

import com.resicore.modules.platform.entity.AuditLog;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuditLogRepository extends MongoRepository<AuditLog, String>, CustomAuditLogRepository {
}
