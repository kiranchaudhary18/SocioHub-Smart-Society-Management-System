package com.resicore.modules.complaint.repository;

import com.resicore.modules.complaint.entity.Complaint;
import com.resicore.modules.complaint.enums.ComplaintCategory;
import com.resicore.modules.complaint.enums.ComplaintPriority;
import com.resicore.modules.complaint.enums.ComplaintStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;

public interface CustomComplaintRepository {
    Page<Complaint> searchComplaints(String societyId, String residentId, String staffId, String buildingId, String flatId, String keyword, ComplaintStatus status, ComplaintPriority priority, ComplaintCategory category, LocalDateTime startDate, LocalDateTime endDate, Pageable pageable);
}
