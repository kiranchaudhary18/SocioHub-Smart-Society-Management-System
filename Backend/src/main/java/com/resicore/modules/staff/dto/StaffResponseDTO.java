package com.resicore.modules.staff.dto;

import com.resicore.modules.resident.enums.Gender;
import com.resicore.modules.staff.enums.EmploymentType;
import com.resicore.modules.staff.enums.Shift;
import com.resicore.modules.staff.enums.StaffStatus;
import com.resicore.modules.staff.enums.StaffType;
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
public class StaffResponseDTO {
    private String id;
    private String userId;
    private String societyId;
    
    private String staffCode;
    private String employeeId;
    
    private String firstName;
    private String lastName;
    private String fullName;
    
    private String email;
    private String phone;
    private String alternatePhone;
    private String profilePhoto;
    
    private Gender gender;
    private LocalDate dateOfBirth;
    private String bloodGroup;
    
    private String department;
    private String designation;
    private StaffType staffType;
    private EmploymentType employmentType;
    
    private LocalDate joiningDate;
    private Double salary;
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
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
