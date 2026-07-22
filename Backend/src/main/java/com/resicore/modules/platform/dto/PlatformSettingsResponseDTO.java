package com.resicore.modules.platform.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlatformSettingsResponseDTO {
    private String id;
    private String platformName;
    private String logoUrl;
    private String defaultCurrency;
    private String defaultTimeZone;
    private String maintenanceRules;
    private String globalConfiguration;
    private LocalDateTime updatedAt;
}
