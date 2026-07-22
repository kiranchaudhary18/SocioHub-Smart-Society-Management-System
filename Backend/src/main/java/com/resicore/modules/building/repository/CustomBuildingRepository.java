package com.resicore.modules.building.repository;

import com.resicore.modules.building.entity.Building;
import com.resicore.modules.building.enums.BuildingStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CustomBuildingRepository {
    Page<Building> searchBuildings(String societyId, String keyword, BuildingStatus status, Pageable pageable);
}
