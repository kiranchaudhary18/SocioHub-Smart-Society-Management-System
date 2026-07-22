package com.resicore.modules.building.entity;

import com.resicore.common.entity.BaseEntity;
import com.resicore.modules.building.enums.BuildingStatus;
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
@Document(collection = "buildings")
public class Building extends BaseEntity {

    private String societyId;
    
    private String buildingName;
    private String buildingCode;
    private String description;
    
    @Builder.Default
    private Integer numberOfFloors = 0;
    
    @Builder.Default
    private Integer numberOfFlats = 0;
    
    @Builder.Default
    private Integer numberOfParkingLevels = 0;
    
    private Integer constructionYear;
    
    @Builder.Default
    private BuildingStatus status = BuildingStatus.ACTIVE;
    
    private String address;
    
    @Builder.Default
    private Boolean isDeleted = false;
}
