package com.resicore.modules.complaint.dto;

import com.resicore.modules.complaint.enums.ComplaintCategory;
import com.resicore.modules.complaint.enums.ComplaintPriority;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ComplaintUpdateDTO {
    private String title;
    private String description;
    private ComplaintCategory category;
    private ComplaintPriority priority;
    private List<String> attachments;
}
