package com.resicore.modules.flat.service.impl;

import com.resicore.common.enums.Role;
import com.resicore.exception.DuplicateResourceException;
import com.resicore.exception.ResourceNotFoundException;
import com.resicore.modules.building.repository.BuildingRepository;
import com.resicore.modules.flat.dto.FlatRequestDTO;
import com.resicore.modules.flat.dto.FlatResponseDTO;
import com.resicore.modules.flat.dto.FlatSummaryDTO;
import com.resicore.modules.flat.entity.Flat;
import com.resicore.modules.flat.enums.FlatStatus;
import com.resicore.modules.flat.enums.FlatType;
import com.resicore.modules.flat.mapper.FlatMapper;
import com.resicore.modules.flat.repository.FlatRepository;
import com.resicore.modules.flat.service.FlatService;
import com.resicore.modules.society.repository.SocietyRepository;
import com.resicore.modules.user.entity.User;
import com.resicore.modules.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Slf4j
public class FlatServiceImpl implements FlatService {

    private final FlatRepository flatRepository;
    private final FlatMapper flatMapper;
    private final SocietyRepository societyRepository;
    private final BuildingRepository buildingRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public FlatResponseDTO createFlat(FlatRequestDTO requestDTO) {
        log.info("Creating new flat: {} for building: {}", requestDTO.getFlatNumber(), requestDTO.getBuildingId());

        validateSecurityAccessForSociety(requestDTO.getSocietyId());

        if (!societyRepository.existsById(requestDTO.getSocietyId())) {
            throw new ResourceNotFoundException("Society not found with id: " + requestDTO.getSocietyId());
        }

        if (!buildingRepository.existsById(requestDTO.getBuildingId())) {
            throw new ResourceNotFoundException("Building not found with id: " + requestDTO.getBuildingId());
        }

        if (flatRepository.existsByBuildingIdAndFlatNumberAndIsDeletedFalse(requestDTO.getBuildingId(), requestDTO.getFlatNumber())) {
            throw new DuplicateResourceException("Flat number must be unique within the building");
        }

        Flat flat = flatMapper.toEntity(requestDTO);
        if (flat.getStatus() == null) {
            flat.setStatus(FlatStatus.AVAILABLE);
        }

        flat = flatRepository.save(flat);
        return flatMapper.toResponseDTO(flat);
    }

    @Override
    @Transactional
    public FlatResponseDTO updateFlat(String id, FlatRequestDTO requestDTO) {
        log.info("Updating flat with ID: {}", id);

        Flat flat = flatRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Flat not found with id: " + id));

        validateSecurityAccessForSociety(flat.getSocietyId());

        if (!flat.getSocietyId().equals(requestDTO.getSocietyId()) || !flat.getBuildingId().equals(requestDTO.getBuildingId())) {
            throw new IllegalArgumentException("Cannot change the society or building of an existing flat");
        }

        if (!flat.getFlatNumber().equals(requestDTO.getFlatNumber()) &&
            flatRepository.existsByBuildingIdAndFlatNumberAndIsDeletedFalse(requestDTO.getBuildingId(), requestDTO.getFlatNumber())) {
            throw new DuplicateResourceException("Flat number must be unique within the building");
        }

        flatMapper.updateEntityFromDto(requestDTO, flat);
        flat = flatRepository.save(flat);

        return flatMapper.toResponseDTO(flat);
    }

    @Override
    public FlatResponseDTO getFlatById(String id) {
        Flat flat = flatRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Flat not found with id: " + id));
        
        validateSecurityAccessForViewingFlat(flat);
        
        return flatMapper.toResponseDTO(flat);
    }

    @Override
    public List<FlatSummaryDTO> getFlatsByBuilding(String buildingId) {
        List<Flat> flats = flatRepository.findByBuildingIdAndIsDeletedFalse(buildingId);
        return flatMapper.toSummaryDTOs(flats);
    }

    @Override
    public List<FlatSummaryDTO> getFlatsBySociety(String societyId) {
        List<Flat> flats = flatRepository.findBySocietyIdAndIsDeletedFalse(societyId);
        return flatMapper.toSummaryDTOs(flats);
    }

    @Override
    @Transactional
    public void deleteFlat(String id) {
        log.info("Soft deleting flat with ID: {}", id);
        
        Flat flat = flatRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Flat not found with id: " + id));
                
        validateSecurityAccessForSociety(flat.getSocietyId());

        flat.setIsDeleted(true);
        flatRepository.save(flat);
    }

    @Override
    public Page<FlatSummaryDTO> searchFlats(String societyId, String buildingId, String keyword, FlatStatus status, FlatType flatType, Boolean isOccupied, int page, int size, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Page<Flat> flatsPage = flatRepository.searchFlats(societyId, buildingId, keyword, status, flatType, isOccupied, pageable);
        return flatsPage.map(flatMapper::toSummaryDTO);
    }

    @Override
    @Transactional
    public FlatResponseDTO assignResident(String id, String residentId) {
        log.info("Assigning resident {} to flat {}", residentId, id);
        
        Flat flat = flatRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Flat not found with id: " + id));

        validateSecurityAccessForSociety(flat.getSocietyId());
        
        // Since resident must also be a valid user, verify existence here if required, though resident module handles details.
        if (!userRepository.existsById(residentId)) {
            throw new ResourceNotFoundException("Resident (User) not found with id: " + residentId);
        }
        
        // Ensure another flat is not actively holding this resident as their PRIMARY (Optional specific business rule)
        String flatId = flat.getId();
        flatRepository.findByCurrentResidentIdAndIsDeletedFalse(residentId).ifPresent(existingFlat -> {
            if (!existingFlat.getId().equals(flatId)) {
                 throw new DuplicateResourceException("This resident is already assigned to another flat as primary resident");
            }
        });

        flat.setCurrentResidentId(residentId);
        flat.setIsOccupied(true);
        flat.setStatus(FlatStatus.OCCUPIED);
        
        flat = flatRepository.save(flat);
        return flatMapper.toResponseDTO(flat);
    }

    @Override
    @Transactional
    public FlatResponseDTO removeResident(String id) {
        log.info("Removing resident from flat {}", id);
        
        Flat flat = flatRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Flat not found with id: " + id));

        validateSecurityAccessForSociety(flat.getSocietyId());

        flat.setCurrentResidentId(null);
        flat.setIsOccupied(false);
        flat.setStatus(FlatStatus.AVAILABLE);
        
        flat = flatRepository.save(flat);
        return flatMapper.toResponseDTO(flat);
    }

    private void validateSecurityAccessForSociety(String targetSocietyId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !auth.getName().equals("anonymousUser")) {
            String email = auth.getName();
            User user = userRepository.findByEmail(email).orElse(null);
            
            if (user != null && user.getRole() == Role.SOCIETY_ADMIN) {
                if (user.getSocietyId() == null || !user.getSocietyId().equals(targetSocietyId)) {
                    throw new AccessDeniedException("SOCIETY_ADMIN can only manage resources belonging to their own society.");
                }
            }
        }
    }
    
    private void validateSecurityAccessForViewingFlat(Flat flat) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !auth.getName().equals("anonymousUser")) {
            String email = auth.getName();
            User user = userRepository.findByEmail(email).orElse(null);
            
            if (user != null) {
                if (user.getRole() == Role.SOCIETY_ADMIN && !Objects.equals(user.getSocietyId(), flat.getSocietyId())) {
                    throw new AccessDeniedException("SOCIETY_ADMIN can only view flats in their own society.");
                } else if (user.getRole() == Role.RESIDENT && !Objects.equals(user.getId(), flat.getCurrentResidentId())) {
                    throw new AccessDeniedException("RESIDENT can only view their own assigned flat.");
                }
            }
        }
    }
}
