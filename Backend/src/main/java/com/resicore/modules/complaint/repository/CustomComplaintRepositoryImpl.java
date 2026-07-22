package com.resicore.modules.complaint.repository;

import com.resicore.modules.complaint.entity.Complaint;
import com.resicore.modules.complaint.enums.ComplaintCategory;
import com.resicore.modules.complaint.enums.ComplaintPriority;
import com.resicore.modules.complaint.enums.ComplaintStatus;
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
public class CustomComplaintRepositoryImpl implements CustomComplaintRepository {

    private final MongoTemplate mongoTemplate;

    @Override
    public Page<Complaint> searchComplaints(String societyId, String residentId, String staffId, String buildingId, String flatId, String keyword, ComplaintStatus status, ComplaintPriority priority, ComplaintCategory category, LocalDateTime startDate, LocalDateTime endDate, Pageable pageable) {
        Query query = new Query();
        query.addCriteria(Criteria.where("isDeleted").is(false));

        if (societyId != null && !societyId.isBlank()) {
            query.addCriteria(Criteria.where("societyId").is(societyId));
        }

        if (residentId != null && !residentId.isBlank()) {
            query.addCriteria(Criteria.where("residentId").is(residentId));
        }
        
        if (staffId != null && !staffId.isBlank()) {
            query.addCriteria(Criteria.where("assignedStaffId").is(staffId));
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

        if (priority != null) {
            query.addCriteria(Criteria.where("priority").is(priority));
        }
        
        if (category != null) {
            query.addCriteria(Criteria.where("category").is(category));
        }

        if (startDate != null && endDate != null) {
            query.addCriteria(Criteria.where("createdAt").gte(startDate).lte(endDate));
        } else if (startDate != null) {
            query.addCriteria(Criteria.where("createdAt").gte(startDate));
        } else if (endDate != null) {
            query.addCriteria(Criteria.where("createdAt").lte(endDate));
        }

        if (keyword != null && !keyword.isBlank()) {
            Criteria keywordCriteria = new Criteria().orOperator(
                    Criteria.where("title").regex(keyword, "i"),
                    Criteria.where("description").regex(keyword, "i"),
                    Criteria.where("complaintNumber").regex(keyword, "i")
            );
            query.addCriteria(keywordCriteria);
        }

        long total = mongoTemplate.count(query, Complaint.class);
        query.with(pageable);
        List<Complaint> complaints = mongoTemplate.find(query, Complaint.class);

        return new PageImpl<>(complaints, pageable, total);
    }
}
