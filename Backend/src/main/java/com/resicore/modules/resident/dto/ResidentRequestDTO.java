package com.resicore.modules.resident.dto;

import com.resicore.modules.resident.enums.Gender;
import com.resicore.modules.resident.enums.OwnerType;
import com.resicore.modules.resident.enums.ResidentStatus;
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
public class ResidentRequestDTO {

    @NotBlank(message = "User ID is required")
    private String userId;

    @NotBlank(message = "Society ID is required")
    private String societyId;

    @NotBlank(message = "Building ID is required")
    private String buildingId;

    @NotBlank(message = "Flat ID is required")
    private String flatId;

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    private String email;

    @NotBlank(message = "Phone number is required")
    private String phone;
    
    private String alternatePhone;

    private LocalDate dateOfBirth;
    private Gender gender;
    private String bloodGroup;
    private String occupation;

    private String aadhaarNumber;
    private String panNumber;

    @NotNull(message = "Owner type is required")
    private OwnerType ownerType;

    private ResidentStatus residentStatus;

    @NotNull(message = "Move-in date is required")
    private LocalDate moveInDate;

    private LocalDate moveOutDate;

    @NotBlank(message = "Emergency contact name is required")
    private String emergencyContactName;

    @NotBlank(message = "Emergency contact number is required")
    private String emergencyContactNumber;

    @NotBlank(message = "Emergency relationship is required")
    private String emergencyRelationship;

    private Boolean isPrimaryResident;
    
    private String notes;
}
