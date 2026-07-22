package com.resicore.modules.community.repository;

import com.resicore.modules.community.entity.Poll;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PollRepository extends MongoRepository<Poll, String>, CustomPollRepository {
    Optional<Poll> findByIdAndIsDeletedFalse(String id);
}
