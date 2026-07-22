package com.resicore.modules.amenity.repository;

import com.resicore.modules.amenity.entity.Amenity;
import com.resicore.modules.amenity.enums.AmenityCategory;
import com.resicore.modules.amenity.enums.AmenityStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

@RequiredArgsConstructor
public class CustomAmenityRepositoryImpl implements CustomAmenityRepository {

    private final MongoTemplate mongoTemplate;

    @Override
    public Page<Amenity> searchAmenities(String societyId, AmenityCategory category, AmenityStatus status, String keyword, Pageable pageable) {
        Query query = new Query();
        query.addCriteria(Criteria.where("isDeleted").is(false));

        if (societyId != null && !societyId.isBlank()) {
            query.addCriteria(Criteria.where("societyId").is(societyId));
        }

        if (category != null) {
            query.addCriteria(Criteria.where("category").is(category));
        }

        if (status != null) {
            query.addCriteria(Criteria.where("status").is(status));
        }

        if (keyword != null && !keyword.isBlank()) {
            Criteria keywordCriteria = new Criteria().orOperator(
                    Criteria.where("name").regex(keyword, "i"),
                    Criteria.where("amenityCode").regex(keyword, "i")
            );
            query.addCriteria(keywordCriteria);
        }

        long total = mongoTemplate.count(query, Amenity.class);
        query.with(pageable);
        List<Amenity> amenities = mongoTemplate.find(query, Amenity.class);

        return new PageImpl<>(amenities, pageable, total);
    }
}
