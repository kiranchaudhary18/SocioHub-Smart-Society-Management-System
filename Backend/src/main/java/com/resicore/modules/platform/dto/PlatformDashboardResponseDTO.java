package com.resicore.modules.platform.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlatformDashboardResponseDTO {
    private long totalSocieties;
    private long activeSocieties;
    private long inactiveSocieties;
    private long pendingSocietyApprovals;
    
    private long totalBuildings;
    private long totalFlats;
    
    private long totalResidents;
    private long totalStaff;
    
    private long totalVisitorsToday;
    
    private long openComplaints;
    private long resolvedComplaints;
    
    private double monthlyRevenue;
    private double totalMaintenanceCollection;
    
    private long upcomingEventsCount;
    
    private long unreadPlatformNotifications;
    
    private Object recentActivities; // Can hold a list of recent audit logs
}
