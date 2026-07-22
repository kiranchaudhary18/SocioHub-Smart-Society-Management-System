package com.resicore.modules.staff.dto;

import com.resicore.modules.staff.enums.Shift;
import com.resicore.modules.staff.enums.StaffStatus;
import com.resicore.modules.staff.enums.StaffType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StaffSummaryDTO {
    private String id;
    private String staffCode;
    private String employeeId;
    private String fullName;
    private String phone;
    private String department;
    private StaffType staffType;
    private Shift shift;
    private StaffStatus status;
}
