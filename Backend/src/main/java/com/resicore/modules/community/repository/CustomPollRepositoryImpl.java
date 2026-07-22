package com.resicore.modules.community.repository;

import com.resicore.modules.community.entity.Poll;
import com.resicore.modules.community.enums.PollStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

@RequiredArgsConstructor
public class CustomPollRepositoryImpl implements CustomPollRepository {

    private final MongoTemplate mongoTemplate;

    @Override
    public Page<Poll> searchPolls(String societyId, PollStatus status, String keyword, Pageable pageable) {
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
                    Criteria.where("title").regex(keyword, "i"),
                    Criteria.where("pollCode").regex(keyword, "i")
            );
            query.addCriteria(keywordCriteria);
        }

        long total = mongoTemplate.count(query, Poll.class);
        query.with(pageable);
        List<Poll> polls = mongoTemplate.find(query, Poll.class);

        return new PageImpl<>(polls, pageable, total);
    }
}
