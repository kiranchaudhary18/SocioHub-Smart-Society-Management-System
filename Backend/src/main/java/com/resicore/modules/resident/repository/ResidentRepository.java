package com.resicore.modules.resident.repository;

import com.resicore.modules.resident.entity.Resident;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResidentRepository extends MongoRepository<Resident, String>, CustomResidentRepository {

    Optional<Resident> findByIdAndIsDeletedFalse(String id);
    
    Optional<Resident> findByUserIdAndIsDeletedFalse(String userId);
    
    List<Resident> findByFlatIdAndIsDeletedFalse(String flatId);
    
    Optional<Resident> findByResidentCodeAndIsDeletedFalse(String residentCode);
    
    List<Resident> findBySocietyIdAndIsDeletedFalse(String societyId);
    
    List<Resident> findByBuildingIdAndIsDeletedFalse(String buildingId);

    boolean existsByUserIdAndIsDeletedFalse(String userId);

    boolean existsByFlatIdAndIsPrimaryResidentTrueAndIsDeletedFalse(String flatId);
    
    boolean existsByAadhaarNumberAndIsDeletedFalse(String aadhaarNumber);
    
    boolean existsByPanNumberAndIsDeletedFalse(String panNumber);
}
