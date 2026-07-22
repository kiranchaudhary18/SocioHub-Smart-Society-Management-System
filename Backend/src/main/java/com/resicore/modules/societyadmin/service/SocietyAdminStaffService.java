package com.resicore.modules.societyadmin.service;

import com.resicore.modules.staff.entity.Staff;

public interface SocietyAdminStaffService {
    Staff assignStaff(String staffId, String societyId, String assignmentDetails);
    Staff deactivateStaff(String staffId);
    Staff transferStaff(String staffId, String newSocietyId);
    void resetStaffPassword(String staffId, String newPassword);
    Object getStaffStatistics(String societyId);
}
