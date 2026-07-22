package com.resicore.modules.community.repository;

import com.resicore.modules.community.entity.Notice;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NoticeRepository extends MongoRepository<Notice, String>, CustomNoticeRepository {
    Optional<Notice> findByIdAndIsDeletedFalse(String id);
}
