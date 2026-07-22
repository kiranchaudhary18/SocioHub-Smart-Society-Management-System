package com.resicore.modules.community.repository;

import com.resicore.modules.community.entity.Notice;
import com.resicore.modules.community.enums.NoticeCategory;
import com.resicore.modules.community.enums.NoticeStatus;
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
public class CustomNoticeRepositoryImpl implements CustomNoticeRepository {

    private final MongoTemplate mongoTemplate;

    @Override
    public Page<Notice> searchNotices(String societyId, NoticeCategory category, NoticeStatus status, Boolean isPinned, LocalDateTime startDate, LocalDateTime endDate, String keyword, Pageable pageable) {
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
        
        if (isPinned != null) {
            query.addCriteria(Criteria.where("isPinned").is(isPinned));
        }

        if (startDate != null && endDate != null) {
            query.addCriteria(Criteria.where("publishDate").gte(startDate).lte(endDate));
        }

        if (keyword != null && !keyword.isBlank()) {
            Criteria keywordCriteria = new Criteria().orOperator(
                    Criteria.where("title").regex(keyword, "i"),
                    Criteria.where("description").regex(keyword, "i"),
                    Criteria.where("noticeNumber").regex(keyword, "i")
            );
            query.addCriteria(keywordCriteria);
        }

        long total = mongoTemplate.count(query, Notice.class);
        query.with(pageable);
        List<Notice> notices = mongoTemplate.find(query, Notice.class);

        return new PageImpl<>(notices, pageable, total);
    }
}
