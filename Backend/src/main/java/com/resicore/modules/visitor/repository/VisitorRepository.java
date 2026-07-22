package com.resicore.modules.visitor.repository;

import com.resicore.modules.visitor.entity.Visitor;
import com.resicore.modules.visitor.enums.VisitorStatus;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface VisitorRepository extends MongoRepository<Visitor, String>, CustomVisitorRepository {

    Optional<Visitor> findByIdAndIsDeletedFalse(String id);
    
    Optional<Visitor> findByVisitorCodeAndIsDeletedFalse(String visitorCode);
    
    List<Visitor> findByResidentIdAndIsDeletedFalse(String residentId);
    
    List<Visitor> findBySocietyIdAndIsDeletedFalse(String societyId);
    
    List<Visitor> findByBuildingIdAndIsDeletedFalse(String buildingId);
    
    List<Visitor> findByFlatIdAndIsDeletedFalse(String flatId);
    
    List<Visitor> findByStatusAndIsDeletedFalse(VisitorStatus status);
    
    List<Visitor> findByExpectedArrivalBetweenAndIsDeletedFalse(LocalDateTime start, LocalDateTime end);
}
