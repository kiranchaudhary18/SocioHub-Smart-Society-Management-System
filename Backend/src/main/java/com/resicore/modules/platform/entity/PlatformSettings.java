package com.resicore.modules.platform.entity;

import com.resicore.common.entity.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Document(collection = "platform_settings")
public class PlatformSettings extends BaseEntity {

    @Builder.Default
    private String platformName = "ResiCore";
    
    private String logoUrl;
    
    @Builder.Default
    private String defaultCurrency = "USD";
    
    @Builder.Default
    private String defaultTimeZone = "UTC";
    
    private String maintenanceRules;
    
    private String globalConfiguration;
}
