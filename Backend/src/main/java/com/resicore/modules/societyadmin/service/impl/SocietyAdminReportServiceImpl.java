package com.resicore.modules.societyadmin.service.impl;

import com.resicore.modules.complaint.entity.Complaint;
import com.resicore.modules.payment.entity.Payment;
import com.resicore.modules.resident.entity.Resident;
import com.resicore.modules.visitor.entity.Visitor;
import com.resicore.modules.societyadmin.dto.ReportFilterRequestDTO;
import com.resicore.modules.societyadmin.service.SocietyAdminReportService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class SocietyAdminReportServiceImpl implements SocietyAdminReportService {

    private final MongoTemplate mongoTemplate;

    @Override
    public List<Map<String, Object>> generateResidentReport(String societyId, ReportFilterRequestDTO filter) {
        Query query = buildBaseQuery(societyId, filter, "createdAt");
        List<Resident> residents = mongoTemplate.find(query, Resident.class);
        
        List<Map<String, Object>> report = new ArrayList<>();
        for (Resident r : residents) {
            Map<String, Object> map = new HashMap<>();
            map.put("id", r.getId());
            map.put("name", r.getFirstName() + " " + r.getLastName());
            map.put("status", r.getResidentStatus());
            map.put("createdAt", r.getCreatedAt());
            report.add(map);
        }
        return report;
    }

    @Override
    public List<Map<String, Object>> generateVisitorReport(String societyId, ReportFilterRequestDTO filter) {
        Query query = buildBaseQuery(societyId, filter, "createdAt");
        List<Visitor> visitors = mongoTemplate.find(query, Visitor.class);
        
        List<Map<String, Object>> report = new ArrayList<>();
        for (Visitor v : visitors) {
            Map<String, Object> map = new HashMap<>();
            map.put("id", v.getId());
            map.put("name", v.getFullName());
            map.put("purpose", v.getPurpose());
            map.put("status", v.getStatus());
            map.put("createdAt", v.getCreatedAt());
            report.add(map);
        }
        return report;
    }

    @Override
    public List<Map<String, Object>> generateComplaintReport(String societyId, ReportFilterRequestDTO filter) {
        Query query = buildBaseQuery(societyId, filter, "createdAt");
        List<Complaint> complaints = mongoTemplate.find(query, Complaint.class);
        
        List<Map<String, Object>> report = new ArrayList<>();
        for (Complaint c : complaints) {
            Map<String, Object> map = new HashMap<>();
            map.put("id", c.getId());
            map.put("title", c.getTitle());
            map.put("status", c.getStatus());
            map.put("priority", c.getPriority());
            map.put("createdAt", c.getCreatedAt());
            report.add(map);
        }
        return report;
    }

    @Override
    public List<Map<String, Object>> generateRevenueReport(String societyId, ReportFilterRequestDTO filter) {
        Query query = buildBaseQuery(societyId, filter, "paymentDate");
        List<Payment> payments = mongoTemplate.find(query, Payment.class);
        
        List<Map<String, Object>> report = new ArrayList<>();
        for (Payment p : payments) {
            Map<String, Object> map = new HashMap<>();
            map.put("id", p.getId());
            map.put("amount", p.getAmount());
            map.put("status", p.getStatus());
            map.put("paymentDate", p.getPaymentDate());
            report.add(map);
        }
        return report;
    }

    @Override
    public List<Map<String, Object>> generateAttendanceReport(String societyId, ReportFilterRequestDTO filter) {
        // Stub for attendance
        return new ArrayList<>();
    }

    @Override
    public List<Map<String, Object>> generateOccupancyReport(String societyId, ReportFilterRequestDTO filter) {
        // Stub for occupancy
        return new ArrayList<>();
    }

    @Override
    public byte[] exportToCsv(List<Map<String, Object>> reportData) {
        if (reportData == null || reportData.isEmpty()) {
            return new byte[0];
        }
        StringBuilder sb = new StringBuilder();
        
        // Headers
        Map<String, Object> firstRow = reportData.get(0);
        sb.append(String.join(",", firstRow.keySet())).append("\n");
        
        // Rows
        for (Map<String, Object> row : reportData) {
            List<String> values = new ArrayList<>();
            for (Object value : row.values()) {
                values.add(value != null ? "\"" + value.toString().replace("\"", "\"\"") + "\"" : "");
            }
            sb.append(String.join(",", values)).append("\n");
        }
        
        return sb.toString().getBytes();
    }


    private Query buildBaseQuery(String societyId, ReportFilterRequestDTO filter, String dateField) {
        Query query = new Query(Criteria.where("societyId").is(societyId));
        if (filter.getStatus() != null && !filter.getStatus().isBlank()) {
            query.addCriteria(Criteria.where("status").is(filter.getStatus()));
        }
        if (filter.getStartDate() != null && filter.getEndDate() != null) {
            query.addCriteria(Criteria.where(dateField)
                    .gte(filter.getStartDate().atStartOfDay())
                    .lte(filter.getEndDate().atTime(LocalTime.MAX)));
        }
        return query;
    }
}
