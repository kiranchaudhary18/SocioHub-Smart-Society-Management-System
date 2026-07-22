package com.resicore.modules.familymember.dto;

import com.resicore.modules.familymember.enums.FamilyMemberStatus;
import com.resicore.modules.familymember.enums.Relationship;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FamilyMemberSummaryDTO {
    private String id;
    private String residentId;
    private String fullName;
    private Relationship relationship;
    private String phone;
    private FamilyMemberStatus status;
}
