package com.resicore.modules.amenity.service;

import com.resicore.modules.amenity.dto.AmenityRequestDTO;
import com.resicore.modules.amenity.dto.AmenityResponseDTO;
import com.resicore.modules.amenity.dto.AmenitySummaryDTO;
import com.resicore.modules.amenity.enums.AmenityCategory;
import com.resicore.modules.amenity.enums.AmenityStatus;
import org.springframework.data.domain.Page;

public interface AmenityService {
    AmenityResponseDTO createAmenity(AmenityRequestDTO requestDTO);
    AmenityResponseDTO updateAmenity(String id, AmenityRequestDTO requestDTO);
    AmenityResponseDTO deactivateAmenity(String id);
    void deleteAmenity(String id);
    
    AmenityResponseDTO getAmenityById(String id);
    
    Page<AmenitySummaryDTO> searchAmenities(String societyId, AmenityCategory category, AmenityStatus status, String keyword, int page, int size, String sortBy, String sortDir);
}
