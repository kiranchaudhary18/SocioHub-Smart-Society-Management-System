package com.resicore.modules.attendance.service;

import com.resicore.modules.attendance.dto.AttendanceRequestDTO;
import com.resicore.modules.attendance.dto.AttendanceResponseDTO;
import com.resicore.modules.attendance.dto.AttendanceSummaryDTO;
import com.resicore.modules.attendance.dto.MonthlyAttendanceReportDTO;
import com.resicore.modules.attendance.enums.AttendanceStatus;
import com.resicore.modules.staff.enums.Shift;
import org.springframework.data.domain.Page;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface AttendanceService {
    
    AttendanceResponseDTO markAttendance(AttendanceRequestDTO requestDTO);
    AttendanceResponseDTO updateAttendance(String id, AttendanceRequestDTO requestDTO);
    
    AttendanceResponseDTO checkIn(String id, LocalTime checkInTime);
    AttendanceResponseDTO checkOut(String id, LocalTime checkOutTime);
    
    AttendanceResponseDTO getAttendanceById(String id);
    List<AttendanceSummaryDTO> getAttendanceByStaff(String staffId);
    List<AttendanceSummaryDTO> getAttendanceBySociety(String societyId);
    
    List<MonthlyAttendanceReportDTO> getMonthlyAttendanceReport(String societyId, int year, int month);
    
    Page<AttendanceSummaryDTO> searchAttendance(String societyId, String staffId, String keyword, AttendanceStatus status, Shift shift, LocalDate startDate, LocalDate endDate, int page, int size, String sortBy, String sortDir);
    
    void deleteAttendance(String id);
}
