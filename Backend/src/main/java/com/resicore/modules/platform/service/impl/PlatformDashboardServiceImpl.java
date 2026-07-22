package com.resicore.modules.platform.service.impl;

import com.resicore.common.enums.Role;
import com.resicore.modules.platform.dto.PlatformDashboardResponseDTO;
import com.resicore.modules.platform.service.PlatformDashboardService;
import com.resicore.modules.society.enums.SocietyStatus;
import com.resicore.modules.society.repository.SocietyRepository;
import com.resicore.modules.user.entity.User;
import com.resicore.modules.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class PlatformDashboardServiceImpl implements PlatformDashboardService {

    private final SocietyRepository societyRepository;
    private final UserRepository userRepository;
    
    // In a full implementation, we would inject:
    // BuildingRepository, FlatRepository, ResidentRepository, StaffRepository, 
    // ComplaintRepository, PaymentRepository, EventRepository, etc.
    // ComplaintRepository, PaymentRepository, EventRepository, etc.
    @Override
    public PlatformDashboardResponseDTO getDashboardData() {
        validateSuperAdmin();
        
        long totalSocieties = societyRepository.count();
        long activeSocieties = societyRepository.countByStatus(SocietyStatus.ACTIVE);
        long pendingSocieties = societyRepository.countByStatus(SocietyStatus.UNDER_SETUP);
        long inactiveSocieties = totalSocieties - activeSocieties - pendingSocieties;
        
        // These are stubs. We will fetch these from actual repos when integrating deeply.
        long totalBuildings = 0;
        long totalFlats = 0;
        long totalResidents = 0;
        long totalStaff = 0;
        long totalVisitorsToday = 0;
        long openComplaints = 0;
        long resolvedComplaints = 0;
        double monthlyRevenue = 0.0;
        double totalMaintenanceCollection = 0.0;
        long upcomingEventsCount = 0;
        long unreadPlatformNotifications = 0;
        
        return PlatformDashboardResponseDTO.builder()
                .totalSocieties(totalSocieties)
                .activeSocieties(activeSocieties)
                .inactiveSocieties(inactiveSocieties)
                .pendingSocietyApprovals(pendingSocieties)
                .totalBuildings(totalBuildings)
                .totalFlats(totalFlats)
                .totalResidents(totalResidents)
                .totalStaff(totalStaff)
                .totalVisitorsToday(totalVisitorsToday)
                .openComplaints(openComplaints)
                .resolvedComplaints(resolvedComplaints)
                .monthlyRevenue(monthlyRevenue)
                .totalMaintenanceCollection(totalMaintenanceCollection)
                .upcomingEventsCount(upcomingEventsCount)
                .unreadPlatformNotifications(unreadPlatformNotifications)
                .recentActivities(null)
                .build();
    }
    
    private void validateSuperAdmin() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !auth.getName().equals("anonymousUser")) {
            User user = userRepository.findByEmail(auth.getName())
                    .orElseThrow(() -> new AccessDeniedException("User not found"));
            if (user.getRole() != Role.SUPER_ADMIN) {
                throw new AccessDeniedException("Only SUPER_ADMIN can view platform dashboard.");
            }
            return;
        }
        throw new AccessDeniedException("Unauthorized");
    }
}
