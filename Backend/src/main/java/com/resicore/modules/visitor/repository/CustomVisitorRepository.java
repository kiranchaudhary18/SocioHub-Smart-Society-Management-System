package com.resicore.modules.visitor.repository;

import com.resicore.modules.visitor.entity.Visitor;
import com.resicore.modules.visitor.enums.Purpose;
import com.resicore.modules.visitor.enums.VisitorStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;

public interface CustomVisitorRepository {
    Page<Visitor> searchVisitors(String societyId, String residentId, String buildingId, String flatId, String keyword, VisitorStatus status, Purpose purpose, LocalDateTime startDate, LocalDateTime endDate, Pageable pageable);
}
