package com.resicore.modules.building.repository;

import com.resicore.modules.building.entity.Building;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BuildingRepository extends MongoRepository<Building, String>, CustomBuildingRepository {

    Optional<Building> findByIdAndIsDeletedFalse(String id);
    
    List<Building> findBySocietyIdAndIsDeletedFalse(String societyId);
    
    Optional<Building> findByBuildingCodeAndIsDeletedFalse(String buildingCode);

    boolean existsByBuildingCodeAndIsDeletedFalse(String buildingCode);

    boolean existsBySocietyIdAndBuildingCodeAndIsDeletedFalse(String societyId, String buildingCode);
}
