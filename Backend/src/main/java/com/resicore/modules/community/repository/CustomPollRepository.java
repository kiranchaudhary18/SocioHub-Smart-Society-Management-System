package com.resicore.modules.community.repository;

import com.resicore.modules.community.entity.Poll;
import com.resicore.modules.community.enums.PollStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CustomPollRepository {
    Page<Poll> searchPolls(String societyId, PollStatus status, String keyword, Pageable pageable);
}
