package com.resicore.modules.platform.service;

import com.resicore.modules.platform.dto.AdminProfileDTO;
import com.resicore.modules.platform.dto.AdminRequestDTO;
import org.springframework.data.domain.Page;

public interface PlatformAdminManagementService {
    AdminProfileDTO createSocietyAdmin(AdminRequestDTO requestDTO);
    AdminProfileDTO updateSocietyAdmin(String adminId, AdminRequestDTO requestDTO);
    AdminProfileDTO deactivateSocietyAdmin(String adminId);
    void resetSocietyAdminPassword(String adminId, String newPassword);
    
    AdminProfileDTO assignSociety(String adminId, String societyId);
    AdminProfileDTO removeSocietyAssignment(String adminId);
    
    AdminProfileDTO getAdminProfile(String adminId);
    
    Page<AdminProfileDTO> searchAdmins(String keyword, String societyId, Boolean isActive, int page, int size, String sortBy, String sortDir);
}
