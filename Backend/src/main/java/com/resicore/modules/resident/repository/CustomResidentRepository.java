package com.resicore.modules.resident.repository;

import com.resicore.modules.resident.entity.Resident;
import com.resicore.modules.resident.enums.OwnerType;
import com.resicore.modules.resident.enums.ResidentStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CustomResidentRepository {
    Page<Resident> searchResidents(String societyId, String buildingId, String flatId, String keyword, ResidentStatus status, OwnerType ownerType, Pageable pageable);
}
