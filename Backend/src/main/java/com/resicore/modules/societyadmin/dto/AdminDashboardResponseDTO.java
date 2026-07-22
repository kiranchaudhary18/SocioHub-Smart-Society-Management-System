package com.resicore.modules.societyadmin.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminDashboardResponseDTO {
    
    private String societyId;
    private String societyName;
    
    private long todaysVisitors;
    private long pendingVisitors;
    
    private long residentsCount;
    private long buildingsCount;
    private long flatsCount;
    private long occupiedFlats;
    private long vacantFlats;
    
    private long staffCount;
    private long todaysAttendance;
    
    private long openComplaints;
    private long resolvedComplaints;
    
    private double pendingMaintenanceAmount;
    private double collectedRevenue;
    
    private long upcomingEvents;
    private long activeAmenities;
    
    // Using Maps or Objects for lists to avoid tying strictly to module DTOs initially
    private List<Map<String, Object>> recentActivities;
    private List<Map<String, Object>> recentPayments;
    private List<Map<String, Object>> recentComplaints;
    private List<Map<String, Object>> recentVisitors;
}
