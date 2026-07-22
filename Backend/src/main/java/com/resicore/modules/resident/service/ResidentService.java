package com.resicore.modules.resident.service;

import com.resicore.modules.resident.dto.ResidentProfileDTO;
import com.resicore.modules.resident.dto.ResidentRequestDTO;
import com.resicore.modules.resident.dto.ResidentResponseDTO;
import com.resicore.modules.resident.dto.ResidentSummaryDTO;
import com.resicore.modules.resident.enums.OwnerType;
import com.resicore.modules.resident.enums.ResidentStatus;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ResidentService {
    ResidentResponseDTO registerResident(ResidentRequestDTO requestDTO);
    ResidentResponseDTO approveResident(String id);
    ResidentResponseDTO rejectResident(String id);
    ResidentResponseDTO updateResident(String id, ResidentRequestDTO requestDTO);
    ResidentResponseDTO moveResidentOut(String id);
    
    ResidentResponseDTO getResidentById(String id);
    ResidentProfileDTO getResidentByUserId(String userId);
    List<ResidentSummaryDTO> getResidentsByFlat(String flatId);
    List<ResidentSummaryDTO> getResidentsByBuilding(String buildingId);
    List<ResidentSummaryDTO> getResidentsBySociety(String societyId);
    
    Page<ResidentSummaryDTO> searchResidents(String societyId, String buildingId, String flatId, String keyword, ResidentStatus status, OwnerType ownerType, int page, int size, String sortBy, String sortDir);
    
    void deleteResident(String id);
}
