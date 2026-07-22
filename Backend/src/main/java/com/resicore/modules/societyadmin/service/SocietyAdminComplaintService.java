package com.resicore.modules.societyadmin.service;

import com.resicore.modules.complaint.entity.Complaint;
import com.resicore.modules.societyadmin.dto.AssignStaffRequestDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SocietyAdminComplaintService {
    Complaint assignStaffToComplaint(AssignStaffRequestDTO request);
    Complaint reassignStaffToComplaint(AssignStaffRequestDTO request);
    Object getComplaintAnalytics(String societyId);
    Page<Complaint> getPriorityDashboard(String societyId, String priority, Pageable pageable);
    Page<Complaint> getEscalatedComplaints(String societyId, Pageable pageable);
}
