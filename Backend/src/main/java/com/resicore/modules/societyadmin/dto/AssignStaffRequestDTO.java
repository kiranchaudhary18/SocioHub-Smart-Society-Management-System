package com.resicore.modules.societyadmin.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AssignStaffRequestDTO {
    private String complaintId; // Used if assigning to a complaint
    private String staffId;
    private String assignmentDetails;
}
