package com.resicore.modules.societyadmin.service.impl;

import com.resicore.modules.complaint.entity.Complaint;
import com.resicore.modules.complaint.repository.ComplaintRepository;
import com.resicore.modules.societyadmin.dto.AssignStaffRequestDTO;
import com.resicore.modules.societyadmin.service.SocietyAdminComplaintService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class SocietyAdminComplaintServiceImpl implements SocietyAdminComplaintService {

    private final ComplaintRepository complaintRepository;
    private final MongoTemplate mongoTemplate;

    @Override
    @Transactional
    public Complaint assignStaffToComplaint(AssignStaffRequestDTO request) {
        Complaint complaint = getComplaint(request.getComplaintId());
        complaint.setAssignedStaffId(request.getStaffId());
        complaint.setStatus(com.resicore.modules.complaint.enums.ComplaintStatus.ASSIGNED);
        return complaintRepository.save(complaint);
    }

    @Override
    @Transactional
    public Complaint reassignStaffToComplaint(AssignStaffRequestDTO request) {
        Complaint complaint = getComplaint(request.getComplaintId());
        complaint.setAssignedStaffId(request.getStaffId());
        complaint.setStatus(com.resicore.modules.complaint.enums.ComplaintStatus.ASSIGNED);
        return complaintRepository.save(complaint);
    }

    @Override
    public Object getComplaintAnalytics(String societyId) {
        Query openQuery = new Query(Criteria.where("societyId").is(societyId).and("status").is("OPEN"));
        long openCount = mongoTemplate.count(openQuery, Complaint.class);
        
        Query resolvedQuery = new Query(Criteria.where("societyId").is(societyId).and("status").is("RESOLVED"));
        long resolvedCount = mongoTemplate.count(resolvedQuery, Complaint.class);
        
        Query totalQuery = new Query(Criteria.where("societyId").is(societyId));
        long totalCount = mongoTemplate.count(totalQuery, Complaint.class);

        Map<String, Object> analytics = new HashMap<>();
        analytics.put("totalComplaints", totalCount);
        analytics.put("openComplaints", openCount);
        analytics.put("resolvedComplaints", resolvedCount);
        
        return analytics;
    }

    @Override
    public Page<Complaint> getPriorityDashboard(String societyId, String priority, Pageable pageable) {
        Query query = new Query(Criteria.where("societyId").is(societyId));
        if (priority != null && !priority.isBlank()) {
            query.addCriteria(Criteria.where("priority").is(priority));
        }
        
        long count = mongoTemplate.count(query, Complaint.class);
        query.with(pageable);
        List<Complaint> complaints = mongoTemplate.find(query, Complaint.class);
        return new PageImpl<>(complaints, pageable, count);
    }

    @Override
    public Page<Complaint> getEscalatedComplaints(String societyId, Pageable pageable) {
        Query query = new Query(Criteria.where("societyId").is(societyId).and("status").is("ESCALATED"));
        long count = mongoTemplate.count(query, Complaint.class);
        query.with(pageable);
        List<Complaint> complaints = mongoTemplate.find(query, Complaint.class);
        return new PageImpl<>(complaints, pageable, count);
    }
    
    private Complaint getComplaint(String id) {
        return complaintRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Complaint not found: " + id));
    }
}
