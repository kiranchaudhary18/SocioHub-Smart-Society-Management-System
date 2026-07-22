package com.resicore.modules.platform.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlatformSettingsRequestDTO {
    
    @NotBlank(message = "Platform name is required")
    private String platformName;
    
    private String logoUrl;
    
    @NotBlank(message = "Default currency is required")
    private String defaultCurrency;
    
    @NotBlank(message = "Default time zone is required")
    private String defaultTimeZone;
    
    private String maintenanceRules;
    private String globalConfiguration;
}
