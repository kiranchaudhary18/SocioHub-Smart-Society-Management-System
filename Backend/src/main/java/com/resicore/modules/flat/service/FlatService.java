package com.resicore.modules.flat.service;

import com.resicore.modules.flat.dto.FlatRequestDTO;
import com.resicore.modules.flat.dto.FlatResponseDTO;
import com.resicore.modules.flat.dto.FlatSummaryDTO;
import com.resicore.modules.flat.enums.FlatStatus;
import com.resicore.modules.flat.enums.FlatType;
import org.springframework.data.domain.Page;

import java.util.List;

public interface FlatService {
    FlatResponseDTO createFlat(FlatRequestDTO requestDTO);
    FlatResponseDTO updateFlat(String id, FlatRequestDTO requestDTO);
    FlatResponseDTO getFlatById(String id);
    List<FlatSummaryDTO> getFlatsByBuilding(String buildingId);
    List<FlatSummaryDTO> getFlatsBySociety(String societyId);
    void deleteFlat(String id);
    Page<FlatSummaryDTO> searchFlats(String societyId, String buildingId, String keyword, FlatStatus status, FlatType flatType, Boolean isOccupied, int page, int size, String sortBy, String sortDir);
    
    FlatResponseDTO assignResident(String id, String residentId);
    FlatResponseDTO removeResident(String id);
}
