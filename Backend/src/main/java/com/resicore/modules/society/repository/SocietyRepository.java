package com.resicore.modules.society.repository;

import com.resicore.modules.society.entity.Society;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SocietyRepository extends MongoRepository<Society, String>, CustomSocietyRepository {

    Optional<Society> findByIdAndIsDeletedFalse(String id);
    
    Optional<Society> findBySocietyCodeAndIsDeletedFalse(String societyCode);

    boolean existsBySocietyCodeAndIsDeletedFalse(String societyCode);

    boolean existsByRegistrationNumberAndIsDeletedFalse(String registrationNumber);
    Optional<Society> findByRegistrationNumberAndIsDeletedFalse(String registrationNumber);

    boolean existsByEmailAndIsDeletedFalse(String email);
    Optional<Society> findByEmailAndIsDeletedFalse(String email);
    
    long countByStatus(com.resicore.modules.society.enums.SocietyStatus status);
}
