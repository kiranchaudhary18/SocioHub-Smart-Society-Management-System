package com.resicore.modules.platform.repository;

import com.resicore.modules.platform.entity.AuditLog;
import com.resicore.modules.platform.enums.AuditLogAction;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
public class CustomAuditLogRepositoryImpl implements CustomAuditLogRepository {

    private final MongoTemplate mongoTemplate;

    @Override
    public Page<AuditLog> searchAuditLogs(AuditLogAction action, String performedByEmail, String targetEntityId, LocalDateTime startDate, LocalDateTime endDate, String keyword, Pageable pageable) {
        Query query = new Query();

        if (action != null) {
            query.addCriteria(Criteria.where("action").is(action));
        }

        if (performedByEmail != null && !performedByEmail.isBlank()) {
            query.addCriteria(Criteria.where("performedByEmail").is(performedByEmail));
        }
        
        if (targetEntityId != null && !targetEntityId.isBlank()) {
            query.addCriteria(Criteria.where("targetEntityId").is(targetEntityId));
        }

        if (startDate != null && endDate != null) {
            query.addCriteria(Criteria.where("timestamp").gte(startDate).lte(endDate));
        }

        if (keyword != null && !keyword.isBlank()) {
            Criteria keywordCriteria = new Criteria().orOperator(
                    Criteria.where("details").regex(keyword, "i")
            );
            query.addCriteria(keywordCriteria);
        }

        long total = mongoTemplate.count(query, AuditLog.class);
        query.with(pageable);
        List<AuditLog> logs = mongoTemplate.find(query, AuditLog.class);

        return new PageImpl<>(logs, pageable, total);
    }
}
