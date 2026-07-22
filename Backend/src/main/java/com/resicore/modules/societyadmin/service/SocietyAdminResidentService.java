package com.resicore.modules.societyadmin.service;

import com.resicore.modules.resident.entity.Resident;
import com.resicore.modules.societyadmin.dto.ResidentApprovalRequestDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SocietyAdminResidentService {
    Page<Resident> getPendingResidents(String societyId, Pageable pageable);
    Resident approveResident(ResidentApprovalRequestDTO request);
    Resident rejectResident(ResidentApprovalRequestDTO request);
    Resident suspendResident(ResidentApprovalRequestDTO request);
    Resident activateResident(ResidentApprovalRequestDTO request);
    void bulkApprove(ResidentApprovalRequestDTO request);
    void bulkReject(ResidentApprovalRequestDTO request);
}
