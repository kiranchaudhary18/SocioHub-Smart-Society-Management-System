package com.resicore.modules.community.repository;

import com.resicore.modules.community.entity.Event;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EventRepository extends MongoRepository<Event, String>, CustomEventRepository {
    Optional<Event> findByIdAndIsDeletedFalse(String id);
}
