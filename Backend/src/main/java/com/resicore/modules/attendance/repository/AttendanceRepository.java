package com.resicore.modules.attendance.repository;

import com.resicore.modules.attendance.entity.Attendance;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface AttendanceRepository extends MongoRepository<Attendance, String>, CustomAttendanceRepository {

    Optional<Attendance> findByIdAndIsDeletedFalse(String id);
    
    List<Attendance> findByStaffIdAndIsDeletedFalse(String staffId);
    
    List<Attendance> findBySocietyIdAndIsDeletedFalse(String societyId);
    
    List<Attendance> findByAttendanceDateAndIsDeletedFalse(LocalDate date);
    
    List<Attendance> findByStaffIdAndAttendanceDateBetweenAndIsDeletedFalse(String staffId, LocalDate startDate, LocalDate endDate);
    
    boolean existsByStaffIdAndAttendanceDateAndIsDeletedFalse(String staffId, LocalDate date);
    
    Optional<Attendance> findByStaffIdAndAttendanceDateAndIsDeletedFalse(String staffId, LocalDate date);
}
