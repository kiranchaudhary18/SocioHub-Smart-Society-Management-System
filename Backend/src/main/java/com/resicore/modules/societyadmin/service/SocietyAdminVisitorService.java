package com.resicore.modules.societyadmin.service;

import com.resicore.modules.visitor.entity.Visitor;
import com.resicore.modules.societyadmin.dto.VisitorApprovalRequestDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SocietyAdminVisitorService {
    Page<Visitor> getPendingVisitors(String societyId, Pageable pageable);
    Visitor approveVisitor(VisitorApprovalRequestDTO request);
    Visitor rejectVisitor(VisitorApprovalRequestDTO request);
    Page<Visitor> getVisitorHistory(String societyId, Pageable pageable);
    Page<Visitor> getTodaysVisitors(String societyId, Pageable pageable);
}
