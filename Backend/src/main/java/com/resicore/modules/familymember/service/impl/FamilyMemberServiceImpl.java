package com.resicore.modules.familymember.service.impl;

import com.resicore.common.enums.Role;
import com.resicore.exception.ResourceNotFoundException;
import com.resicore.modules.familymember.dto.FamilyMemberRequestDTO;
import com.resicore.modules.familymember.dto.FamilyMemberResponseDTO;
import com.resicore.modules.familymember.dto.FamilyMemberSummaryDTO;
import com.resicore.modules.familymember.entity.FamilyMember;
import com.resicore.modules.familymember.enums.FamilyMemberStatus;
import com.resicore.modules.familymember.enums.Relationship;
import com.resicore.modules.familymember.mapper.FamilyMemberMapper;
import com.resicore.modules.familymember.repository.FamilyMemberRepository;
import com.resicore.modules.familymember.service.FamilyMemberService;
import com.resicore.modules.resident.entity.Resident;
import com.resicore.modules.resident.enums.ResidentStatus;
import com.resicore.modules.resident.repository.ResidentRepository;
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
public class FamilyMemberServiceImpl implements FamilyMemberService {

    private final FamilyMemberRepository familyMemberRepository;
    private final FamilyMemberMapper familyMemberMapper;
    private final ResidentRepository residentRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public FamilyMemberResponseDTO addFamilyMember(FamilyMemberRequestDTO requestDTO) {
        log.info("Adding new family member for resident: {}", requestDTO.getResidentId());

        Resident resident = residentRepository.findByIdAndIsDeletedFalse(requestDTO.getResidentId())
                .orElseThrow(() -> new ResourceNotFoundException("Resident not found with id: " + requestDTO.getResidentId()));

        validateSecurityAccessForSociety(resident.getSocietyId());

        if (resident.getResidentStatus() == ResidentStatus.INACTIVE || resident.getResidentStatus() == ResidentStatus.MOVED_OUT || resident.getResidentStatus() == ResidentStatus.BLOCKED) {
             throw new IllegalArgumentException("Cannot add a family member to an inactive or moved-out resident");
        }

        FamilyMember familyMember = familyMemberMapper.toEntity(requestDTO, resident.getSocietyId(), resident.getBuildingId(), resident.getFlatId());
        
        if (familyMember.getStatus() == null) {
            familyMember.setStatus(FamilyMemberStatus.ACTIVE);
        }

        familyMember = familyMemberRepository.save(familyMember);
        return familyMemberMapper.toResponseDTO(familyMember);
    }

    @Override
    @Transactional
    public FamilyMemberResponseDTO updateFamilyMember(String id, FamilyMemberRequestDTO requestDTO) {
        log.info("Updating family member ID: {}", id);

        FamilyMember familyMember = familyMemberRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Family member not found with id: " + id));

        validateSecurityAccessForSociety(familyMember.getSocietyId());

        if (!familyMember.getResidentId().equals(requestDTO.getResidentId())) {
             throw new IllegalArgumentException("Cannot change the resident mapping of an existing family member");
        }

        familyMemberMapper.updateEntityFromDto(requestDTO, familyMember);
        familyMember = familyMemberRepository.save(familyMember);

        return familyMemberMapper.toResponseDTO(familyMember);
    }

    @Override
    @Transactional
    public void removeFamilyMember(String id) {
        log.info("Soft deleting family member ID: {}", id);
        
        FamilyMember familyMember = familyMemberRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Family member not found with id: " + id));

        validateSecurityAccessForSociety(familyMember.getSocietyId());

        familyMember.setIsDeleted(true);
        familyMemberRepository.save(familyMember);
    }

    @Override
    public FamilyMemberResponseDTO getFamilyMemberById(String id) {
        FamilyMember familyMember = familyMemberRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Family member not found with id: " + id));
                
        validateSecurityAccessForViewingFlat(familyMember.getFlatId(), familyMember.getSocietyId());
        
        return familyMemberMapper.toResponseDTO(familyMember);
    }

    @Override
    public List<FamilyMemberSummaryDTO> getFamilyMembersByResident(String residentId) {
        Resident resident = residentRepository.findByIdAndIsDeletedFalse(residentId)
                .orElseThrow(() -> new ResourceNotFoundException("Resident not found with id: " + residentId));
                
        validateSecurityAccessForViewingFlat(resident.getFlatId(), resident.getSocietyId());

        List<FamilyMember> members = familyMemberRepository.findByResidentIdAndIsDeletedFalse(residentId);
        return familyMemberMapper.toSummaryDTOs(members);
    }

    @Override
    public List<FamilyMemberSummaryDTO> getFamilyMembersByFlat(String flatId) {
        // Find flat to validate society if needed, or rely on records. Assuming caller provides flatId directly
        // Better to fetch at least one resident to validate if needed, or bypass for super admin. We'll do it iteratively.
        // Actually, we must validate that the resident logged in belongs to this flat.
        validateSecurityAccessForViewingFlat(flatId, null);

        List<FamilyMember> members = familyMemberRepository.findByFlatIdAndIsDeletedFalse(flatId);
        return familyMemberMapper.toSummaryDTOs(members);
    }

    @Override
    public Page<FamilyMemberSummaryDTO> searchFamilyMembers(String societyId, String buildingId, String flatId, String residentId, String keyword, FamilyMemberStatus status, Relationship relationship, int page, int size, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Page<FamilyMember> membersPage = familyMemberRepository.searchFamilyMembers(societyId, buildingId, flatId, residentId, keyword, status, relationship, pageable);
        return membersPage.map(familyMemberMapper::toSummaryDTO);
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
    
    private void validateSecurityAccessForViewingFlat(String flatId, String societyId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !auth.getName().equals("anonymousUser")) {
            String email = auth.getName();
            User user = userRepository.findByEmail(email).orElse(null);
            
            if (user != null) {
                if (user.getRole() == Role.SOCIETY_ADMIN && societyId != null && !Objects.equals(user.getSocietyId(), societyId)) {
                    throw new AccessDeniedException("SOCIETY_ADMIN can only view family members in their own society.");
                } else if (user.getRole() == Role.RESIDENT) {
                    Resident currentResident = residentRepository.findByUserIdAndIsDeletedFalse(user.getId()).orElse(null);
                    if (currentResident == null || !Objects.equals(currentResident.getFlatId(), flatId)) {
                        throw new AccessDeniedException("RESIDENT can only view family members belonging to their own flat.");
                    }
                }
            }
        }
    }
}
