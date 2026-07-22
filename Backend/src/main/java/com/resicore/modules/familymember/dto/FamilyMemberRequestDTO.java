package com.resicore.modules.familymember.dto;

import com.resicore.modules.familymember.enums.FamilyMemberStatus;
import com.resicore.modules.familymember.enums.Relationship;
import com.resicore.modules.resident.enums.Gender;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FamilyMemberRequestDTO {

    @NotBlank(message = "Resident ID is required")
    private String residentId;

    @NotBlank(message = "First name is required")
    private String firstName;

    private String lastName;

    @NotNull(message = "Relationship is required")
    private Relationship relationship;

    private Gender gender;

    @NotNull(message = "Date of birth is required")
    private LocalDate dateOfBirth;

    private String bloodGroup;

    @NotBlank(message = "Phone number is required")
    private String phone;

    @Email(message = "Email must be valid")
    private String email;

    private String occupation;
    private String aadhaarNumber;
    
    private Boolean isEmergencyContact;
    private FamilyMemberStatus status;
    private String notes;
}
