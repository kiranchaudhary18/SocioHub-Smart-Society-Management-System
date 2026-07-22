package com.resicore.modules.staff.service;

import com.resicore.modules.staff.dto.StaffProfileDTO;
import com.resicore.modules.staff.dto.StaffRequestDTO;
import com.resicore.modules.staff.dto.StaffResponseDTO;
import com.resicore.modules.staff.dto.StaffSummaryDTO;
import com.resicore.modules.staff.enums.EmploymentType;
import com.resicore.modules.staff.enums.Shift;
import com.resicore.modules.staff.enums.StaffStatus;
import com.resicore.modules.staff.enums.StaffType;
import org.springframework.data.domain.Page;

import java.util.List;

public interface StaffService {
    StaffResponseDTO createStaff(StaffRequestDTO requestDTO);
    StaffResponseDTO updateStaff(String id, StaffRequestDTO requestDTO);
    
    StaffResponseDTO activateStaff(String id);
    StaffResponseDTO deactivateStaff(String id);
    StaffResponseDTO terminateStaff(String id);
    
    StaffResponseDTO getStaffById(String id);
    StaffProfileDTO getStaffByUserId(String userId);
    List<StaffSummaryDTO> getStaffBySociety(String societyId);
    
    Page<StaffSummaryDTO> searchStaff(String societyId, String keyword, String department, StaffType staffType, EmploymentType employmentType, Shift shift, StaffStatus status, int page, int size, String sortBy, String sortDir);
    
    void deleteStaff(String id);
}
