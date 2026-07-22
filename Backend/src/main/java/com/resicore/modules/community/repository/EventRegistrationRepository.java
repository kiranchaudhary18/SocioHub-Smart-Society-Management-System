package com.resicore.modules.community.repository;

import com.resicore.modules.community.entity.EventRegistration;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EventRegistrationRepository extends MongoRepository<EventRegistration, String> {
    boolean existsByEventIdAndResidentIdAndStatus(String eventId, String residentId, String status);
    
    List<EventRegistration> findByResidentId(String residentId);
    
    long countByEventIdAndStatus(String eventId, String status);
}
