package com.resicore.modules.building.repository;

import com.resicore.modules.building.entity.Building;
import com.resicore.modules.building.enums.BuildingStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

@RequiredArgsConstructor
public class CustomBuildingRepositoryImpl implements CustomBuildingRepository {

    private final MongoTemplate mongoTemplate;

    @Override
    public Page<Building> searchBuildings(String societyId, String keyword, BuildingStatus status, Pageable pageable) {
        Query query = new Query();
        query.addCriteria(Criteria.where("isDeleted").is(false));

        if (societyId != null && !societyId.isBlank()) {
            query.addCriteria(Criteria.where("societyId").is(societyId));
        }

        if (status != null) {
            query.addCriteria(Criteria.where("status").is(status));
        }

        if (keyword != null && !keyword.isBlank()) {
            Criteria keywordCriteria = new Criteria().orOperator(
                    Criteria.where("buildingName").regex(keyword, "i"),
                    Criteria.where("buildingCode").regex(keyword, "i")
            );
            query.addCriteria(keywordCriteria);
        }

        long total = mongoTemplate.count(query, Building.class);
        query.with(pageable);
        List<Building> buildings = mongoTemplate.find(query, Building.class);

        return new PageImpl<>(buildings, pageable, total);
    }
}
