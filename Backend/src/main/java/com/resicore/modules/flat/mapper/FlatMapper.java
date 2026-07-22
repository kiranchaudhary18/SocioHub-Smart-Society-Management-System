package com.resicore.modules.flat.mapper;

import com.resicore.modules.flat.dto.FlatRequestDTO;
import com.resicore.modules.flat.dto.FlatResponseDTO;
import com.resicore.modules.flat.dto.FlatSummaryDTO;
import com.resicore.modules.flat.entity.Flat;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class FlatMapper {

    public Flat toEntity(FlatRequestDTO dto) {
        if (dto == null) {
            return null;
        }

        return Flat.builder()
                .societyId(dto.getSocietyId())
                .buildingId(dto.getBuildingId())
                .flatNumber(dto.getFlatNumber())
                .floorNumber(dto.getFloorNumber())
                .block(dto.getBlock())
                .wing(dto.getWing())
                .flatType(dto.getFlatType())
                .status(dto.getStatus())
                .ownershipType(dto.getOwnershipType())
                .areaSqFt(dto.getAreaSqFt())
                .carpetArea(dto.getCarpetArea())
                .bedrooms(dto.getBedrooms() != null ? dto.getBedrooms() : 0)
                .bathrooms(dto.getBathrooms() != null ? dto.getBathrooms() : 0)
                .balconies(dto.getBalconies() != null ? dto.getBalconies() : 0)
                .parkingSlots(dto.getParkingSlots() != null ? dto.getParkingSlots() : 0)
                .maintenanceCategory(dto.getMaintenanceCategory())
                .maintenanceAmount(dto.getMaintenanceAmount() != null ? dto.getMaintenanceAmount() : 0.0)
                .build();
    }

    public void updateEntityFromDto(FlatRequestDTO dto, Flat entity) {
        if (dto == null || entity == null) {
            return;
        }

        entity.setFlatNumber(dto.getFlatNumber());
        entity.setFloorNumber(dto.getFloorNumber());
        entity.setBlock(dto.getBlock());
        entity.setWing(dto.getWing());
        entity.setFlatType(dto.getFlatType());
        
        if (dto.getStatus() != null) {
            entity.setStatus(dto.getStatus());
        }
        
        entity.setOwnershipType(dto.getOwnershipType());
        entity.setAreaSqFt(dto.getAreaSqFt());
        entity.setCarpetArea(dto.getCarpetArea());
        
        if (dto.getBedrooms() != null) entity.setBedrooms(dto.getBedrooms());
        if (dto.getBathrooms() != null) entity.setBathrooms(dto.getBathrooms());
        if (dto.getBalconies() != null) entity.setBalconies(dto.getBalconies());
        if (dto.getParkingSlots() != null) entity.setParkingSlots(dto.getParkingSlots());
        
        entity.setMaintenanceCategory(dto.getMaintenanceCategory());
        
        if (dto.getMaintenanceAmount() != null) {
            entity.setMaintenanceAmount(dto.getMaintenanceAmount());
        }
    }

    public FlatResponseDTO toResponseDTO(Flat entity) {
        if (entity == null) {
            return null;
        }

        return FlatResponseDTO.builder()
                .id(entity.getId())
                .societyId(entity.getSocietyId())
                .buildingId(entity.getBuildingId())
                .flatNumber(entity.getFlatNumber())
                .floorNumber(entity.getFloorNumber())
                .block(entity.getBlock())
                .wing(entity.getWing())
                .flatType(entity.getFlatType())
                .status(entity.getStatus())
                .ownershipType(entity.getOwnershipType())
                .areaSqFt(entity.getAreaSqFt())
                .carpetArea(entity.getCarpetArea())
                .bedrooms(entity.getBedrooms())
                .bathrooms(entity.getBathrooms())
                .balconies(entity.getBalconies())
                .parkingSlots(entity.getParkingSlots())
                .maintenanceCategory(entity.getMaintenanceCategory())
                .maintenanceAmount(entity.getMaintenanceAmount())
                .isOccupied(entity.getIsOccupied())
                .currentResidentId(entity.getCurrentResidentId())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    public FlatSummaryDTO toSummaryDTO(Flat entity) {
        if (entity == null) {
            return null;
        }

        return FlatSummaryDTO.builder()
                .id(entity.getId())
                .buildingId(entity.getBuildingId())
                .flatNumber(entity.getFlatNumber())
                .block(entity.getBlock())
                .wing(entity.getWing())
                .flatType(entity.getFlatType())
                .status(entity.getStatus())
                .isOccupied(entity.getIsOccupied())
                .build();
    }

    public List<FlatSummaryDTO> toSummaryDTOs(List<Flat> entities) {
        if (entities == null) {
            return null;
        }
        return entities.stream().map(this::toSummaryDTO).collect(Collectors.toList());
    }
}
