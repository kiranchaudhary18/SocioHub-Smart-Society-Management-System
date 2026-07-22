package com.resicore.modules.attendance.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MonthlyAttendanceReportDTO {
    private String staffId;
    private String staffName;
    private String monthYear; // e.g., "07-2026"
    
    private long totalPresent;
    private long totalAbsent;
    private long totalHalfDays;
    private long totalLeaves;
    private long totalHolidays;
    
    private double totalWorkingHours;
    private double totalOvertimeHours;
}
