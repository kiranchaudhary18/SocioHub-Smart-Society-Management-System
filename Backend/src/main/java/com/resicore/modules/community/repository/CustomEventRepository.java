package com.resicore.modules.community.repository;

import com.resicore.modules.community.entity.Event;
import com.resicore.modules.community.enums.EventStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;

public interface CustomEventRepository {
    Page<Event> searchEvents(String societyId, String category, EventStatus status, LocalDateTime startDate, LocalDateTime endDate, String keyword, Pageable pageable);
}
