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

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StaffProfileDTO {
    private String id;
    private String staffCode;
    private String employeeId;
    
    private String fullName;
    private String email;
    private String phone;
    private String profilePhoto;
    
    private Gender gender;
    private LocalDate dateOfBirth;
    private String bloodGroup;
    
    private String department;
    private String designation;
    private StaffType staffType;
    private EmploymentType employmentType;
    private Shift shift;
    private LocalDate joiningDate;
    
    private StaffStatus status;
}
