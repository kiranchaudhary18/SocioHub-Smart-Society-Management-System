package com.resicore.modules.platform.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlatformAnalyticsResponseDTO {
    private Map<String, Long> residentGrowth; // e.g., "2026-01": 50, "2026-02": 100
    private Map<String, Double> revenueTrend;
    private Map<String, Long> complaintTrend;
    private Map<String, Long> visitorTrend;
    
    private Double occupancyRate; // %
    private Double collectionRate; // %
    
    private Object monthlyStatistics;
    private Object yearlyStatistics;
    private Object societyComparison;
}
