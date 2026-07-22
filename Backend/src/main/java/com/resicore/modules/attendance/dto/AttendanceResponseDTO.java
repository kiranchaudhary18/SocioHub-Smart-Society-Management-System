package com.resicore.modules.attendance.dto;

import com.resicore.modules.attendance.enums.AttendanceStatus;
import com.resicore.modules.staff.enums.Shift;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceResponseDTO {
    private String id;
    private String staffId;
    private String societyId;
    
    private LocalDate attendanceDate;
    private LocalTime checkInTime;
    private LocalTime checkOutTime;
    
    private Double workingHours;
    private Double overtimeHours;
    
    private AttendanceStatus attendanceStatus;
    private Shift shift;
    
    private String remarks;
    private String approvedBy;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
