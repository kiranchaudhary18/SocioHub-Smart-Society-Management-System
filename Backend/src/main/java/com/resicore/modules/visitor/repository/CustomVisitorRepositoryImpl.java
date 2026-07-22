package com.resicore.modules.visitor.repository;

import com.resicore.modules.visitor.entity.Visitor;
import com.resicore.modules.visitor.enums.Purpose;
import com.resicore.modules.visitor.enums.VisitorStatus;
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
public class CustomVisitorRepositoryImpl implements CustomVisitorRepository {

    private final MongoTemplate mongoTemplate;

    @Override
    public Page<Visitor> searchVisitors(String societyId, String residentId, String buildingId, String flatId, String keyword, VisitorStatus status, Purpose purpose, LocalDateTime startDate, LocalDateTime endDate, Pageable pageable) {
        Query query = new Query();
        query.addCriteria(Criteria.where("isDeleted").is(false));

        if (societyId != null && !societyId.isBlank()) {
            query.addCriteria(Criteria.where("societyId").is(societyId));
        }

        if (residentId != null && !residentId.isBlank()) {
            query.addCriteria(Criteria.where("residentId").is(residentId));
        }
        
        if (buildingId != null && !buildingId.isBlank()) {
            query.addCriteria(Criteria.where("buildingId").is(buildingId));
        }
        
        if (flatId != null && !flatId.isBlank()) {
            query.addCriteria(Criteria.where("flatId").is(flatId));
        }

        if (status != null) {
            query.addCriteria(Criteria.where("status").is(status));
        }

        if (purpose != null) {
            query.addCriteria(Criteria.where("purpose").is(purpose));
        }

        if (startDate != null && endDate != null) {
            query.addCriteria(Criteria.where("expectedArrival").gte(startDate).lte(endDate));
        } else if (startDate != null) {
            query.addCriteria(Criteria.where("expectedArrival").gte(startDate));
        } else if (endDate != null) {
            query.addCriteria(Criteria.where("expectedArrival").lte(endDate));
        }

        if (keyword != null && !keyword.isBlank()) {
            Criteria keywordCriteria = new Criteria().orOperator(
                    Criteria.where("fullName").regex(keyword, "i"),
                    Criteria.where("visitorCode").regex(keyword, "i"),
                    Criteria.where("phone").regex(keyword, "i"),
                    Criteria.where("hostName").regex(keyword, "i"),
                    Criteria.where("vehicleNumber").regex(keyword, "i"),
                    Criteria.where("companyName").regex(keyword, "i")
            );
            query.addCriteria(keywordCriteria);
        }

        long total = mongoTemplate.count(query, Visitor.class);
        query.with(pageable);
        List<Visitor> visitors = mongoTemplate.find(query, Visitor.class);

        return new PageImpl<>(visitors, pageable, total);
    }
}
