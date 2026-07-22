package com.resicore.modules.staff.repository;

import com.resicore.modules.staff.entity.Staff;
import com.resicore.modules.staff.enums.EmploymentType;
import com.resicore.modules.staff.enums.Shift;
import com.resicore.modules.staff.enums.StaffStatus;
import com.resicore.modules.staff.enums.StaffType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CustomStaffRepository {
    Page<Staff> searchStaff(String societyId, String keyword, String department, StaffType staffType, EmploymentType employmentType, Shift shift, StaffStatus status, Pageable pageable);
}
