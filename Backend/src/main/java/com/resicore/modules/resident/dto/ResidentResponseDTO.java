package com.resicore.modules.resident.dto;

import com.resicore.modules.resident.enums.Gender;
import com.resicore.modules.resident.enums.OwnerType;
import com.resicore.modules.resident.enums.ResidentStatus;
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
public class ResidentResponseDTO {
    private String id;
    private String userId;
    private String societyId;
    private String buildingId;
    private String flatId;
    private String residentCode;
    
    private String firstName;
    private String lastName;
    private String fullName;
    private String email;
    private String phone;
    private String alternatePhone;
    
    private LocalDate dateOfBirth;
    private Gender gender;
    private String bloodGroup;
    private String occupation;
    
    private String aadhaarNumber;
    private String panNumber;
    private String profilePhoto;
    
    private OwnerType ownerType;
    private ResidentStatus residentStatus;
    
    private LocalDate moveInDate;
    private LocalDate moveOutDate;
    
    private String emergencyContactName;
    private String emergencyContactNumber;
    private String emergencyRelationship;
    
    private Boolean isPrimaryResident;
    private Boolean isVerified;
    private String notes;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
