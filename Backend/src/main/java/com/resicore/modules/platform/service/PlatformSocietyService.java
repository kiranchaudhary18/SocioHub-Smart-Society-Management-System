package com.resicore.modules.platform.service;

import com.resicore.modules.society.dto.SocietyResponseDTO;
import org.springframework.data.domain.Page;

public interface PlatformSocietyService {
    SocietyResponseDTO approveSociety(String id);
    SocietyResponseDTO rejectSociety(String id);
    SocietyResponseDTO suspendSociety(String id);
    SocietyResponseDTO activateSociety(String id);
    SocietyResponseDTO deactivateSociety(String id);
    
    SocietyResponseDTO getSocietyDetails(String id);
    Object getSocietyStatistics(String id);
    
    Page<SocietyResponseDTO> searchSocieties(String status, String keyword, int page, int size, String sortBy, String sortDir);
}
