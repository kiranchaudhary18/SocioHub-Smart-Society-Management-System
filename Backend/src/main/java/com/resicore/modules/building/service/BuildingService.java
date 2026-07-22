package com.resicore.modules.building.service;

import com.resicore.modules.building.dto.BuildingRequestDTO;
import com.resicore.modules.building.dto.BuildingResponseDTO;
import com.resicore.modules.building.dto.BuildingSummaryDTO;
import com.resicore.modules.building.enums.BuildingStatus;
import org.springframework.data.domain.Page;

import java.util.List;

public interface BuildingService {
    BuildingResponseDTO createBuilding(BuildingRequestDTO requestDTO);
    BuildingResponseDTO updateBuilding(String id, BuildingRequestDTO requestDTO);
    BuildingResponseDTO getBuildingById(String id);
    List<BuildingSummaryDTO> getBuildingsBySociety(String societyId);
    void deleteBuilding(String id);
    Page<BuildingSummaryDTO> searchBuildings(String societyId, String keyword, BuildingStatus status, int page, int size, String sortBy, String sortDir);
}
