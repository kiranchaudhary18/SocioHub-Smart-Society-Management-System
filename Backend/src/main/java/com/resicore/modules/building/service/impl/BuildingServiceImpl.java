package com.resicore.modules.building.service.impl;

import com.resicore.common.enums.Role;
import com.resicore.exception.DuplicateResourceException;
import com.resicore.exception.ResourceNotFoundException;
import com.resicore.modules.building.dto.BuildingRequestDTO;
import com.resicore.modules.building.dto.BuildingResponseDTO;
import com.resicore.modules.building.dto.BuildingSummaryDTO;
import com.resicore.modules.building.entity.Building;
import com.resicore.modules.building.enums.BuildingStatus;
import com.resicore.modules.building.mapper.BuildingMapper;
import com.resicore.modules.building.repository.BuildingRepository;
import com.resicore.modules.building.service.BuildingService;
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

@Service
@RequiredArgsConstructor
@Slf4j
public class BuildingServiceImpl implements BuildingService {

    private final BuildingRepository buildingRepository;
    private final BuildingMapper buildingMapper;
    private final SocietyRepository societyRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public BuildingResponseDTO createBuilding(BuildingRequestDTO requestDTO) {
        log.info("Creating new building: {} for society: {}", requestDTO.getBuildingName(), requestDTO.getSocietyId());

        validateSecurityAccess(requestDTO.getSocietyId());
        
        if (!societyRepository.existsById(requestDTO.getSocietyId())) {
            throw new ResourceNotFoundException("Society not found with id: " + requestDTO.getSocietyId());
        }

        if (buildingRepository.existsBySocietyIdAndBuildingCodeAndIsDeletedFalse(requestDTO.getSocietyId(), requestDTO.getBuildingCode())) {
            throw new DuplicateResourceException("Building code must be unique within the society");
        }

        Building building = buildingMapper.toEntity(requestDTO);
        if (building.getStatus() == null) {
            building.setStatus(BuildingStatus.ACTIVE);
        }

        building = buildingRepository.save(building);
        return buildingMapper.toResponseDTO(building);
    }

    @Override
    @Transactional
    public BuildingResponseDTO updateBuilding(String id, BuildingRequestDTO requestDTO) {
        log.info("Updating building with ID: {}", id);

        Building building = buildingRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Building not found with id: " + id));

        validateSecurityAccess(building.getSocietyId());

        if (!building.getSocietyId().equals(requestDTO.getSocietyId())) {
            throw new IllegalArgumentException("Cannot change the society of an existing building");
        }

        if (!building.getBuildingCode().equals(requestDTO.getBuildingCode()) &&
            buildingRepository.existsBySocietyIdAndBuildingCodeAndIsDeletedFalse(requestDTO.getSocietyId(), requestDTO.getBuildingCode())) {
            throw new DuplicateResourceException("Building code must be unique within the society");
        }

        buildingMapper.updateEntityFromDto(requestDTO, building);
        building = buildingRepository.save(building);

        return buildingMapper.toResponseDTO(building);
    }

    @Override
    public BuildingResponseDTO getBuildingById(String id) {
        Building building = buildingRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Building not found with id: " + id));
        return buildingMapper.toResponseDTO(building);
    }

    @Override
    public List<BuildingSummaryDTO> getBuildingsBySociety(String societyId) {
        List<Building> buildings = buildingRepository.findBySocietyIdAndIsDeletedFalse(societyId);
        return buildingMapper.toSummaryDTOs(buildings);
    }

    @Override
    @Transactional
    public void deleteBuilding(String id) {
        log.info("Soft deleting building with ID: {}", id);
        
        Building building = buildingRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Building not found with id: " + id));
                
        validateSecurityAccess(building.getSocietyId());

        building.setIsDeleted(true);
        buildingRepository.save(building);
    }

    @Override
    public Page<BuildingSummaryDTO> searchBuildings(String societyId, String keyword, BuildingStatus status, int page, int size, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Page<Building> buildingsPage = buildingRepository.searchBuildings(societyId, keyword, status, pageable);
        return buildingsPage.map(buildingMapper::toSummaryDTO);
    }

    private void validateSecurityAccess(String targetSocietyId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !auth.getName().equals("anonymousUser")) {
            String email = auth.getName();
            User user = userRepository.findByEmail(email).orElse(null);
            
            if (user != null && user.getRole() == Role.SOCIETY_ADMIN) {
                if (user.getSocietyId() == null || !user.getSocietyId().equals(targetSocietyId)) {
                    throw new AccessDeniedException("SOCIETY_ADMIN can only manage buildings belonging to their own society.");
                }
            }
        }
    }
}
