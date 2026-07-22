package com.resicore.modules.societyadmin.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResidentApprovalRequestDTO {
    private String residentId;
    private List<String> residentIds; // For bulk approval/rejection
    private String reason;
}
