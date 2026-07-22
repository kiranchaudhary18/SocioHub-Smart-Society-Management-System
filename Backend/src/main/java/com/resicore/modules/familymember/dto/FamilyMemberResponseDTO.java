package com.resicore.modules.familymember.dto;

import com.resicore.modules.familymember.enums.FamilyMemberStatus;
import com.resicore.modules.familymember.enums.Relationship;
import com.resicore.modules.resident.enums.Gender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FamilyMemberResponseDTO {
    private String id;
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
    
    private Boolean isEmergencyContact;
    private Boolean isVerified;
    private FamilyMemberStatus status;
    private String notes;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
