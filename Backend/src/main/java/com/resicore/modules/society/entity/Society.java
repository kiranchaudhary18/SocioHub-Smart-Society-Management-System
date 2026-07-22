package com.resicore.modules.society.entity;

import com.resicore.common.entity.BaseEntity;
import com.resicore.modules.society.enums.SocietyStatus;
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
@Document(collection = "societies")
public class Society extends BaseEntity {

    private String societyName;
    private String societyCode;
    private String registrationNumber;
    private String email;
    private String phone;
    private String website;
    private String description;
    
    @Builder.Default
    private SocietyStatus status = SocietyStatus.UNDER_SETUP;
    
    private String logo;
    private String coverImage;
    private String country;
    private String state;
    private String city;
    private String address;
    private String pincode;
    
    private Double latitude;
    private Double longitude;
    
    private String timezone;
    private String currency;
    
    @Builder.Default
    private Integer totalBuildings = 0;
    
    @Builder.Default
    private Integer totalFlats = 0;
    
    @Builder.Default
    private Integer totalResidents = 0;
    
    @Builder.Default
    private Integer totalStaff = 0;
    
    @Builder.Default
    private Integer amenitiesCount = 0;
    
    @Builder.Default
    private Boolean isDeleted = false;
}
