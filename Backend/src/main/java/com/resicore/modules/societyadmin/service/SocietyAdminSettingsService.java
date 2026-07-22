package com.resicore.modules.societyadmin.service;

import com.resicore.modules.societyadmin.dto.SocietySettingsRequestDTO;
import com.resicore.modules.societyadmin.dto.SocietySettingsResponseDTO;

public interface SocietyAdminSettingsService {
    SocietySettingsResponseDTO getSettings(String societyId);
    SocietySettingsResponseDTO updateSettings(String societyId, SocietySettingsRequestDTO request);
}
