package com.resicore.modules.amenity.repository;

import com.resicore.modules.amenity.entity.Amenity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AmenityRepository extends MongoRepository<Amenity, String>, CustomAmenityRepository {

    Optional<Amenity> findByIdAndIsDeletedFalse(String id);
    
    boolean existsByNameIgnoreCaseAndSocietyIdAndIsDeletedFalse(String name, String societyId);
}
