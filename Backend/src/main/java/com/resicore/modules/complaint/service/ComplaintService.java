package com.resicore.modules.complaint.service;

import com.resicore.modules.complaint.dto.AssignComplaintDTO;
import com.resicore.modules.complaint.dto.ComplaintRequestDTO;
import com.resicore.modules.complaint.dto.ComplaintResponseDTO;
import com.resicore.modules.complaint.dto.ComplaintSummaryDTO;
import com.resicore.modules.complaint.dto.ComplaintUpdateDTO;
import com.resicore.modules.complaint.dto.FeedbackDTO;
import com.resicore.modules.complaint.dto.ResolveComplaintDTO;
import com.resicore.modules.complaint.enums.ComplaintCategory;
import com.resicore.modules.complaint.enums.ComplaintPriority;
import com.resicore.modules.complaint.enums.ComplaintStatus;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;
import java.util.List;

public interface ComplaintService {
    ComplaintResponseDTO createComplaint(ComplaintRequestDTO requestDTO);
    ComplaintResponseDTO updateComplaint(String id, ComplaintUpdateDTO updateDTO);
    
    ComplaintResponseDTO assignComplaint(String id, AssignComplaintDTO assignDTO);
    ComplaintResponseDTO startWork(String id);
    ComplaintResponseDTO putOnHold(String id);
    ComplaintResponseDTO resolveComplaint(String id, ResolveComplaintDTO resolveDTO);
    ComplaintResponseDTO closeComplaint(String id);
    ComplaintResponseDTO rejectComplaint(String id);
    ComplaintResponseDTO submitFeedback(String id, FeedbackDTO feedbackDTO);
    
    ComplaintResponseDTO getComplaintById(String id);
    ComplaintResponseDTO getComplaintByNumber(String complaintNumber);
    
    List<ComplaintSummaryDTO> getComplaintsByResident(String residentId);
    List<ComplaintSummaryDTO> getComplaintsByStaff(String staffId);
    List<ComplaintSummaryDTO> getComplaintsBySociety(String societyId);
    
    Page<ComplaintSummaryDTO> searchComplaints(String societyId, String residentId, String staffId, String buildingId, String flatId, String keyword, ComplaintStatus status, ComplaintPriority priority, ComplaintCategory category, LocalDateTime startDate, LocalDateTime endDate, int page, int size, String sortBy, String sortDir);
    
    void deleteComplaint(String id);
}
