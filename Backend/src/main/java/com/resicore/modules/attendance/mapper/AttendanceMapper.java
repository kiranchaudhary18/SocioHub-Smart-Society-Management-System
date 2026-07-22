package com.resicore.modules.attendance.mapper;

import com.resicore.modules.attendance.dto.AttendanceRequestDTO;
import com.resicore.modules.attendance.dto.AttendanceResponseDTO;
import com.resicore.modules.attendance.dto.AttendanceSummaryDTO;
import com.resicore.modules.attendance.entity.Attendance;
import com.resicore.modules.staff.entity.Staff;
import com.resicore.modules.staff.enums.Shift;
import org.springframework.stereotype.Component;

@Component
public class AttendanceMapper {

    public Attendance toEntity(AttendanceRequestDTO dto, String societyId, Shift shift) {
        if (dto == null) {
            return null;
        }

        return Attendance.builder()
                .staffId(dto.getStaffId())
                .societyId(societyId)
                .attendanceDate(dto.getAttendanceDate())
                .checkInTime(dto.getCheckInTime())
                .checkOutTime(dto.getCheckOutTime())
                .attendanceStatus(dto.getAttendanceStatus())
                .shift(shift)
                .remarks(dto.getRemarks())
                .approvedBy(dto.getApprovedBy())
                .build();
    }

    public void updateEntityFromDto(AttendanceRequestDTO dto, Attendance entity) {
        if (dto == null || entity == null) {
            return;
        }
        
        // Date and StaffId should not be updated usually, but we allow other fields
        entity.setCheckInTime(dto.getCheckInTime());
        entity.setCheckOutTime(dto.getCheckOutTime());
        entity.setAttendanceStatus(dto.getAttendanceStatus());
        
        if (dto.getShift() != null) {
            entity.setShift(dto.getShift());
        }
        
        entity.setRemarks(dto.getRemarks());
        entity.setApprovedBy(dto.getApprovedBy());
    }

    public AttendanceResponseDTO toResponseDTO(Attendance entity) {
        if (entity == null) {
            return null;
        }

        return AttendanceResponseDTO.builder()
                .id(entity.getId())
                .staffId(entity.getStaffId())
                .societyId(entity.getSocietyId())
                .attendanceDate(entity.getAttendanceDate())
                .checkInTime(entity.getCheckInTime())
                .checkOutTime(entity.getCheckOutTime())
                .workingHours(entity.getWorkingHours())
                .overtimeHours(entity.getOvertimeHours())
                .attendanceStatus(entity.getAttendanceStatus())
                .shift(entity.getShift())
                .remarks(entity.getRemarks())
                .approvedBy(entity.getApprovedBy())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    public AttendanceSummaryDTO toSummaryDTO(Attendance entity, String staffName) {
        if (entity == null) {
            return null;
        }

        return AttendanceSummaryDTO.builder()
                .id(entity.getId())
                .staffId(entity.getStaffId())
                .staffName(staffName)
                .attendanceDate(entity.getAttendanceDate())
                .checkInTime(entity.getCheckInTime())
                .checkOutTime(entity.getCheckOutTime())
                .workingHours(entity.getWorkingHours())
                .attendanceStatus(entity.getAttendanceStatus())
                .build();
    }
}
