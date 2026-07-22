package com.resicore.modules.flat.repository;

import com.resicore.modules.flat.entity.Flat;
import com.resicore.modules.flat.enums.FlatStatus;
import com.resicore.modules.flat.enums.FlatType;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

@RequiredArgsConstructor
public class CustomFlatRepositoryImpl implements CustomFlatRepository {

    private final MongoTemplate mongoTemplate;

    @Override
    public Page<Flat> searchFlats(String societyId, String buildingId, String keyword, FlatStatus status, FlatType flatType, Boolean isOccupied, Pageable pageable) {
        Query query = new Query();
        query.addCriteria(Criteria.where("isDeleted").is(false));

        if (societyId != null && !societyId.isBlank()) {
            query.addCriteria(Criteria.where("societyId").is(societyId));
        }
        
        if (buildingId != null && !buildingId.isBlank()) {
            query.addCriteria(Criteria.where("buildingId").is(buildingId));
        }

        if (status != null) {
            query.addCriteria(Criteria.where("status").is(status));
        }
        
        if (flatType != null) {
            query.addCriteria(Criteria.where("flatType").is(flatType));
        }
        
        if (isOccupied != null) {
            query.addCriteria(Criteria.where("isOccupied").is(isOccupied));
        }

        if (keyword != null && !keyword.isBlank()) {
            Criteria keywordCriteria = new Criteria().orOperator(
                    Criteria.where("flatNumber").regex(keyword, "i"),
                    Criteria.where("block").regex(keyword, "i"),
                    Criteria.where("wing").regex(keyword, "i")
            );
            query.addCriteria(keywordCriteria);
        }

        long total = mongoTemplate.count(query, Flat.class);
        query.with(pageable);
        List<Flat> flats = mongoTemplate.find(query, Flat.class);

        return new PageImpl<>(flats, pageable, total);
    }
}
