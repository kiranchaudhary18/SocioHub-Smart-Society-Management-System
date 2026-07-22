package com.resicore.modules.attendance.dto;

import com.resicore.modules.attendance.enums.AttendanceStatus;
import com.resicore.modules.staff.enums.Shift;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceRequestDTO {

    @NotBlank(message = "Staff ID is required")
    private String staffId;

    @NotNull(message = "Attendance Date is required")
    private LocalDate attendanceDate;

    @NotNull(message = "Attendance Status is required")
    private AttendanceStatus attendanceStatus;

    private LocalTime checkInTime;
    private LocalTime checkOutTime;
    
    private Shift shift;
    private String remarks;
    private String approvedBy;
}
