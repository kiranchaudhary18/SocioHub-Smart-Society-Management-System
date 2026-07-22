package com.resicore.modules.complaint.entity;

import com.resicore.common.entity.BaseEntity;
import com.resicore.modules.complaint.enums.ComplaintCategory;
import com.resicore.modules.complaint.enums.ComplaintPriority;
import com.resicore.modules.complaint.enums.ComplaintStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Document(collection = "complaint")
public class Complaint extends BaseEntity {

    private String complaintNumber;
    
    private String title;
    private String description;
    private ComplaintCategory category;
    private ComplaintPriority priority;
    
    @Builder.Default
    private ComplaintStatus status = ComplaintStatus.OPEN;

    private String residentId;
    private String societyId;
    private String buildingId;
    private String flatId;
    
    private String assignedStaffId;
    
    private List<String> attachments;
    private String resolutionNotes;
    
    private Integer rating;
    private String feedback;

    private LocalDateTime resolvedAt;
    private LocalDateTime closedAt;

    @Builder.Default
    private Boolean isDeleted = false;
}
