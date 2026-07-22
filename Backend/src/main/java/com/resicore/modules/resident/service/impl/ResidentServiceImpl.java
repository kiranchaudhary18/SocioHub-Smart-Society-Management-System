package com.resicore.modules.resident.service.impl;

import com.resicore.common.enums.Role;
import com.resicore.exception.DuplicateResourceException;
import com.resicore.exception.ResourceNotFoundException;
import com.resicore.modules.building.repository.BuildingRepository;
import com.resicore.modules.flat.entity.Flat;
import com.resicore.modules.flat.enums.FlatStatus;
import com.resicore.modules.flat.repository.FlatRepository;
import com.resicore.modules.resident.dto.ResidentProfileDTO;
import com.resicore.modules.resident.dto.ResidentRequestDTO;
import com.resicore.modules.resident.dto.ResidentResponseDTO;
import com.resicore.modules.resident.dto.ResidentSummaryDTO;
import com.resicore.modules.resident.entity.Resident;
import com.resicore.modules.resident.enums.OwnerType;
import com.resicore.modules.resident.enums.ResidentStatus;
import com.resicore.modules.resident.mapper.ResidentMapper;
import com.resicore.modules.resident.repository.ResidentRepository;
import com.resicore.modules.resident.service.ResidentService;
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
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class ResidentServiceImpl implements ResidentService {

    private final ResidentRepository residentRepository;
    private final ResidentMapper residentMapper;
    private final UserRepository userRepository;
    private final SocietyRepository societyRepository;
    private final BuildingRepository buildingRepository;
    private final FlatRepository flatRepository;

    @Override
    @Transactional
    public ResidentResponseDTO registerResident(ResidentRequestDTO requestDTO) {
        log.info("Registering new resident: {} for flat: {}", requestDTO.getEmail(), requestDTO.getFlatId());
        
        validateSecurityAccessForSociety(requestDTO.getSocietyId());
        validateRelationalDependencies(requestDTO);

        if (residentRepository.existsByUserIdAndIsDeletedFalse(requestDTO.getUserId())) {
             throw new DuplicateResourceException("This user is already registered as a resident elsewhere");
        }

        if (Boolean.TRUE.equals(requestDTO.getIsPrimaryResident()) && 
            residentRepository.existsByFlatIdAndIsPrimaryResidentTrueAndIsDeletedFalse(requestDTO.getFlatId())) {
            throw new DuplicateResourceException("This flat already has a primary resident assigned");
        }

        Resident resident = residentMapper.toEntity(requestDTO);
        
        // Generate code
        resident.setResidentCode(generateResidentCode());
        
        if (resident.getResidentStatus() == null) {
            resident.setResidentStatus(ResidentStatus.PENDING_APPROVAL);
        }
        
        // If they are created directly as ACTIVE and Primary, sync the Flat Occupancy
        if (resident.getResidentStatus() == ResidentStatus.ACTIVE && Boolean.TRUE.equals(resident.getIsPrimaryResident())) {
            syncFlatOccupancy(resident.getFlatId(), resident.getUserId(), true);
        }

        resident = residentRepository.save(resident);
        return residentMapper.toResponseDTO(resident);
    }

    @Override
    @Transactional
    public ResidentResponseDTO approveResident(String id) {
        log.info("Approving resident ID: {}", id);
        
        Resident resident = residentRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resident not found with id: " + id));

        validateSecurityAccessForSociety(resident.getSocietyId());

        resident.setResidentStatus(ResidentStatus.ACTIVE);
        
        if (Boolean.TRUE.equals(resident.getIsPrimaryResident())) {
            syncFlatOccupancy(resident.getFlatId(), resident.getUserId(), true);
        }
        
        resident = residentRepository.save(resident);
        return residentMapper.toResponseDTO(resident);
    }

    @Override
    @Transactional
    public ResidentResponseDTO rejectResident(String id) {
        log.info("Rejecting resident ID: {}", id);
        
        Resident resident = residentRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resident not found with id: " + id));

        validateSecurityAccessForSociety(resident.getSocietyId());

        resident.setResidentStatus(ResidentStatus.BLOCKED);
        
        if (Boolean.TRUE.equals(resident.getIsPrimaryResident())) {
            syncFlatOccupancy(resident.getFlatId(), null, false);
        }
        
        resident = residentRepository.save(resident);
        return residentMapper.toResponseDTO(resident);
    }

    @Override
    @Transactional
    public ResidentResponseDTO updateResident(String id, ResidentRequestDTO requestDTO) {
        log.info("Updating resident ID: {}", id);

        Resident resident = residentRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resident not found with id: " + id));

        validateSecurityAccessForProfile(resident);

        if (!resident.getSocietyId().equals(requestDTO.getSocietyId()) || !resident.getBuildingId().equals(requestDTO.getBuildingId()) || !resident.getFlatId().equals(requestDTO.getFlatId())) {
            throw new IllegalArgumentException("Cannot change the location mapping (Society, Building, Flat) of an existing resident");
        }

        // Validate uniqueness of sensitive keys if changed
        if (requestDTO.getAadhaarNumber() != null && !requestDTO.getAadhaarNumber().equals(resident.getAadhaarNumber())) {
            if (residentRepository.existsByAadhaarNumberAndIsDeletedFalse(requestDTO.getAadhaarNumber())) {
                throw new DuplicateResourceException("Aadhaar Number is already in use");
            }
        }
        if (requestDTO.getPanNumber() != null && !requestDTO.getPanNumber().equals(resident.getPanNumber())) {
             if (residentRepository.existsByPanNumberAndIsDeletedFalse(requestDTO.getPanNumber())) {
                throw new DuplicateResourceException("PAN Number is already in use");
            }
        }

        residentMapper.updateEntityFromDto(requestDTO, resident);
        resident = residentRepository.save(resident);

        return residentMapper.toResponseDTO(resident);
    }

    @Override
    @Transactional
    public ResidentResponseDTO moveResidentOut(String id) {
        log.info("Moving out resident ID: {}", id);
        
        Resident resident = residentRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resident not found with id: " + id));

        validateSecurityAccessForSociety(resident.getSocietyId());

        resident.setResidentStatus(ResidentStatus.MOVED_OUT);
        
        if (Boolean.TRUE.equals(resident.getIsPrimaryResident())) {
            syncFlatOccupancy(resident.getFlatId(), null, false);
        }
        
        resident = residentRepository.save(resident);
        return residentMapper.toResponseDTO(resident);
    }

    @Override
    public ResidentResponseDTO getResidentById(String id) {
        Resident resident = residentRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resident not found with id: " + id));
        validateSecurityAccessForProfile(resident);
        return residentMapper.toResponseDTO(resident);
    }

    @Override
    public ResidentProfileDTO getResidentByUserId(String userId) {
        Resident resident = residentRepository.findByUserIdAndIsDeletedFalse(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Resident profile not found for user: " + userId));
        validateSecurityAccessForProfile(resident);
        return residentMapper.toProfileDTO(resident);
    }

    @Override
    public List<ResidentSummaryDTO> getResidentsByFlat(String flatId) {
        return residentMapper.toSummaryDTOs(residentRepository.findByFlatIdAndIsDeletedFalse(flatId));
    }

    @Override
    public List<ResidentSummaryDTO> getResidentsByBuilding(String buildingId) {
        return residentMapper.toSummaryDTOs(residentRepository.findByBuildingIdAndIsDeletedFalse(buildingId));
    }

    @Override
    public List<ResidentSummaryDTO> getResidentsBySociety(String societyId) {
        return residentMapper.toSummaryDTOs(residentRepository.findBySocietyIdAndIsDeletedFalse(societyId));
    }

    @Override
    public Page<ResidentSummaryDTO> searchResidents(String societyId, String buildingId, String flatId, String keyword, ResidentStatus status, OwnerType ownerType, int page, int size, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Page<Resident> residentsPage = residentRepository.searchResidents(societyId, buildingId, flatId, keyword, status, ownerType, pageable);
        return residentsPage.map(residentMapper::toSummaryDTO);
    }

    @Override
    @Transactional
    public void deleteResident(String id) {
        log.info("Soft deleting resident ID: {}", id);
        Resident resident = residentRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resident not found with id: " + id));
                
        validateSecurityAccessForSociety(resident.getSocietyId());

        resident.setIsDeleted(true);
        if (Boolean.TRUE.equals(resident.getIsPrimaryResident())) {
            syncFlatOccupancy(resident.getFlatId(), null, false);
        }
        residentRepository.save(resident);
    }
    
    // --- Helper Methods ---

    private String generateResidentCode() {
        return "RES-" + UUID.randomUUID().toString().substring(0, 6).toUpperCase();
    }
    
    private void syncFlatOccupancy(String flatId, String residentId, boolean isOccupied) {
        Flat flat = flatRepository.findByIdAndIsDeletedFalse(flatId)
            .orElseThrow(() -> new ResourceNotFoundException("Flat not found to sync occupancy"));
            
        flat.setIsOccupied(isOccupied);
        flat.setCurrentResidentId(residentId);
        flat.setStatus(isOccupied ? FlatStatus.OCCUPIED : FlatStatus.AVAILABLE);
        
        flatRepository.save(flat);
    }

    private void validateRelationalDependencies(ResidentRequestDTO requestDTO) {
        if (!userRepository.existsById(requestDTO.getUserId())) {
            throw new ResourceNotFoundException("User not found with id: " + requestDTO.getUserId());
        }
        if (!societyRepository.existsById(requestDTO.getSocietyId())) {
            throw new ResourceNotFoundException("Society not found with id: " + requestDTO.getSocietyId());
        }
        if (!buildingRepository.existsById(requestDTO.getBuildingId())) {
            throw new ResourceNotFoundException("Building not found with id: " + requestDTO.getBuildingId());
        }
        if (!flatRepository.existsById(requestDTO.getFlatId())) {
            throw new ResourceNotFoundException("Flat not found with id: " + requestDTO.getFlatId());
        }
        if (requestDTO.getAadhaarNumber() != null && residentRepository.existsByAadhaarNumberAndIsDeletedFalse(requestDTO.getAadhaarNumber())) {
            throw new DuplicateResourceException("Aadhaar Number is already in use");
        }
        if (requestDTO.getPanNumber() != null && residentRepository.existsByPanNumberAndIsDeletedFalse(requestDTO.getPanNumber())) {
            throw new DuplicateResourceException("PAN Number is already in use");
        }
    }

    private void validateSecurityAccessForSociety(String targetSocietyId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !auth.getName().equals("anonymousUser")) {
            String email = auth.getName();
            User user = userRepository.findByEmail(email).orElse(null);
            
            if (user != null && user.getRole() == Role.SOCIETY_ADMIN) {
                if (user.getSocietyId() == null || !user.getSocietyId().equals(targetSocietyId)) {
                    throw new AccessDeniedException("SOCIETY_ADMIN can only manage residents belonging to their own society.");
                }
            }
        }
    }
    
    private void validateSecurityAccessForProfile(Resident resident) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !auth.getName().equals("anonymousUser")) {
            String email = auth.getName();
            User user = userRepository.findByEmail(email).orElse(null);
            
            if (user != null) {
                if (user.getRole() == Role.SOCIETY_ADMIN && !user.getSocietyId().equals(resident.getSocietyId())) {
                    throw new AccessDeniedException("SOCIETY_ADMIN can only access profiles in their own society.");
                }
                if (user.getRole() == Role.RESIDENT && !user.getId().equals(resident.getUserId())) {
                    throw new AccessDeniedException("RESIDENT can only access their own profile.");
                }
            }
        }
    }
}
