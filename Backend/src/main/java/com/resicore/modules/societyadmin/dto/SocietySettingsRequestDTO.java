package com.resicore.modules.societyadmin.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SocietySettingsRequestDTO {
    private String societyName;
    private String contactEmail;
    private String contactPhone;
    private String workingHours;
    
    private String visitorRules;
    private String amenityRules;
    private String complaintRules;
    private String billingRules;
}
