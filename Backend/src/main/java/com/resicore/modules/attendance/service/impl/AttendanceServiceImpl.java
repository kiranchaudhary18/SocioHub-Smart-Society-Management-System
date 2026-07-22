package com.resicore.modules.attendance.service.impl;

import com.resicore.common.enums.Role;
import com.resicore.exception.DuplicateResourceException;
import com.resicore.exception.ResourceNotFoundException;
import com.resicore.modules.attendance.dto.AttendanceRequestDTO;
import com.resicore.modules.attendance.dto.AttendanceResponseDTO;
import com.resicore.modules.attendance.dto.AttendanceSummaryDTO;
import com.resicore.modules.attendance.dto.MonthlyAttendanceReportDTO;
import com.resicore.modules.attendance.entity.Attendance;
import com.resicore.modules.attendance.enums.AttendanceStatus;
import com.resicore.modules.attendance.mapper.AttendanceMapper;
import com.resicore.modules.attendance.repository.AttendanceRepository;
import com.resicore.modules.attendance.service.AttendanceService;
import com.resicore.modules.staff.entity.Staff;
import com.resicore.modules.staff.enums.Shift;
import com.resicore.modules.staff.repository.StaffRepository;
import com.resicore.modules.user.entity.User;
import com.resicore.modules.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class AttendanceServiceImpl implements AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final StaffRepository staffRepository;
    private final UserRepository userRepository;
    private final AttendanceMapper attendanceMapper;

    private static final double STANDARD_WORKING_HOURS = 9.0;

    @Override
    @Transactional
    public AttendanceResponseDTO markAttendance(AttendanceRequestDTO requestDTO) {
        log.info("Marking attendance for staff ID: {}", requestDTO.getStaffId());

        Staff staff = staffRepository.findByIdAndIsDeletedFalse(requestDTO.getStaffId())
                .orElseThrow(() -> new ResourceNotFoundException("Staff not found with id: " + requestDTO.getStaffId()));

        validateSecurityAccessForSociety(staff.getSocietyId());

        if (attendanceRepository.existsByStaffIdAndAttendanceDateAndIsDeletedFalse(requestDTO.getStaffId(), requestDTO.getAttendanceDate())) {
            throw new DuplicateResourceException("Attendance record already exists for this staff on this date.");
        }

        if (requestDTO.getCheckOutTime() != null && requestDTO.getCheckInTime() != null &&
            requestDTO.getCheckOutTime().isBefore(requestDTO.getCheckInTime())) {
            throw new IllegalArgumentException("Check-out time cannot be before check-in time.");
        }

        Shift shift = requestDTO.getShift() != null ? requestDTO.getShift() : staff.getShift();

        Attendance attendance = attendanceMapper.toEntity(requestDTO, staff.getSocietyId(), shift);
        calculateHours(attendance);

        attendance = attendanceRepository.save(attendance);
        return attendanceMapper.toResponseDTO(attendance);
    }

    @Override
    @Transactional
    public AttendanceResponseDTO updateAttendance(String id, AttendanceRequestDTO requestDTO) {
        log.info("Updating attendance ID: {}", id);

        Attendance attendance = attendanceRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Attendance not found with id: " + id));

        validateSecurityAccessForSociety(attendance.getSocietyId());
        
        if (requestDTO.getCheckOutTime() != null && requestDTO.getCheckInTime() != null &&
            requestDTO.getCheckOutTime().isBefore(requestDTO.getCheckInTime())) {
            throw new IllegalArgumentException("Check-out time cannot be before check-in time.");
        }

        attendanceMapper.updateEntityFromDto(requestDTO, attendance);
        calculateHours(attendance);

        attendance = attendanceRepository.save(attendance);
        return attendanceMapper.toResponseDTO(attendance);
    }

    @Override
    @Transactional
    public AttendanceResponseDTO checkIn(String id, LocalTime checkInTime) {
        log.info("Check-in for attendance ID: {}", id);
        Attendance attendance = attendanceRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Attendance not found with id: " + id));

        validateSecurityAccessForSociety(attendance.getSocietyId());

        attendance.setCheckInTime(checkInTime);
        if (attendance.getCheckOutTime() != null && attendance.getCheckOutTime().isBefore(checkInTime)) {
             throw new IllegalArgumentException("Check-out time cannot be before check-in time.");
        }
        
        calculateHours(attendance);
        attendance = attendanceRepository.save(attendance);
        return attendanceMapper.toResponseDTO(attendance);
    }

    @Override
    @Transactional
    public AttendanceResponseDTO checkOut(String id, LocalTime checkOutTime) {
        log.info("Check-out for attendance ID: {}", id);
        Attendance attendance = attendanceRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Attendance not found with id: " + id));

        validateSecurityAccessForSociety(attendance.getSocietyId());

        if (attendance.getCheckInTime() == null) {
            throw new IllegalArgumentException("Cannot check out without a check-in time.");
        }

        if (checkOutTime.isBefore(attendance.getCheckInTime())) {
            throw new IllegalArgumentException("Check-out time cannot be before check-in time.");
        }

        attendance.setCheckOutTime(checkOutTime);
        calculateHours(attendance);
        
        attendance = attendanceRepository.save(attendance);
        return attendanceMapper.toResponseDTO(attendance);
    }

    @Override
    public AttendanceResponseDTO getAttendanceById(String id) {
        Attendance attendance = attendanceRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Attendance not found with id: " + id));
        validateSecurityAccessForSociety(attendance.getSocietyId());
        return attendanceMapper.toResponseDTO(attendance);
    }

    @Override
    public List<AttendanceSummaryDTO> getAttendanceByStaff(String staffId) {
        Staff staff = staffRepository.findByIdAndIsDeletedFalse(staffId)
                .orElseThrow(() -> new ResourceNotFoundException("Staff not found with id: " + staffId));

        validateSecurityAccessForStaff(staff);
        
        List<Attendance> records = attendanceRepository.findByStaffIdAndIsDeletedFalse(staffId);
        return records.stream()
                .map(a -> attendanceMapper.toSummaryDTO(a, staff.getFullName()))
                .collect(Collectors.toList());
    }

    @Override
    public List<AttendanceSummaryDTO> getAttendanceBySociety(String societyId) {
        validateSecurityAccessForSociety(societyId);
        
        List<Attendance> records = attendanceRepository.findBySocietyIdAndIsDeletedFalse(societyId);
        
        // Batch fetch staff names
        List<String> staffIds = records.stream().map(Attendance::getStaffId).distinct().collect(Collectors.toList());
        Map<String, String> staffNames = staffRepository.findAllById(staffIds).stream()
                .collect(Collectors.toMap(Staff::getId, Staff::getFullName));
                
        return records.stream()
                .map(a -> attendanceMapper.toSummaryDTO(a, staffNames.getOrDefault(a.getStaffId(), "Unknown")))
                .collect(Collectors.toList());
    }

    @Override
    public List<MonthlyAttendanceReportDTO> getMonthlyAttendanceReport(String societyId, int year, int month) {
        validateSecurityAccessForSociety(societyId);
        
        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = YearMonth.of(year, month).atEndOfMonth();
        
        // Find all staff in the society
        List<Staff> societyStaff = staffRepository.findBySocietyIdAndIsDeletedFalse(societyId);
        
        List<MonthlyAttendanceReportDTO> reports = new ArrayList<>();
        
        for (Staff staff : societyStaff) {
            List<Attendance> records = attendanceRepository.findByStaffIdAndAttendanceDateBetweenAndIsDeletedFalse(
                    staff.getId(), startDate, endDate);
                    
            long totalPresent = records.stream().filter(a -> a.getAttendanceStatus() == AttendanceStatus.PRESENT).count();
            long totalAbsent = records.stream().filter(a -> a.getAttendanceStatus() == AttendanceStatus.ABSENT).count();
            long totalHalfDays = records.stream().filter(a -> a.getAttendanceStatus() == AttendanceStatus.HALF_DAY).count();
            long totalLeaves = records.stream().filter(a -> a.getAttendanceStatus() == AttendanceStatus.LEAVE).count();
            long totalHolidays = records.stream().filter(a -> a.getAttendanceStatus() == AttendanceStatus.HOLIDAY).count();
            
            double totalWorkingHours = records.stream().mapToDouble(a -> a.getWorkingHours() != null ? a.getWorkingHours() : 0.0).sum();
            double totalOvertimeHours = records.stream().mapToDouble(a -> a.getOvertimeHours() != null ? a.getOvertimeHours() : 0.0).sum();
            
            reports.add(MonthlyAttendanceReportDTO.builder()
                    .staffId(staff.getId())
                    .staffName(staff.getFullName())
                    .monthYear(String.format("%02d-%d", month, year))
                    .totalPresent(totalPresent)
                    .totalAbsent(totalAbsent)
                    .totalHalfDays(totalHalfDays)
                    .totalLeaves(totalLeaves)
                    .totalHolidays(totalHolidays)
                    .totalWorkingHours(Math.round(totalWorkingHours * 100.0) / 100.0)
                    .totalOvertimeHours(Math.round(totalOvertimeHours * 100.0) / 100.0)
                    .build());
        }
        
        return reports;
    }

    @Override
    public Page<AttendanceSummaryDTO> searchAttendance(String societyId, String staffId, String keyword, AttendanceStatus status, Shift shift, LocalDate startDate, LocalDate endDate, int page, int size, String sortBy, String sortDir) {
        
        if (societyId != null) {
            validateSecurityAccessForSociety(societyId);
        }
        
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Page<Attendance> attendancePage = attendanceRepository.searchAttendance(societyId, staffId, keyword, status, shift, startDate, endDate, pageable);
        
        List<String> staffIds = attendancePage.getContent().stream().map(Attendance::getStaffId).distinct().collect(Collectors.toList());
        Map<String, String> staffNames = staffRepository.findAllById(staffIds).stream()
                .collect(Collectors.toMap(Staff::getId, Staff::getFullName));
                
        return attendancePage.map(a -> attendanceMapper.toSummaryDTO(a, staffNames.getOrDefault(a.getStaffId(), "Unknown")));
    }

    @Override
    @Transactional
    public void deleteAttendance(String id) {
        log.info("Soft deleting attendance ID: {}", id);
        Attendance attendance = attendanceRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Attendance not found with id: " + id));

        validateSecurityAccessForSociety(attendance.getSocietyId());

        attendance.setIsDeleted(true);
        attendanceRepository.save(attendance);
    }
    
    // --- Helper Methods ---

    private void calculateHours(Attendance attendance) {
        if (attendance.getCheckInTime() != null && attendance.getCheckOutTime() != null) {
            Duration duration = Duration.between(attendance.getCheckInTime(), attendance.getCheckOutTime());
            double hours = duration.toMinutes() / 60.0;
            
            // Round to 2 decimal places
            hours = Math.round(hours * 100.0) / 100.0;
            attendance.setWorkingHours(hours);
            
            if (hours > STANDARD_WORKING_HOURS) {
                double overtime = hours - STANDARD_WORKING_HOURS;
                attendance.setOvertimeHours(Math.round(overtime * 100.0) / 100.0);
            } else {
                attendance.setOvertimeHours(0.0);
            }
        } else {
            attendance.setWorkingHours(0.0);
            attendance.setOvertimeHours(0.0);
        }
    }

    private void validateSecurityAccessForSociety(String targetSocietyId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !auth.getName().equals("anonymousUser")) {
            String email = auth.getName();
            User user = userRepository.findByEmail(email).orElse(null);
            
            if (user != null && user.getRole() == Role.SOCIETY_ADMIN) {
                if (user.getSocietyId() == null || !user.getSocietyId().equals(targetSocietyId)) {
                    throw new AccessDeniedException("SOCIETY_ADMIN can only manage resources belonging to their own society.");
                }
            }
        }
    }
    
    private void validateSecurityAccessForStaff(Staff staff) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !auth.getName().equals("anonymousUser")) {
            String email = auth.getName();
            User user = userRepository.findByEmail(email).orElse(null);
            
            if (user != null) {
                if (user.getRole() == Role.SOCIETY_ADMIN && !user.getSocietyId().equals(staff.getSocietyId())) {
                    throw new AccessDeniedException("SOCIETY_ADMIN can only view attendance for staff in their own society.");
                }
                if (user.getRole() == Role.STAFF && !user.getId().equals(staff.getUserId())) {
                    throw new AccessDeniedException("STAFF can only view their own attendance records.");
                }
            }
        }
    }
}
