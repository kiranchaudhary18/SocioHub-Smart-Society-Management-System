package com.resicore.modules.society.repository;

import com.resicore.modules.society.entity.Society;
import com.resicore.modules.society.enums.SocietyStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

@RequiredArgsConstructor
public class CustomSocietyRepositoryImpl implements CustomSocietyRepository {

    private final MongoTemplate mongoTemplate;

    @Override
    public Page<Society> searchSocieties(String keyword, SocietyStatus status, String city, String state, Pageable pageable) {
        Query query = new Query();
        query.addCriteria(Criteria.where("isDeleted").is(false));

        if (status != null) {
            query.addCriteria(Criteria.where("status").is(status));
        }

        if (city != null && !city.isBlank()) {
            query.addCriteria(Criteria.where("city").regex(city, "i"));
        }

        if (state != null && !state.isBlank()) {
            query.addCriteria(Criteria.where("state").regex(state, "i"));
        }

        if (keyword != null && !keyword.isBlank()) {
            Criteria keywordCriteria = new Criteria().orOperator(
                    Criteria.where("societyName").regex(keyword, "i"),
                    Criteria.where("societyCode").regex(keyword, "i"),
                    Criteria.where("registrationNumber").regex(keyword, "i"),
                    Criteria.where("email").regex(keyword, "i")
            );
            query.addCriteria(keywordCriteria);
        }

        long total = mongoTemplate.count(query, Society.class);
        query.with(pageable);
        List<Society> societies = mongoTemplate.find(query, Society.class);

        return new PageImpl<>(societies, pageable, total);
    }
}
