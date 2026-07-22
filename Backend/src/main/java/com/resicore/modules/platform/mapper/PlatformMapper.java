package com.resicore.modules.platform.mapper;

import com.resicore.modules.platform.dto.AdminProfileDTO;
import com.resicore.modules.platform.dto.AuditLogResponseDTO;
import com.resicore.modules.platform.dto.PlatformSettingsRequestDTO;
import com.resicore.modules.platform.dto.PlatformSettingsResponseDTO;
import com.resicore.modules.platform.entity.AuditLog;
import com.resicore.modules.platform.entity.PlatformSettings;
import com.resicore.modules.user.entity.User;
import org.springframework.stereotype.Component;

@Component
public class PlatformMapper {

    public PlatformSettingsResponseDTO toPlatformSettingsResponseDTO(PlatformSettings entity) {
        if (entity == null) return null;
        
        return PlatformSettingsResponseDTO.builder()
                .id(entity.getId())
                .platformName(entity.getPlatformName())
                .logoUrl(entity.getLogoUrl())
                .defaultCurrency(entity.getDefaultCurrency())
                .defaultTimeZone(entity.getDefaultTimeZone())
                .maintenanceRules(entity.getMaintenanceRules())
                .globalConfiguration(entity.getGlobalConfiguration())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }
    
    public void updatePlatformSettingsFromDto(PlatformSettingsRequestDTO dto, PlatformSettings settings) {
        if (dto == null || settings == null) return;
        
        settings.setPlatformName(dto.getPlatformName());
        settings.setLogoUrl(dto.getLogoUrl());
        settings.setDefaultCurrency(dto.getDefaultCurrency());
        settings.setDefaultTimeZone(dto.getDefaultTimeZone());
        settings.setMaintenanceRules(dto.getMaintenanceRules());
        settings.setGlobalConfiguration(dto.getGlobalConfiguration());
    }

    public AuditLogResponseDTO toAuditLogResponseDTO(AuditLog entity) {
        if (entity == null) return null;
        
        return AuditLogResponseDTO.builder()
                .id(entity.getId())
                .action(entity.getAction())
                .performedByUserId(entity.getPerformedByUserId())
                .performedByEmail(entity.getPerformedByEmail())
                .targetEntityId(entity.getTargetEntityId())
                .details(entity.getDetails())
                .ipAddress(entity.getIpAddress())
                .timestamp(entity.getTimestamp())
                .build();
    }
    
    public AdminProfileDTO toAdminProfileDTO(User user) {
        if (user == null) return null;
        
        return AdminProfileDTO.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .role(user.getRole())
                .societyId(user.getSocietyId())
                .isActive(user.isActive())
                .createdAt(user.getCreatedAt())
                .build();
    }
}
