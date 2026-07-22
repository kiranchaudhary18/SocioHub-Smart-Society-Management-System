package com.resicore.modules.flat.repository;

import com.resicore.modules.flat.entity.Flat;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FlatRepository extends MongoRepository<Flat, String>, CustomFlatRepository {

    Optional<Flat> findByIdAndIsDeletedFalse(String id);
    
    List<Flat> findBySocietyIdAndIsDeletedFalse(String societyId);
    
    List<Flat> findByBuildingIdAndIsDeletedFalse(String buildingId);
    
    Optional<Flat> findByCurrentResidentIdAndIsDeletedFalse(String currentResidentId);

    boolean existsByBuildingIdAndFlatNumberAndIsDeletedFalse(String buildingId, String flatNumber);
}
