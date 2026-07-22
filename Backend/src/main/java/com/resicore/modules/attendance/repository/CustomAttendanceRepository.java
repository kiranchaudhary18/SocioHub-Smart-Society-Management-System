package com.resicore.modules.attendance.repository;

import com.resicore.modules.attendance.entity.Attendance;
import com.resicore.modules.attendance.enums.AttendanceStatus;
import com.resicore.modules.staff.enums.Shift;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;

public interface CustomAttendanceRepository {
    Page<Attendance> searchAttendance(String societyId, String staffId, String keyword, AttendanceStatus status, Shift shift, LocalDate startDate, LocalDate endDate, Pageable pageable);
}
