package com.resicore.modules.resident.repository;

import com.resicore.modules.resident.entity.Resident;
import com.resicore.modules.resident.enums.OwnerType;
import com.resicore.modules.resident.enums.ResidentStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

@RequiredArgsConstructor
public class CustomResidentRepositoryImpl implements CustomResidentRepository {

    private final MongoTemplate mongoTemplate;

    @Override
    public Page<Resident> searchResidents(String societyId, String buildingId, String flatId, String keyword, ResidentStatus status, OwnerType ownerType, Pageable pageable) {
        Query query = new Query();
        query.addCriteria(Criteria.where("isDeleted").is(false));

        if (societyId != null && !societyId.isBlank()) {
            query.addCriteria(Criteria.where("societyId").is(societyId));
        }

        if (buildingId != null && !buildingId.isBlank()) {
            query.addCriteria(Criteria.where("buildingId").is(buildingId));
        }

        if (flatId != null && !flatId.isBlank()) {
            query.addCriteria(Criteria.where("flatId").is(flatId));
        }

        if (status != null) {
            query.addCriteria(Criteria.where("residentStatus").is(status));
        }
        
        if (ownerType != null) {
            query.addCriteria(Criteria.where("ownerType").is(ownerType));
        }

        if (keyword != null && !keyword.isBlank()) {
            Criteria keywordCriteria = new Criteria().orOperator(
                    Criteria.where("fullName").regex(keyword, "i"),
                    Criteria.where("residentCode").regex(keyword, "i"),
                    Criteria.where("email").regex(keyword, "i"),
                    Criteria.where("phone").regex(keyword, "i")
            );
            query.addCriteria(keywordCriteria);
        }

        long total = mongoTemplate.count(query, Resident.class);
        query.with(pageable);
        List<Resident> residents = mongoTemplate.find(query, Resident.class);

        return new PageImpl<>(residents, pageable, total);
    }
}
