package com.resicore.modules.resident.dto;

import com.resicore.modules.resident.enums.Gender;
import com.resicore.modules.resident.enums.OwnerType;
import com.resicore.modules.resident.enums.ResidentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResidentProfileDTO {
    private String id;
    private String flatId;
    private String residentCode;
    
    private String fullName;
    private String email;
    private String phone;
    
    private LocalDate dateOfBirth;
    private Gender gender;
    private String bloodGroup;
    
    private String profilePhoto;
    
    private OwnerType ownerType;
    private ResidentStatus residentStatus;
    private Boolean isPrimaryResident;
    
    private LocalDate moveInDate;
    
    private String emergencyContactName;
    private String emergencyContactNumber;
}
