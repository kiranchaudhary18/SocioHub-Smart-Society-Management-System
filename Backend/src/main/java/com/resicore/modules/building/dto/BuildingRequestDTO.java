package com.resicore.modules.building.dto;

import com.resicore.modules.building.enums.BuildingStatus;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BuildingRequestDTO {

    @NotBlank(message = "Society ID is required")
    private String societyId;

    @NotBlank(message = "Building name is required")
    private String buildingName;

    @NotBlank(message = "Building code is required")
    private String buildingCode;

    private String description;

    @NotNull(message = "Number of floors is required")
    @Min(value = 1, message = "Number of floors must be greater than 0")
    private Integer numberOfFloors;

    private Integer numberOfParkingLevels;
    private Integer constructionYear;
    private BuildingStatus status;
    private String address;
}
