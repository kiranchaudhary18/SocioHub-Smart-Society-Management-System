package com.resicore.modules.societyadmin.service;

import com.resicore.modules.societyadmin.dto.AdminDashboardResponseDTO;

public interface SocietyAdminDashboardService {
    AdminDashboardResponseDTO getDashboardData(String societyId);
}
