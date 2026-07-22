package com.resicore.modules.society.service;

import com.resicore.modules.society.dto.SocietyRequestDTO;
import com.resicore.modules.society.dto.SocietyResponseDTO;
import com.resicore.modules.society.dto.SocietySummaryDTO;
import com.resicore.modules.society.enums.SocietyStatus;
import org.springframework.data.domain.Page;

public interface SocietyService {
    SocietyResponseDTO createSociety(SocietyRequestDTO requestDTO);
    SocietyResponseDTO updateSociety(String id, SocietyRequestDTO requestDTO);
    SocietyResponseDTO getSocietyById(String id);
    SocietyResponseDTO getSocietyByCode(String societyCode);
    void deleteSociety(String id);
    Page<SocietySummaryDTO> searchSocieties(String keyword, SocietyStatus status, String city, String state, int page, int size, String sortBy, String sortDir);
}
