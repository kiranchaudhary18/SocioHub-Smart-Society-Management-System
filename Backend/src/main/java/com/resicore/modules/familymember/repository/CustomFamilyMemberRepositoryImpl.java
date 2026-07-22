package com.resicore.modules.familymember.repository;

import com.resicore.modules.familymember.entity.FamilyMember;
import com.resicore.modules.familymember.enums.FamilyMemberStatus;
import com.resicore.modules.familymember.enums.Relationship;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

@RequiredArgsConstructor
public class CustomFamilyMemberRepositoryImpl implements CustomFamilyMemberRepository {

    private final MongoTemplate mongoTemplate;

    @Override
    public Page<FamilyMember> searchFamilyMembers(String societyId, String buildingId, String flatId, String residentId, String keyword, FamilyMemberStatus status, Relationship relationship, Pageable pageable) {
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

        if (residentId != null && !residentId.isBlank()) {
            query.addCriteria(Criteria.where("residentId").is(residentId));
        }

        if (status != null) {
            query.addCriteria(Criteria.where("status").is(status));
        }
        
        if (relationship != null) {
            query.addCriteria(Criteria.where("relationship").is(relationship));
        }

        if (keyword != null && !keyword.isBlank()) {
            Criteria keywordCriteria = new Criteria().orOperator(
                    Criteria.where("fullName").regex(keyword, "i"),
                    Criteria.where("email").regex(keyword, "i"),
                    Criteria.where("phone").regex(keyword, "i")
            );
            query.addCriteria(keywordCriteria);
        }

        long total = mongoTemplate.count(query, FamilyMember.class);
        query.with(pageable);
        List<FamilyMember> familyMembers = mongoTemplate.find(query, FamilyMember.class);

        return new PageImpl<>(familyMembers, pageable, total);
    }
}
