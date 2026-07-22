package com.resicore.modules.community.repository;

import com.resicore.modules.community.entity.PollVote;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PollVoteRepository extends MongoRepository<PollVote, String> {
    boolean existsByPollIdAndResidentId(String pollId, String residentId);
    
    List<PollVote> findByPollId(String pollId);
    long countByPollId(String pollId);
}
