package com.resicore.modules.staff.repository;

import com.resicore.modules.staff.entity.Staff;
import com.resicore.modules.staff.enums.EmploymentType;
import com.resicore.modules.staff.enums.Shift;
import com.resicore.modules.staff.enums.StaffStatus;
import com.resicore.modules.staff.enums.StaffType;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

@RequiredArgsConstructor
public class CustomStaffRepositoryImpl implements CustomStaffRepository {

    private final MongoTemplate mongoTemplate;

    @Override
    public Page<Staff> searchStaff(String societyId, String keyword, String department, StaffType staffType, EmploymentType employmentType, Shift shift, StaffStatus status, Pageable pageable) {
        Query query = new Query();
        query.addCriteria(Criteria.where("isDeleted").is(false));

        if (societyId != null && !societyId.isBlank()) {
            query.addCriteria(Criteria.where("societyId").is(societyId));
        }
        
        if (department != null && !department.isBlank()) {
            query.addCriteria(Criteria.where("department").is(department));
        }

        if (staffType != null) {
            query.addCriteria(Criteria.where("staffType").is(staffType));
        }
        
        if (employmentType != null) {
            query.addCriteria(Criteria.where("employmentType").is(employmentType));
        }
        
        if (shift != null) {
            query.addCriteria(Criteria.where("shift").is(shift));
        }
        
        if (status != null) {
            query.addCriteria(Criteria.where("status").is(status));
        }

        if (keyword != null && !keyword.isBlank()) {
            Criteria keywordCriteria = new Criteria().orOperator(
                    Criteria.where("fullName").regex(keyword, "i"),
                    Criteria.where("staffCode").regex(keyword, "i"),
                    Criteria.where("employeeId").regex(keyword, "i"),
                    Criteria.where("email").regex(keyword, "i"),
                    Criteria.where("phone").regex(keyword, "i")
            );
            query.addCriteria(keywordCriteria);
        }

        long total = mongoTemplate.count(query, Staff.class);
        query.with(pageable);
        List<Staff> staffMembers = mongoTemplate.find(query, Staff.class);

        return new PageImpl<>(staffMembers, pageable, total);
    }
}
