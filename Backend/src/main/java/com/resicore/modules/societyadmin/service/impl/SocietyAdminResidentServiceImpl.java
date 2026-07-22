package com.resicore.modules.societyadmin.service.impl;

import com.resicore.modules.resident.entity.Resident;
import com.resicore.modules.resident.enums.ResidentStatus;
import com.resicore.modules.resident.repository.ResidentRepository;
import com.resicore.modules.societyadmin.dto.ResidentApprovalRequestDTO;
import com.resicore.modules.societyadmin.service.SocietyAdminResidentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.domain.PageImpl;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class SocietyAdminResidentServiceImpl implements SocietyAdminResidentService {

    private final ResidentRepository residentRepository;
    private final MongoTemplate mongoTemplate;
    
    @Override
    public Page<Resident> getPendingResidents(String societyId, Pageable pageable) {
        Query query = new Query(Criteria.where("societyId").is(societyId)
                .and("residentStatus").is(ResidentStatus.PENDING_APPROVAL));
        long count = mongoTemplate.count(query, Resident.class);
        query.with(pageable);
        List<Resident> residents = mongoTemplate.find(query, Resident.class);
        return new PageImpl<>(residents, pageable, count);
    }

    @Override
    @Transactional
    public Resident approveResident(ResidentApprovalRequestDTO request) {
        Resident resident = getResident(request.getResidentId());
        resident.setResidentStatus(ResidentStatus.ACTIVE);
        return residentRepository.save(resident);
    }

    @Override
    @Transactional
    public Resident rejectResident(ResidentApprovalRequestDTO request) {
        Resident resident = getResident(request.getResidentId());
        resident.setResidentStatus(ResidentStatus.INACTIVE);
        return residentRepository.save(resident);
    }

    @Override
    @Transactional
    public Resident suspendResident(ResidentApprovalRequestDTO request) {
        Resident resident = getResident(request.getResidentId());
        resident.setResidentStatus(ResidentStatus.BLOCKED);
        return residentRepository.save(resident);
    }

    @Override
    @Transactional
    public Resident activateResident(ResidentApprovalRequestDTO request) {
        Resident resident = getResident(request.getResidentId());
        resident.setResidentStatus(ResidentStatus.ACTIVE); // Assuming activating a suspended resident puts them back to approved
        return residentRepository.save(resident);
    }

    @Override
    @Transactional
    public void bulkApprove(ResidentApprovalRequestDTO request) {
        if (request.getResidentIds() != null) {
            for (String id : request.getResidentIds()) {
                Resident resident = getResident(id);
                resident.setResidentStatus(ResidentStatus.ACTIVE);
                residentRepository.save(resident);
            }
        }
    }

    @Override
    @Transactional
    public void bulkReject(ResidentApprovalRequestDTO request) {
        if (request.getResidentIds() != null) {
            for (String id : request.getResidentIds()) {
                Resident resident = getResident(id);
                resident.setResidentStatus(ResidentStatus.INACTIVE);
                residentRepository.save(resident);
            }
        }
    }
    
    private Resident getResident(String id) {
        return residentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Resident not found: " + id));
    }
}
