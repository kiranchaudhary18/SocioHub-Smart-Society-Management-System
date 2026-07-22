package com.resicore.modules.building.dto;

import com.resicore.modules.building.enums.BuildingStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BuildingSummaryDTO {
    private String id;
    private String buildingName;
    private String buildingCode;
    private Integer numberOfFloors;
    private Integer numberOfFlats;
    private BuildingStatus status;
}
