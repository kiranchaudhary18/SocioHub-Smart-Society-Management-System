package com.resicore.modules.familymember.repository;

import com.resicore.modules.familymember.entity.FamilyMember;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FamilyMemberRepository extends MongoRepository<FamilyMember, String>, CustomFamilyMemberRepository {

    Optional<FamilyMember> findByIdAndIsDeletedFalse(String id);
    
    List<FamilyMember> findByResidentIdAndIsDeletedFalse(String residentId);
    
    List<FamilyMember> findByFlatIdAndIsDeletedFalse(String flatId);
    
    List<FamilyMember> findBySocietyIdAndIsDeletedFalse(String societyId);
    
    List<FamilyMember> findByBuildingIdAndIsDeletedFalse(String buildingId);
}
