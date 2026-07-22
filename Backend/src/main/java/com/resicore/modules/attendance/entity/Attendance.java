package com.resicore.modules.attendance.entity;

import com.resicore.common.entity.BaseEntity;
import com.resicore.modules.attendance.enums.AttendanceStatus;
import com.resicore.modules.staff.enums.Shift;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Document(collection = "attendance")
public class Attendance extends BaseEntity {

    private String staffId;
    private String societyId;

    private LocalDate attendanceDate;
    
    private LocalTime checkInTime;
    private LocalTime checkOutTime;

    @Builder.Default
    private Double workingHours = 0.0;
    
    @Builder.Default
    private Double overtimeHours = 0.0;

    private AttendanceStatus attendanceStatus;
    
    private Shift shift;

    private String remarks;
    private String approvedBy;

    @Builder.Default
    private Boolean isDeleted = false;
}
