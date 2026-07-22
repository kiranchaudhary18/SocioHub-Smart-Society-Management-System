package com.resicore.modules.building.dto;

import com.resicore.modules.building.enums.BuildingStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BuildingResponseDTO {
    private String id;
    private String societyId;
    private String buildingName;
    private String buildingCode;
    private String description;
    private Integer numberOfFloors;
    private Integer numberOfFlats;
    private Integer numberOfParkingLevels;
    private Integer constructionYear;
    private BuildingStatus status;
    private String address;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
