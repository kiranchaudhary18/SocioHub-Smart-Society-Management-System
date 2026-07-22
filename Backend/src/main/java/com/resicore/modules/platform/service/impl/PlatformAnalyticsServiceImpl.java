package com.resicore.modules.platform.service.impl;

import com.resicore.common.enums.Role;
import com.resicore.modules.platform.dto.PlatformAnalyticsResponseDTO;
import com.resicore.modules.platform.enums.AuditLogAction;
import com.resicore.modules.platform.service.PlatformAnalyticsService;
import com.resicore.modules.platform.service.PlatformAuditService;
import com.resicore.modules.user.entity.User;
import com.resicore.modules.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
@RequiredArgsConstructor
@Slf4j
public class PlatformAnalyticsServiceImpl implements PlatformAnalyticsService {

    private final UserRepository userRepository;
    private final PlatformAuditService auditService;

    @Override
    public PlatformAnalyticsResponseDTO getPlatformAnalytics() {
        validateSuperAdmin();
        
        // This is a stub for the heavy analytical aggregation. 
        // In reality, this would use MongoTemplate aggregation pipelines across multiple collections.
        
        PlatformAnalyticsResponseDTO analytics = PlatformAnalyticsResponseDTO.builder()
                .residentGrowth(new HashMap<>())
                .revenueTrend(new HashMap<>())
                .complaintTrend(new HashMap<>())
                .visitorTrend(new HashMap<>())
                .occupancyRate(0.0)
                .collectionRate(0.0)
                .monthlyStatistics(new Object())
                .yearlyStatistics(new Object())
                .societyComparison(new Object())
                .build();
                
        auditService.logAction(AuditLogAction.ANALYTICS_GENERATED, null, "Generated platform analytics report");
        return analytics;
    }

    private void validateSuperAdmin() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !auth.getName().equals("anonymousUser")) {
            User user = userRepository.findByEmail(auth.getName())
                    .orElseThrow(() -> new AccessDeniedException("User not found"));
            if (user.getRole() != Role.SUPER_ADMIN) {
                throw new AccessDeniedException("Only SUPER_ADMIN can view platform analytics.");
            }
            return;
        }
        throw new AccessDeniedException("Unauthorized");
    }
}
