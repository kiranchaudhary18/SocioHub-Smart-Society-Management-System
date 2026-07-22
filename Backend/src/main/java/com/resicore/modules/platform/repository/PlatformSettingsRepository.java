package com.resicore.modules.platform.repository;

import com.resicore.modules.platform.entity.PlatformSettings;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlatformSettingsRepository extends MongoRepository<PlatformSettings, String> {
}
