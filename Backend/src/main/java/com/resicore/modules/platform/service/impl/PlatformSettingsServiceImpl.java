package com.resicore.modules.platform.service.impl;

import com.resicore.common.enums.Role;
import com.resicore.modules.platform.dto.PlatformSettingsRequestDTO;
import com.resicore.modules.platform.dto.PlatformSettingsResponseDTO;
import com.resicore.modules.platform.entity.PlatformSettings;
import com.resicore.modules.platform.enums.AuditLogAction;
import com.resicore.modules.platform.mapper.PlatformMapper;
import com.resicore.modules.platform.repository.PlatformSettingsRepository;
import com.resicore.modules.platform.service.PlatformAuditService;
import com.resicore.modules.platform.service.PlatformSettingsService;
import com.resicore.modules.user.entity.User;
import com.resicore.modules.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class PlatformSettingsServiceImpl implements PlatformSettingsService {

    private final PlatformSettingsRepository platformSettingsRepository;
    private final UserRepository userRepository;
    private final PlatformMapper platformMapper;
    private final PlatformAuditService auditService;

    @Override
    public PlatformSettingsResponseDTO getSettings() {
        validateSuperAdmin();
        return platformMapper.toPlatformSettingsResponseDTO(getOrCreateSettings());
    }

    @Override
    @Transactional
    public PlatformSettingsResponseDTO updatePlatformName(String name) {
        validateSuperAdmin();
        PlatformSettings settings = getOrCreateSettings();
        settings.setPlatformName(name);
        settings.setUpdatedAt(LocalDateTime.now());
        settings = platformSettingsRepository.save(settings);
        auditService.logAction(AuditLogAction.SETTINGS_UPDATED, settings.getId(), "Updated Platform Name to: " + name);
        return platformMapper.toPlatformSettingsResponseDTO(settings);
    }

    @Override
    @Transactional
    public PlatformSettingsResponseDTO updateLogo(String logoUrl) {
        validateSuperAdmin();
        PlatformSettings settings = getOrCreateSettings();
        settings.setLogoUrl(logoUrl);
        settings.setUpdatedAt(LocalDateTime.now());
        settings = platformSettingsRepository.save(settings);
        auditService.logAction(AuditLogAction.SETTINGS_UPDATED, settings.getId(), "Updated Logo URL");
        return platformMapper.toPlatformSettingsResponseDTO(settings);
    }

    @Override
    @Transactional
    public PlatformSettingsResponseDTO updateDefaultCurrency(String currency) {
        validateSuperAdmin();
        PlatformSettings settings = getOrCreateSettings();
        settings.setDefaultCurrency(currency);
        settings.setUpdatedAt(LocalDateTime.now());
        settings = platformSettingsRepository.save(settings);
        auditService.logAction(AuditLogAction.SETTINGS_UPDATED, settings.getId(), "Updated Default Currency to: " + currency);
        return platformMapper.toPlatformSettingsResponseDTO(settings);
    }

    @Override
    @Transactional
    public PlatformSettingsResponseDTO updateDefaultTimeZone(String timeZone) {
        validateSuperAdmin();
        PlatformSettings settings = getOrCreateSettings();
        settings.setDefaultTimeZone(timeZone);
        settings.setUpdatedAt(LocalDateTime.now());
        settings = platformSettingsRepository.save(settings);
        auditService.logAction(AuditLogAction.SETTINGS_UPDATED, settings.getId(), "Updated Default TimeZone to: " + timeZone);
        return platformMapper.toPlatformSettingsResponseDTO(settings);
    }

    @Override
    @Transactional
    public PlatformSettingsResponseDTO updateMaintenanceRules(String rules) {
        validateSuperAdmin();
        PlatformSettings settings = getOrCreateSettings();
        settings.setMaintenanceRules(rules);
        settings.setUpdatedAt(LocalDateTime.now());
        settings = platformSettingsRepository.save(settings);
        auditService.logAction(AuditLogAction.CONFIGURATION_CHANGED, settings.getId(), "Updated Maintenance Rules");
        return platformMapper.toPlatformSettingsResponseDTO(settings);
    }

    @Override
    @Transactional
    public PlatformSettingsResponseDTO updateGlobalConfiguration(String config) {
        validateSuperAdmin();
        PlatformSettings settings = getOrCreateSettings();
        settings.setGlobalConfiguration(config);
        settings.setUpdatedAt(LocalDateTime.now());
        settings = platformSettingsRepository.save(settings);
        auditService.logAction(AuditLogAction.CONFIGURATION_CHANGED, settings.getId(), "Updated Global Configuration");
        return platformMapper.toPlatformSettingsResponseDTO(settings);
    }

    @Override
    @Transactional
    public PlatformSettingsResponseDTO updateAllSettings(PlatformSettingsRequestDTO requestDTO) {
        validateSuperAdmin();
        PlatformSettings settings = getOrCreateSettings();
        platformMapper.updatePlatformSettingsFromDto(requestDTO, settings);
        settings.setUpdatedAt(LocalDateTime.now());
        settings = platformSettingsRepository.save(settings);
        auditService.logAction(AuditLogAction.SETTINGS_UPDATED, settings.getId(), "Updated All Settings via full payload");
        return platformMapper.toPlatformSettingsResponseDTO(settings);
    }

    // --- Helpers ---
    
    private PlatformSettings getOrCreateSettings() {
        if (platformSettingsRepository.count() == 0) {
            PlatformSettings settings = PlatformSettings.builder()
                    .platformName("ResiCore")
                    .defaultCurrency("USD")
                    .defaultTimeZone("UTC")
                    .build();
            return platformSettingsRepository.save(settings);
        }
        return platformSettingsRepository.findAll().get(0);
    }

    private void validateSuperAdmin() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !auth.getName().equals("anonymousUser")) {
            User user = userRepository.findByEmail(auth.getName())
                    .orElseThrow(() -> new AccessDeniedException("User not found"));
            if (user.getRole() != Role.SUPER_ADMIN) {
                throw new AccessDeniedException("Only SUPER_ADMIN can manage platform settings.");
            }
            return;
        }
        throw new AccessDeniedException("Unauthorized");
    }
}
