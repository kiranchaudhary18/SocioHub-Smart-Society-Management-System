package com.resicore.modules.building.mapper;

import com.resicore.modules.building.dto.BuildingRequestDTO;
import com.resicore.modules.building.dto.BuildingResponseDTO;
import com.resicore.modules.building.dto.BuildingSummaryDTO;
import com.resicore.modules.building.entity.Building;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class BuildingMapper {

    public Building toEntity(BuildingRequestDTO dto) {
        if (dto == null) {
            return null;
        }

        return Building.builder()
                .societyId(dto.getSocietyId())
                .buildingName(dto.getBuildingName())
                .buildingCode(dto.getBuildingCode())
                .description(dto.getDescription())
                .numberOfFloors(dto.getNumberOfFloors())
                .numberOfParkingLevels(dto.getNumberOfParkingLevels() != null ? dto.getNumberOfParkingLevels() : 0)
                .constructionYear(dto.getConstructionYear())
                .status(dto.getStatus())
                .address(dto.getAddress())
                .build();
    }

    public void updateEntityFromDto(BuildingRequestDTO dto, Building entity) {
        if (dto == null || entity == null) {
            return;
        }
        
        // societyId should ideally not be updated once set, but mapping it if needed
        entity.setSocietyId(dto.getSocietyId());
        entity.setBuildingName(dto.getBuildingName());
        entity.setBuildingCode(dto.getBuildingCode());
        entity.setDescription(dto.getDescription());
        entity.setNumberOfFloors(dto.getNumberOfFloors());
        if (dto.getNumberOfParkingLevels() != null) {
            entity.setNumberOfParkingLevels(dto.getNumberOfParkingLevels());
        }
        entity.setConstructionYear(dto.getConstructionYear());
        if (dto.getStatus() != null) {
            entity.setStatus(dto.getStatus());
        }
        entity.setAddress(dto.getAddress());
    }

    public BuildingResponseDTO toResponseDTO(Building entity) {
        if (entity == null) {
            return null;
        }

        return BuildingResponseDTO.builder()
                .id(entity.getId())
                .societyId(entity.getSocietyId())
                .buildingName(entity.getBuildingName())
                .buildingCode(entity.getBuildingCode())
                .description(entity.getDescription())
                .numberOfFloors(entity.getNumberOfFloors())
                .numberOfFlats(entity.getNumberOfFlats())
                .numberOfParkingLevels(entity.getNumberOfParkingLevels())
                .constructionYear(entity.getConstructionYear())
                .status(entity.getStatus())
                .address(entity.getAddress())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    public BuildingSummaryDTO toSummaryDTO(Building entity) {
        if (entity == null) {
            return null;
        }

        return BuildingSummaryDTO.builder()
                .id(entity.getId())
                .buildingName(entity.getBuildingName())
                .buildingCode(entity.getBuildingCode())
                .numberOfFloors(entity.getNumberOfFloors())
                .numberOfFlats(entity.getNumberOfFlats())
                .status(entity.getStatus())
                .build();
    }

    public List<BuildingSummaryDTO> toSummaryDTOs(List<Building> entities) {
        if (entities == null) {
            return null;
        }
        return entities.stream().map(this::toSummaryDTO).collect(Collectors.toList());
    }
}
