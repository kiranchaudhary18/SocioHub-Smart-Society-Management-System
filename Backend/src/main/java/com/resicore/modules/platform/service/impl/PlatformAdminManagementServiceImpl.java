package com.resicore.modules.platform.service.impl;

import com.resicore.common.enums.Role;
import com.resicore.exception.ResourceNotFoundException;
import com.resicore.modules.platform.dto.AdminProfileDTO;
import com.resicore.modules.platform.enums.AuditLogAction;
import com.resicore.modules.platform.mapper.PlatformMapper;
import com.resicore.modules.platform.service.PlatformAdminManagementService;
import com.resicore.modules.platform.service.PlatformAuditService;
import com.resicore.modules.society.repository.SocietyRepository;
import com.resicore.modules.platform.dto.AdminRequestDTO;
import com.resicore.modules.user.entity.User;
import com.resicore.modules.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class PlatformAdminManagementServiceImpl implements PlatformAdminManagementService {

    private final UserRepository userRepository;
    private final SocietyRepository societyRepository;
    private final PlatformMapper platformMapper;
    private final PlatformAuditService auditService;
    private final PasswordEncoder passwordEncoder;
    private final MongoTemplate mongoTemplate;

    @Override
    @Transactional
    public AdminProfileDTO createSocietyAdmin(AdminRequestDTO requestDTO) {
        validateSuperAdmin();
        
        if (userRepository.existsByEmail(requestDTO.getEmail())) {
            throw new IllegalArgumentException("Email is already in use.");
        }
        
        if (userRepository.existsByPhone(requestDTO.getPhone())) {
            throw new IllegalArgumentException("Phone number is already in use.");
        }
        
        User user = User.builder()
                .firstName(requestDTO.getFirstName())
                .lastName(requestDTO.getLastName())
                .email(requestDTO.getEmail())
                .phone(requestDTO.getPhone())
                .password(passwordEncoder.encode(requestDTO.getPassword()))
                .role(Role.SOCIETY_ADMIN)
                .societyId(requestDTO.getSocietyId())
                .build();
                
        user = userRepository.save(user);
        auditService.logAction(AuditLogAction.ADMIN_CREATED, user.getId(), "Created Society Admin: " + user.getEmail());
        
        return platformMapper.toAdminProfileDTO(user);
    }

    @Override
    @Transactional
    public AdminProfileDTO updateSocietyAdmin(String adminId, AdminRequestDTO requestDTO) {
        validateSuperAdmin();
        User user = getAdminById(adminId);
        
        user.setFirstName(requestDTO.getFirstName());
        user.setLastName(requestDTO.getLastName());
        
        if (!user.getEmail().equals(requestDTO.getEmail()) && userRepository.existsByEmail(requestDTO.getEmail())) {
            throw new IllegalArgumentException("Email is already in use.");
        }
        user.setEmail(requestDTO.getEmail());
        
        if (!user.getPhone().equals(requestDTO.getPhone()) && userRepository.existsByPhone(requestDTO.getPhone())) {
            throw new IllegalArgumentException("Phone number is already in use.");
        }
        user.setPhone(requestDTO.getPhone());
        
        user = userRepository.save(user);
        auditService.logAction(AuditLogAction.ADMIN_UPDATED, user.getId(), "Updated Society Admin: " + user.getEmail());
        
        return platformMapper.toAdminProfileDTO(user);
    }

    @Override
    @Transactional
    public AdminProfileDTO deactivateSocietyAdmin(String adminId) {
        validateSuperAdmin();
        User user = getAdminById(adminId);
        
        user.setActive(false);
        user = userRepository.save(user);
        auditService.logAction(AuditLogAction.ADMIN_DEACTIVATED, user.getId(), "Deactivated Society Admin: " + user.getEmail());
        
        return platformMapper.toAdminProfileDTO(user);
    }

    @Override
    @Transactional
    public void resetSocietyAdminPassword(String adminId, String newPassword) {
        validateSuperAdmin();
        User user = getAdminById(adminId);
        
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        auditService.logAction(AuditLogAction.ADMIN_UPDATED, user.getId(), "Reset password for Society Admin: " + user.getEmail());
    }

    @Override
    @Transactional
    public AdminProfileDTO assignSociety(String adminId, String societyId) {
        validateSuperAdmin();
        User user = getAdminById(adminId);
        
        if (!societyRepository.existsById(societyId)) {
            throw new ResourceNotFoundException("Society not found: " + societyId);
        }
        
        user.setSocietyId(societyId);
        user = userRepository.save(user);
        auditService.logAction(AuditLogAction.ADMIN_UPDATED, user.getId(), "Assigned Society Admin to society: " + societyId);
        
        return platformMapper.toAdminProfileDTO(user);
    }

    @Override
    @Transactional
    public AdminProfileDTO removeSocietyAssignment(String adminId) {
        validateSuperAdmin();
        User user = getAdminById(adminId);
        
        user.setSocietyId(null);
        user = userRepository.save(user);
        auditService.logAction(AuditLogAction.ADMIN_UPDATED, user.getId(), "Removed society assignment from Admin: " + user.getEmail());
        
        return platformMapper.toAdminProfileDTO(user);
    }

    @Override
    public AdminProfileDTO getAdminProfile(String adminId) {
        validateSuperAdmin();
        return platformMapper.toAdminProfileDTO(getAdminById(adminId));
    }

    @Override
    public Page<AdminProfileDTO> searchAdmins(String keyword, String societyId, Boolean isActive, int page, int size, String sortBy, String sortDir) {
        validateSuperAdmin();
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Query query = new Query();
        query.addCriteria(Criteria.where("role").is(Role.SOCIETY_ADMIN));
        
        if (societyId != null && !societyId.isBlank()) {
            query.addCriteria(Criteria.where("societyId").is(societyId));
        }
        if (isActive != null) {
            query.addCriteria(Criteria.where("isActive").is(isActive));
        }
        if (keyword != null && !keyword.isBlank()) {
            Criteria keywordCriteria = new Criteria().orOperator(
                Criteria.where("firstName").regex(keyword, "i"),
                Criteria.where("lastName").regex(keyword, "i"),
                Criteria.where("email").regex(keyword, "i")
            );
            query.addCriteria(keywordCriteria);
        }
        
        long total = mongoTemplate.count(query, User.class);
        query.with(pageable);
        List<User> users = mongoTemplate.find(query, User.class);
        
        Page<User> userPage = new PageImpl<>(users, pageable, total);
        return userPage.map(platformMapper::toAdminProfileDTO);
    }

    // --- Helpers ---
    
    private User getAdminById(String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Admin not found: " + id));
        if (user.getRole() != Role.SOCIETY_ADMIN) {
             throw new IllegalArgumentException("User is not a SOCIETY_ADMIN");
        }
        return user;
    }

    private void validateSuperAdmin() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !auth.getName().equals("anonymousUser")) {
            User user = userRepository.findByEmail(auth.getName())
                    .orElseThrow(() -> new AccessDeniedException("User not found"));
            if (user.getRole() != Role.SUPER_ADMIN) {
                throw new AccessDeniedException("Only SUPER_ADMIN can manage platform admins.");
            }
            return;
        }
        throw new AccessDeniedException("Unauthorized");
    }
}
