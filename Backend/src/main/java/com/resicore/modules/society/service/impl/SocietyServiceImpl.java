package com.resicore.modules.society.service.impl;

import com.resicore.exception.DuplicateResourceException;
import com.resicore.exception.ResourceNotFoundException;
import com.resicore.modules.society.dto.SocietyRequestDTO;
import com.resicore.modules.society.dto.SocietyResponseDTO;
import com.resicore.modules.society.dto.SocietySummaryDTO;
import com.resicore.modules.society.entity.Society;
import com.resicore.modules.society.enums.SocietyStatus;
import com.resicore.modules.society.mapper.SocietyMapper;
import com.resicore.modules.society.repository.SocietyRepository;
import com.resicore.modules.society.service.SocietyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class SocietyServiceImpl implements SocietyService {

    private final SocietyRepository societyRepository;
    private final SocietyMapper societyMapper;

    @Override
    @Transactional
    public SocietyResponseDTO createSociety(SocietyRequestDTO requestDTO) {
        log.info("Creating new society: {}", requestDTO.getSocietyName());
        
        validateUniqueConstraints(requestDTO, null);

        Society society = societyMapper.toEntity(requestDTO);
        
        // Generate a unique society code (e.g., SOC-1234)
        society.setSocietyCode("SOC-" + UUID.randomUUID().toString().substring(0, 6).toUpperCase());
        society.setStatus(SocietyStatus.UNDER_SETUP);

        society = societyRepository.save(society);
        return societyMapper.toResponseDTO(society);
    }

    @Override
    @Transactional
    public SocietyResponseDTO updateSociety(String id, SocietyRequestDTO requestDTO) {
        log.info("Updating society with ID: {}", id);
        
        Society society = societyRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Society not found with id: " + id));

        validateUniqueConstraints(requestDTO, id);

        societyMapper.updateEntityFromDto(requestDTO, society);
        society = societyRepository.save(society);
        
        return societyMapper.toResponseDTO(society);
    }

    @Override
    public SocietyResponseDTO getSocietyById(String id) {
        Society society = societyRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Society not found with id: " + id));
        return societyMapper.toResponseDTO(society);
    }

    @Override
    public SocietyResponseDTO getSocietyByCode(String societyCode) {
        Society society = societyRepository.findBySocietyCodeAndIsDeletedFalse(societyCode)
                .orElseThrow(() -> new ResourceNotFoundException("Society not found with code: " + societyCode));
        return societyMapper.toResponseDTO(society);
    }

    @Override
    @Transactional
    public void deleteSociety(String id) {
        log.info("Soft deleting society with ID: {}", id);
        Society society = societyRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Society not found with id: " + id));
        
        society.setIsDeleted(true);
        societyRepository.save(society);
    }

    @Override
    public Page<SocietySummaryDTO> searchSocieties(String keyword, SocietyStatus status, String city, String state, int page, int size, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Page<Society> societiesPage = societyRepository.searchSocieties(keyword, status, city, state, pageable);
        return societiesPage.map(societyMapper::toSummaryDTO);
    }

    private void validateUniqueConstraints(SocietyRequestDTO requestDTO, String excludeId) {
        if (excludeId == null) {
            if (societyRepository.existsByRegistrationNumberAndIsDeletedFalse(requestDTO.getRegistrationNumber())) {
                throw new DuplicateResourceException("Society with this registration number already exists");
            }
            if (societyRepository.existsByEmailAndIsDeletedFalse(requestDTO.getEmail())) {
                throw new DuplicateResourceException("Society with this email already exists");
            }
        } else {
            societyRepository.findByRegistrationNumberAndIsDeletedFalse(requestDTO.getRegistrationNumber())
                    .ifPresent(s -> {
                        if (!s.getId().equals(excludeId)) {
                            throw new DuplicateResourceException("Society with this registration number already exists");
                        }
                    });
                    
            societyRepository.findByEmailAndIsDeletedFalse(requestDTO.getEmail())
                    .ifPresent(s -> {
                        if (!s.getId().equals(excludeId)) {
                            throw new DuplicateResourceException("Society with this email already exists");
                        }
                    });
        }
    }
}
