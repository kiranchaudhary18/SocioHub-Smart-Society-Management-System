package com.resicore.modules.amenity.service.impl;

import com.resicore.common.enums.Role;
import com.resicore.exception.ResourceNotFoundException;
import com.resicore.modules.amenity.dto.AmenityRequestDTO;
import com.resicore.modules.amenity.dto.AmenityResponseDTO;
import com.resicore.modules.amenity.dto.AmenitySummaryDTO;
import com.resicore.modules.amenity.entity.Amenity;
import com.resicore.modules.amenity.enums.AmenityCategory;
import com.resicore.modules.amenity.enums.AmenityStatus;
import com.resicore.modules.amenity.mapper.AmenityMapper;
import com.resicore.modules.amenity.repository.AmenityRepository;
import com.resicore.modules.amenity.service.AmenityService;
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

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class AmenityServiceImpl implements AmenityService {

    private final AmenityRepository amenityRepository;
    private final UserRepository userRepository;
    private final AmenityMapper amenityMapper;

    @Override
    @Transactional
    public AmenityResponseDTO createAmenity(AmenityRequestDTO requestDTO) {
        log.info("Creating new amenity: {}", requestDTO.getName());

        String societyId = getCurrentUserSocietyId();
        
        if (amenityRepository.existsByNameIgnoreCaseAndSocietyIdAndIsDeletedFalse(requestDTO.getName(), societyId)) {
            throw new IllegalArgumentException("Amenity with this name already exists in the society.");
        }

        Amenity amenity = amenityMapper.toAmenityEntity(requestDTO);
        amenity.setSocietyId(societyId);
        amenity.setAmenityCode("AMN-" + UUID.randomUUID().toString().substring(0, 6).toUpperCase());

        amenity = amenityRepository.save(amenity);
        log.info("Amenity created successfully with ID: {}", amenity.getId());
        
        return amenityMapper.toAmenityResponseDTO(amenity);
    }

    @Override
    @Transactional
    public AmenityResponseDTO updateAmenity(String id, AmenityRequestDTO requestDTO) {
        log.info("Updating amenity: {}", id);

        Amenity amenity = amenityRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Amenity not found: " + id));

        validateAdminAccess(amenity.getSocietyId());

        if (!amenity.getName().equalsIgnoreCase(requestDTO.getName()) && 
            amenityRepository.existsByNameIgnoreCaseAndSocietyIdAndIsDeletedFalse(requestDTO.getName(), amenity.getSocietyId())) {
            throw new IllegalArgumentException("Amenity with this name already exists in the society.");
        }

        amenityMapper.updateAmenityFromDto(requestDTO, amenity);
        amenity = amenityRepository.save(amenity);

        return amenityMapper.toAmenityResponseDTO(amenity);
    }

    @Override
    @Transactional
    public AmenityResponseDTO deactivateAmenity(String id) {
        log.info("Deactivating amenity: {}", id);
        
        Amenity amenity = amenityRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Amenity not found: " + id));

        validateAdminAccess(amenity.getSocietyId());

        amenity.setStatus(AmenityStatus.INACTIVE);
        amenity = amenityRepository.save(amenity);
        
        return amenityMapper.toAmenityResponseDTO(amenity);
    }

    @Override
    @Transactional
    public void deleteAmenity(String id) {
        log.info("Soft deleting amenity: {}", id);
        
        Amenity amenity = amenityRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Amenity not found: " + id));

        validateAdminAccess(amenity.getSocietyId());

        amenity.setIsDeleted(true);
        amenityRepository.save(amenity);
    }

    @Override
    public AmenityResponseDTO getAmenityById(String id) {
        Amenity amenity = amenityRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Amenity not found: " + id));
        validateReadAccess(amenity.getSocietyId());
        return amenityMapper.toAmenityResponseDTO(amenity);
    }

    @Override
    public Page<AmenitySummaryDTO> searchAmenities(String societyId, AmenityCategory category, AmenityStatus status, String keyword, int page, int size, String sortBy, String sortDir) {
        
        if (societyId != null) {
             validateReadAccess(societyId);
        } else {
             societyId = getCurrentUserSocietyId(); // Default to current user's society
        }
        
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Page<Amenity> amenityPage = amenityRepository.searchAmenities(societyId, category, status, keyword, pageable);
        
        return amenityPage.map(amenityMapper::toAmenitySummaryDTO);
    }

    // --- Helper Methods ---

    private String getCurrentUserSocietyId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !auth.getName().equals("anonymousUser")) {
            return userRepository.findByEmail(auth.getName())
                    .map(User::getSocietyId)
                    .orElseThrow(() -> new AccessDeniedException("User not found or has no society"));
        }
        throw new AccessDeniedException("Unauthorized");
    }

    private void validateAdminAccess(String targetSocietyId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !auth.getName().equals("anonymousUser")) {
            String email = auth.getName();
            User user = userRepository.findByEmail(email).orElse(null);
            
            if (user != null) {
                if (user.getRole() == Role.SOCIETY_ADMIN && !user.getSocietyId().equals(targetSocietyId)) {
                    throw new AccessDeniedException("SOCIETY_ADMIN can only manage amenities within their own society.");
                }
                if (user.getRole() == Role.STAFF || user.getRole() == Role.RESIDENT) {
                     throw new AccessDeniedException("Insufficient privileges. Only Admins can modify amenities.");
                }
            }
        }
    }
    
    private void validateReadAccess(String targetSocietyId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !auth.getName().equals("anonymousUser")) {
            String email = auth.getName();
            User user = userRepository.findByEmail(email).orElse(null);
            
            if (user != null) {
                if (user.getRole() != Role.SUPER_ADMIN && !user.getSocietyId().equals(targetSocietyId)) {
                    throw new AccessDeniedException("You can only view amenities within your own society.");
                }
            }
        }
    }
}
