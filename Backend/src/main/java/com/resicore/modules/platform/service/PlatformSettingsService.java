package com.resicore.modules.platform.service;

import com.resicore.modules.platform.dto.PlatformSettingsRequestDTO;
import com.resicore.modules.platform.dto.PlatformSettingsResponseDTO;

public interface PlatformSettingsService {
    PlatformSettingsResponseDTO getSettings();
    PlatformSettingsResponseDTO updatePlatformName(String name);
    PlatformSettingsResponseDTO updateLogo(String logoUrl);
    PlatformSettingsResponseDTO updateDefaultCurrency(String currency);
    PlatformSettingsResponseDTO updateDefaultTimeZone(String timeZone);
    PlatformSettingsResponseDTO updateMaintenanceRules(String rules);
    PlatformSettingsResponseDTO updateGlobalConfiguration(String config);
    PlatformSettingsResponseDTO updateAllSettings(PlatformSettingsRequestDTO requestDTO);
}
