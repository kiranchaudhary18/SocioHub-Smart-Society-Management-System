package com.resicore.modules.complaint.dto;

import com.resicore.modules.complaint.enums.ComplaintCategory;
import com.resicore.modules.complaint.enums.ComplaintPriority;
import com.resicore.modules.complaint.enums.ComplaintStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ComplaintResponseDTO {
    private String id;
    private String complaintNumber;
    
    private String title;
    private String description;
    private ComplaintCategory category;
    private ComplaintPriority priority;
    private ComplaintStatus status;

    private String residentId;
    private String residentName;
    
    private String societyId;
    private String buildingId;
    private String flatId;
    
    private String assignedStaffId;
    private String assignedStaffName;
    
    private List<String> attachments;
    private String resolutionNotes;
    
    private Integer rating;
    private String feedback;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime resolvedAt;
    private LocalDateTime closedAt;
}
