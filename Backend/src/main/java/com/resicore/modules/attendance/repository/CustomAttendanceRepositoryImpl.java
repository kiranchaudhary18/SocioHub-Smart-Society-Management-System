package com.resicore.modules.attendance.repository;

import com.resicore.modules.attendance.entity.Attendance;
import com.resicore.modules.attendance.enums.AttendanceStatus;
import com.resicore.modules.staff.enums.Shift;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
public class CustomAttendanceRepositoryImpl implements CustomAttendanceRepository {

    private final MongoTemplate mongoTemplate;

    @Override
    public Page<Attendance> searchAttendance(String societyId, String staffId, String keyword, AttendanceStatus status, Shift shift, LocalDate startDate, LocalDate endDate, Pageable pageable) {
        Query query = new Query();
        query.addCriteria(Criteria.where("isDeleted").is(false));

        if (societyId != null && !societyId.isBlank()) {
            query.addCriteria(Criteria.where("societyId").is(societyId));
        }

        if (staffId != null && !staffId.isBlank()) {
            query.addCriteria(Criteria.where("staffId").is(staffId));
        }

        if (status != null) {
            query.addCriteria(Criteria.where("attendanceStatus").is(status));
        }

        if (shift != null) {
            query.addCriteria(Criteria.where("shift").is(shift));
        }

        if (startDate != null && endDate != null) {
            query.addCriteria(Criteria.where("attendanceDate").gte(startDate).lte(endDate));
        } else if (startDate != null) {
            query.addCriteria(Criteria.where("attendanceDate").gte(startDate));
        } else if (endDate != null) {
            query.addCriteria(Criteria.where("attendanceDate").lte(endDate));
        }

        if (keyword != null && !keyword.isBlank()) {
            query.addCriteria(Criteria.where("remarks").regex(keyword, "i"));
        }

        long total = mongoTemplate.count(query, Attendance.class);
        query.with(pageable);
        List<Attendance> attendanceList = mongoTemplate.find(query, Attendance.class);

        return new PageImpl<>(attendanceList, pageable, total);
    }
}
