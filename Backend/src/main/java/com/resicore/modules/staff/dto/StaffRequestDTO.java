package com.resicore.modules.staff.dto;

import com.resicore.modules.resident.enums.Gender;
import com.resicore.modules.staff.enums.EmploymentType;
import com.resicore.modules.staff.enums.Shift;
import com.resicore.modules.staff.enums.StaffStatus;
import com.resicore.modules.staff.enums.StaffType;
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
public class StaffRequestDTO {

    @NotBlank(message = "User ID is required")
    private String userId;

    @NotBlank(message = "Society ID is required")
    private String societyId;

    @NotBlank(message = "Employee ID is required")
    private String employeeId;

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
    
    private Gender gender;
    private LocalDate dateOfBirth;
    private String bloodGroup;

    private String department;
    private String designation;
    
    @NotNull(message = "Staff type is required")
    private StaffType staffType;
    
    @NotNull(message = "Employment type is required")
    private EmploymentType employmentType;
    
    private LocalDate joiningDate;
    private Double salary;
    
    @NotNull(message = "Shift is required")
    private Shift shift;

    private String address;
    private String city;
    private String state;
    private String pincode;

    private String aadhaarNumber;
    private String panNumber;

    private String emergencyContactName;
    private String emergencyContactPhone;

    private StaffStatus status;
    private String notes;
}
