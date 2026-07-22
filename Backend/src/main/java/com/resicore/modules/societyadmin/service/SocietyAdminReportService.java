package com.resicore.modules.societyadmin.service;

import com.resicore.modules.societyadmin.dto.ReportFilterRequestDTO;
import java.util.List;
import java.util.Map;

public interface SocietyAdminReportService {
    List<Map<String, Object>> generateResidentReport(String societyId, ReportFilterRequestDTO filter);
    List<Map<String, Object>> generateVisitorReport(String societyId, ReportFilterRequestDTO filter);
    List<Map<String, Object>> generateComplaintReport(String societyId, ReportFilterRequestDTO filter);
    List<Map<String, Object>> generateRevenueReport(String societyId, ReportFilterRequestDTO filter);
    List<Map<String, Object>> generateAttendanceReport(String societyId, ReportFilterRequestDTO filter);
    List<Map<String, Object>> generateOccupancyReport(String societyId, ReportFilterRequestDTO filter);
    
    byte[] exportToCsv(List<Map<String, Object>> reportData);
}
