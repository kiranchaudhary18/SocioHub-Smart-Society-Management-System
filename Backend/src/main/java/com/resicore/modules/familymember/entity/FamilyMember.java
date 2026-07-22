package com.resicore.modules.familymember.entity;

import com.resicore.common.entity.BaseEntity;
import com.resicore.modules.familymember.enums.FamilyMemberStatus;
import com.resicore.modules.familymember.enums.Relationship;
import com.resicore.modules.resident.enums.Gender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Document(collection = "family_members")
public class FamilyMember extends BaseEntity {

    private String residentId;
    private String societyId;
    private String buildingId;
    private String flatId;

    private String firstName;
    private String lastName;
    private String fullName;

    private Relationship relationship;
    private Gender gender;
    
    private LocalDate dateOfBirth;
    private String bloodGroup;
    
    private String phone;
    private String email;
    private String occupation;
    private String aadhaarNumber;
    private String profilePhoto;

    @Builder.Default
    private Boolean isEmergencyContact = false;
    
    @Builder.Default
    private Boolean isVerified = false;

    @Builder.Default
    private FamilyMemberStatus status = FamilyMemberStatus.ACTIVE;

    private String notes;

    @Builder.Default
    private Boolean isDeleted = false;
}
