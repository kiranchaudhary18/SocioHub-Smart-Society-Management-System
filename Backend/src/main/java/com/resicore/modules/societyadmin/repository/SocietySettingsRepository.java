package com.resicore.modules.societyadmin.repository;

import com.resicore.modules.societyadmin.entity.SocietySettings;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SocietySettingsRepository extends MongoRepository<SocietySettings, String> {
    Optional<SocietySettings> findBySocietyId(String societyId);
}
