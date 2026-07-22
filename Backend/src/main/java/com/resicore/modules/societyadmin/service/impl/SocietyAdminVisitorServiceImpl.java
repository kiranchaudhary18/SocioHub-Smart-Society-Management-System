package com.resicore.modules.societyadmin.service.impl;

import com.resicore.modules.visitor.entity.Visitor;
import com.resicore.modules.visitor.repository.VisitorRepository;
import com.resicore.modules.visitor.enums.VisitorStatus;
import com.resicore.modules.societyadmin.dto.VisitorApprovalRequestDTO;
import com.resicore.modules.societyadmin.service.SocietyAdminVisitorService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class SocietyAdminVisitorServiceImpl implements SocietyAdminVisitorService {

    private final VisitorRepository visitorRepository;
    private final MongoTemplate mongoTemplate;
    
    @Override
    public Page<Visitor> getPendingVisitors(String societyId, Pageable pageable) {
        Query query = new Query(Criteria.where("societyId").is(societyId).and("status").is(VisitorStatus.PENDING));
        long count = mongoTemplate.count(query, Visitor.class);
        query.with(pageable);
        List<Visitor> visitors = mongoTemplate.find(query, Visitor.class);
        return new PageImpl<>(visitors, pageable, count);
    }

    @Override
    @Transactional
    public Visitor approveVisitor(VisitorApprovalRequestDTO request) {
        Visitor visitor = getVisitor(request.getVisitorId());
        visitor.setStatus(VisitorStatus.APPROVED);
        return visitorRepository.save(visitor);
    }

    @Override
    @Transactional
    public Visitor rejectVisitor(VisitorApprovalRequestDTO request) {
        Visitor visitor = getVisitor(request.getVisitorId());
        visitor.setStatus(VisitorStatus.REJECTED);
        return visitorRepository.save(visitor);
    }

    @Override
    public Page<Visitor> getVisitorHistory(String societyId, Pageable pageable) {
        Query query = new Query(Criteria.where("societyId").is(societyId));
        long count = mongoTemplate.count(query, Visitor.class);
        query.with(pageable);
        List<Visitor> visitors = mongoTemplate.find(query, Visitor.class);
        return new PageImpl<>(visitors, pageable, count);
    }

    @Override
    public Page<Visitor> getTodaysVisitors(String societyId, Pageable pageable) {
        LocalDateTime startOfDay = LocalDate.now().atStartOfDay();
        LocalDateTime endOfDay = LocalDate.now().atTime(LocalTime.MAX);
        
        Query query = new Query(Criteria.where("societyId").is(societyId)
                .and("createdAt").gte(startOfDay).lte(endOfDay));
        
        long count = mongoTemplate.count(query, Visitor.class);
        query.with(pageable);
        List<Visitor> visitors = mongoTemplate.find(query, Visitor.class);
        return new PageImpl<>(visitors, pageable, count);
    }
    
    private Visitor getVisitor(String id) {
        return visitorRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Visitor not found: " + id));
    }
}
