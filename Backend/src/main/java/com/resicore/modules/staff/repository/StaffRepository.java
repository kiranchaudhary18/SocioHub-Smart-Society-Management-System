package com.resicore.modules.staff.repository;

import com.resicore.modules.staff.entity.Staff;
import com.resicore.modules.staff.enums.StaffType;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StaffRepository extends MongoRepository<Staff, String>, CustomStaffRepository {

    Optional<Staff> findByIdAndIsDeletedFalse(String id);
    
    Optional<Staff> findByUserIdAndIsDeletedFalse(String userId);
    
    Optional<Staff> findByStaffCodeAndIsDeletedFalse(String staffCode);
    
    List<Staff> findBySocietyIdAndIsDeletedFalse(String societyId);
    
    List<Staff> findByDepartmentAndIsDeletedFalse(String department);
    
    List<Staff> findByStaffTypeAndIsDeletedFalse(String staffType);

    boolean existsByEmployeeIdAndSocietyIdAndIsDeletedFalse(String employeeId, String societyId);

    boolean existsByEmailAndIsDeletedFalse(String email);
    
    boolean existsByPhoneAndIsDeletedFalse(String phone);
    
    boolean existsByUserIdAndIsDeletedFalse(String userId);
}
