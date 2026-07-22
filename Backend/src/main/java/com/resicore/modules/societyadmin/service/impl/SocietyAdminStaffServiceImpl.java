package com.resicore.modules.societyadmin.service.impl;

import com.resicore.modules.staff.entity.Staff;
import com.resicore.modules.staff.enums.StaffStatus;
import com.resicore.modules.staff.repository.StaffRepository;
import com.resicore.modules.societyadmin.service.SocietyAdminStaffService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class SocietyAdminStaffServiceImpl implements SocietyAdminStaffService {

    private final StaffRepository staffRepository;
    private final MongoTemplate mongoTemplate;

    @Override
    @Transactional
    public Staff assignStaff(String staffId, String societyId, String assignmentDetails) {
        Staff staff = getStaff(staffId);
        staff.setSocietyId(societyId);
        staff.setNotes(assignmentDetails); 
        return staffRepository.save(staff);
    }

    @Override
    @Transactional
    public Staff deactivateStaff(String staffId) {
        Staff staff = getStaff(staffId);
        staff.setStatus(StaffStatus.INACTIVE);
        return staffRepository.save(staff);
    }

    @Override
    @Transactional
    public Staff transferStaff(String staffId, String newSocietyId) {
        Staff staff = getStaff(staffId);
        staff.setSocietyId(newSocietyId);
        return staffRepository.save(staff);
    }

    @Override
    @Transactional
    public void resetStaffPassword(String staffId, String newPassword) {
        log.info("Resetting password for staff {}", staffId);
    }

    @Override
    public Object getStaffStatistics(String societyId) {
        Query totalQuery = new Query(Criteria.where("societyId").is(societyId));
        long totalStaff = mongoTemplate.count(totalQuery, Staff.class);
        
        Query activeQuery = new Query(Criteria.where("societyId").is(societyId).and("status").is(StaffStatus.ACTIVE));
        long activeStaff = mongoTemplate.count(activeQuery, Staff.class);

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalStaff", totalStaff);
        stats.put("activeStaff", activeStaff);
        stats.put("inactiveStaff", totalStaff - activeStaff);
        
        return stats;
    }

    private Staff getStaff(String id) {
        return staffRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Staff not found: " + id));
    }
}
