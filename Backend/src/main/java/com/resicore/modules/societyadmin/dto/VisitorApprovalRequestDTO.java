package com.resicore.modules.societyadmin.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VisitorApprovalRequestDTO {
    private String visitorId;
    private String reason;
}
