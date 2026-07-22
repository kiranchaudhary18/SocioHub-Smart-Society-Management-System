package com.resicore.modules.societyadmin.service.impl;

import com.resicore.modules.societyadmin.dto.AdminDashboardResponseDTO;
import com.resicore.modules.societyadmin.service.SocietyAdminDashboardService;
import com.resicore.modules.society.entity.Society;
import com.resicore.modules.society.repository.SocietyRepository;
import com.resicore.modules.resident.entity.Resident;
import com.resicore.modules.building.entity.Building;
import com.resicore.modules.flat.entity.Flat;
import com.resicore.modules.staff.entity.Staff;
import com.resicore.modules.visitor.entity.Visitor;
import com.resicore.modules.complaint.entity.Complaint;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Collections;

@Service
@RequiredArgsConstructor
@Slf4j
public class SocietyAdminDashboardServiceImpl implements SocietyAdminDashboardService {

    private final MongoTemplate mongoTemplate;
    private final SocietyRepository societyRepository;

    @Override
    public AdminDashboardResponseDTO getDashboardData(String societyId) {
        
        Society society = societyRepository.findById(societyId)
                .orElseThrow(() -> new IllegalArgumentException("Society not found"));

        LocalDateTime startOfDay = LocalDate.now().atStartOfDay();
        LocalDateTime endOfDay = LocalDate.now().atTime(LocalTime.MAX);

        // Residents Count
        long residentsCount = countBySocietyId(Resident.class, societyId);
        
        // Buildings Count
        long buildingsCount = countBySocietyId(Building.class, societyId);
        
        // Flats Count
        long flatsCount = countBySocietyId(Flat.class, societyId);
        
        // Occupied/Vacant Flats (Assuming status field exists)
        Query occupiedQuery = new Query(Criteria.where("societyId").is(societyId).and("status").is("OCCUPIED"));
        long occupiedFlats = mongoTemplate.count(occupiedQuery, Flat.class);
        long vacantFlats = flatsCount - occupiedFlats;

        // Staff Count
        long staffCount = countBySocietyId(Staff.class, societyId);

        // Today's Visitors
        Query todaysVisitorsQuery = new Query(Criteria.where("societyId").is(societyId)
                .and("createdAt").gte(startOfDay).lte(endOfDay));
        long todaysVisitors = mongoTemplate.count(todaysVisitorsQuery, Visitor.class);

        // Pending Visitors
        Query pendingVisitorsQuery = new Query(Criteria.where("societyId").is(societyId).and("status").is("PENDING"));
        long pendingVisitors = mongoTemplate.count(pendingVisitorsQuery, Visitor.class);

        // Complaints
        Query openComplaintsQuery = new Query(Criteria.where("societyId").is(societyId).and("status").ne("RESOLVED"));
        long openComplaints = mongoTemplate.count(openComplaintsQuery, Complaint.class);
        
        Query resolvedComplaintsQuery = new Query(Criteria.where("societyId").is(societyId).and("status").is("RESOLVED"));
        long resolvedComplaints = mongoTemplate.count(resolvedComplaintsQuery, Complaint.class);

        // To do: Payments, Events, Amenities counts can be aggregated via MongoTemplate similarly
        double pendingMaintenanceAmount = 0.0;
        double collectedRevenue = 0.0;
        long todaysAttendance = 0;
        long upcomingEvents = 0;
        long activeAmenities = 0;

        return AdminDashboardResponseDTO.builder()
                .societyId(societyId)
                .societyName(society.getSocietyName())
                .todaysVisitors(todaysVisitors)
                .pendingVisitors(pendingVisitors)
                .residentsCount(residentsCount)
                .buildingsCount(buildingsCount)
                .flatsCount(flatsCount)
                .occupiedFlats(occupiedFlats)
                .vacantFlats(vacantFlats)
                .staffCount(staffCount)
                .todaysAttendance(todaysAttendance)
                .openComplaints(openComplaints)
                .resolvedComplaints(resolvedComplaints)
                .pendingMaintenanceAmount(pendingMaintenanceAmount)
                .collectedRevenue(collectedRevenue)
                .upcomingEvents(upcomingEvents)
                .activeAmenities(activeAmenities)
                .recentActivities(Collections.emptyList())
                .recentPayments(Collections.emptyList())
                .recentComplaints(Collections.emptyList())
                .recentVisitors(Collections.emptyList())
                .build();
    }

    private long countBySocietyId(Class<?> entityClass, String societyId) {
        Query query = new Query(Criteria.where("societyId").is(societyId));
        return mongoTemplate.count(query, entityClass);
    }
}
