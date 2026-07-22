package com.resicore.modules.platform.service.impl;

import com.resicore.common.enums.Role;
import com.resicore.exception.ResourceNotFoundException;
import com.resicore.modules.platform.enums.AuditLogAction;
import com.resicore.modules.platform.service.PlatformAuditService;
import com.resicore.modules.platform.service.PlatformSocietyService;
import com.resicore.modules.society.dto.SocietyResponseDTO;
import com.resicore.modules.society.entity.Society;
import com.resicore.modules.society.mapper.SocietyMapper;
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

import com.resicore.modules.society.enums.SocietyStatus;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class PlatformSocietyServiceImpl implements PlatformSocietyService {

    private final SocietyRepository societyRepository;
    private final UserRepository userRepository;
    private final SocietyMapper societyMapper;
    private final PlatformAuditService auditService;

    @Override
    @Transactional
    public SocietyResponseDTO approveSociety(String id) {
        validateSuperAdmin();
        Society society = getSocietyById(id);
        
        society.setStatus(SocietyStatus.ACTIVE);
        society = societyRepository.save(society);
        
        auditService.logAction(AuditLogAction.SOCIETY_APPROVED, id, "Approved society: " + society.getSocietyName());
        return societyMapper.toResponseDTO(society);
    }

    @Override
    @Transactional
    public SocietyResponseDTO rejectSociety(String id) {
        validateSuperAdmin();
        Society society = getSocietyById(id);
        
        society.setStatus(SocietyStatus.INACTIVE);
        society = societyRepository.save(society);
        
        auditService.logAction(AuditLogAction.SOCIETY_REJECTED, id, "Rejected society: " + society.getSocietyName());
        return societyMapper.toResponseDTO(society);
    }

    @Override
    @Transactional
    public SocietyResponseDTO suspendSociety(String id) {
        validateSuperAdmin();
        Society society = getSocietyById(id);
        
        society.setStatus(SocietyStatus.SUSPENDED);
        society = societyRepository.save(society);
        
        auditService.logAction(AuditLogAction.SOCIETY_SUSPENDED, id, "Suspended society: " + society.getSocietyName());
        return societyMapper.toResponseDTO(society);
    }

    @Override
    @Transactional
    public SocietyResponseDTO activateSociety(String id) {
        validateSuperAdmin();
        Society society = getSocietyById(id);
        
        society.setStatus(SocietyStatus.ACTIVE); 
        society = societyRepository.save(society);
        
        auditService.logAction(AuditLogAction.SOCIETY_ACTIVATED, id, "Activated society: " + society.getSocietyName());
        return societyMapper.toResponseDTO(society);
    }

    @Override
    @Transactional
    public SocietyResponseDTO deactivateSociety(String id) {
        validateSuperAdmin();
        Society society = getSocietyById(id);
        
        society.setStatus(SocietyStatus.INACTIVE);
        society = societyRepository.save(society);
        
        auditService.logAction(AuditLogAction.SOCIETY_DEACTIVATED, id, "Deactivated society: " + society.getSocietyName());
        return societyMapper.toResponseDTO(society);
    }

    @Override
    public SocietyResponseDTO getSocietyDetails(String id) {
        validateSuperAdmin();
        return societyMapper.toResponseDTO(getSocietyById(id));
    }

    @Override
    public Object getSocietyStatistics(String id) {
        validateSuperAdmin();
        Society society = getSocietyById(id);
        
        Map<String, Object> stats = new HashMap<>();
        stats.put("societyId", id);
        stats.put("societyName", society.getSocietyName());
        stats.put("totalBuildings", society.getTotalBuildings());
        stats.put("totalFlats", society.getTotalFlats());
        stats.put("totalResidents", society.getTotalResidents());
        stats.put("totalStaff", society.getTotalStaff());
        
        return stats;
    }

    @Override
    public Page<SocietyResponseDTO> searchSocieties(String status, String keyword, int page, int size, String sortBy, String sortDir) {
        validateSuperAdmin();
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Page<Society> societyPage = societyRepository.searchSocieties(keyword, null, null, status, pageable);
        return societyPage.map(societyMapper::toResponseDTO);
    }

    // --- Helpers ---
    
    private Society getSocietyById(String id) {
        return societyRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Society not found: " + id));
    }

    private void validateSuperAdmin() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !auth.getName().equals("anonymousUser")) {
            User user = userRepository.findByEmail(auth.getName())
                    .orElseThrow(() -> new AccessDeniedException("User not found"));
            if (user.getRole() != Role.SUPER_ADMIN) {
                throw new AccessDeniedException("Only SUPER_ADMIN can manage societies at platform level.");
            }
            return;
        }
        throw new AccessDeniedException("Unauthorized");
    }
}
