package com.resicore.modules.resident.dto;

import com.resicore.modules.resident.enums.OwnerType;
import com.resicore.modules.resident.enums.ResidentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResidentSummaryDTO {
    private String id;
    private String flatId;
    private String residentCode;
    private String fullName;
    private String email;
    private String phone;
    private OwnerType ownerType;
    private ResidentStatus residentStatus;
    private Boolean isPrimaryResident;
}
