package com.resicore.modules.staff.service.impl;

import com.resicore.common.enums.Role;
import com.resicore.exception.DuplicateResourceException;
import com.resicore.exception.ResourceNotFoundException;
import com.resicore.modules.society.repository.SocietyRepository;
import com.resicore.modules.staff.dto.StaffProfileDTO;
import com.resicore.modules.staff.dto.StaffRequestDTO;
import com.resicore.modules.staff.dto.StaffResponseDTO;
import com.resicore.modules.staff.dto.StaffSummaryDTO;
import com.resicore.modules.staff.entity.Staff;
import com.resicore.modules.staff.enums.EmploymentType;
import com.resicore.modules.staff.enums.Shift;
import com.resicore.modules.staff.enums.StaffStatus;
import com.resicore.modules.staff.enums.StaffType;
import com.resicore.modules.staff.mapper.StaffMapper;
import com.resicore.modules.staff.repository.StaffRepository;
import com.resicore.modules.staff.service.StaffService;
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
public class StaffServiceImpl implements StaffService {

    private final StaffRepository staffRepository;
    private final StaffMapper staffMapper;
    private final UserRepository userRepository;
    private final SocietyRepository societyRepository;

    @Override
    @Transactional
    public StaffResponseDTO createStaff(StaffRequestDTO requestDTO) {
        log.info("Creating new staff with email: {}", requestDTO.getEmail());

        validateSecurityAccessForSociety(requestDTO.getSocietyId());

        if (!userRepository.existsById(requestDTO.getUserId())) {
            throw new ResourceNotFoundException("User not found with id: " + requestDTO.getUserId());
        }
        
        if (!societyRepository.existsById(requestDTO.getSocietyId())) {
            throw new ResourceNotFoundException("Society not found with id: " + requestDTO.getSocietyId());
        }

        if (staffRepository.existsByUserIdAndIsDeletedFalse(requestDTO.getUserId())) {
            throw new DuplicateResourceException("This user is already registered as staff");
        }

        if (staffRepository.existsByEmployeeIdAndSocietyIdAndIsDeletedFalse(requestDTO.getEmployeeId(), requestDTO.getSocietyId())) {
             throw new DuplicateResourceException("Employee ID is already in use within this society");
        }
        
        if (staffRepository.existsByEmailAndIsDeletedFalse(requestDTO.getEmail())) {
             throw new DuplicateResourceException("Email is already in use");
        }

        if (staffRepository.existsByPhoneAndIsDeletedFalse(requestDTO.getPhone())) {
             throw new DuplicateResourceException("Phone number is already in use");
        }

        Staff staff = staffMapper.toEntity(requestDTO);
        staff.setStaffCode(generateStaffCode());
        
        if (staff.getStatus() == null) {
            staff.setStatus(StaffStatus.ACTIVE);
        }

        staff = staffRepository.save(staff);
        return staffMapper.toResponseDTO(staff);
    }

    @Override
    @Transactional
    public StaffResponseDTO updateStaff(String id, StaffRequestDTO requestDTO) {
        log.info("Updating staff ID: {}", id);

        Staff staff = staffRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Staff not found with id: " + id));

        validateSecurityAccessForSociety(staff.getSocietyId());

        if (!staff.getSocietyId().equals(requestDTO.getSocietyId())) {
             throw new IllegalArgumentException("Cannot change the society mapping of an existing staff member");
        }

        // Validate uniqueness if changed
        if (!staff.getEmployeeId().equals(requestDTO.getEmployeeId()) && 
            staffRepository.existsByEmployeeIdAndSocietyIdAndIsDeletedFalse(requestDTO.getEmployeeId(), requestDTO.getSocietyId())) {
            throw new DuplicateResourceException("Employee ID is already in use within this society");
        }
        
        if (!staff.getEmail().equals(requestDTO.getEmail()) && 
            staffRepository.existsByEmailAndIsDeletedFalse(requestDTO.getEmail())) {
            throw new DuplicateResourceException("Email is already in use");
        }
        
        if (!staff.getPhone().equals(requestDTO.getPhone()) && 
            staffRepository.existsByPhoneAndIsDeletedFalse(requestDTO.getPhone())) {
            throw new DuplicateResourceException("Phone number is already in use");
        }

        staffMapper.updateEntityFromDto(requestDTO, staff);
        staff = staffRepository.save(staff);

        return staffMapper.toResponseDTO(staff);
    }

    @Override
    @Transactional
    public StaffResponseDTO activateStaff(String id) {
        log.info("Activating staff ID: {}", id);
        return changeStaffStatus(id, StaffStatus.ACTIVE);
    }

    @Override
    @Transactional
    public StaffResponseDTO deactivateStaff(String id) {
        log.info("Deactivating staff ID: {}", id);
        return changeStaffStatus(id, StaffStatus.INACTIVE);
    }

    @Override
    @Transactional
    public StaffResponseDTO terminateStaff(String id) {
        log.info("Terminating staff ID: {}", id);
        return changeStaffStatus(id, StaffStatus.TERMINATED);
    }
    
    private StaffResponseDTO changeStaffStatus(String id, StaffStatus newStatus) {
        Staff staff = staffRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Staff not found with id: " + id));

        validateSecurityAccessForSociety(staff.getSocietyId());

        staff.setStatus(newStatus);
        staff = staffRepository.save(staff);
        return staffMapper.toResponseDTO(staff);
    }

    @Override
    public StaffResponseDTO getStaffById(String id) {
        Staff staff = staffRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Staff not found with id: " + id));
                
        validateSecurityAccessForSociety(staff.getSocietyId());
        
        return staffMapper.toResponseDTO(staff);
    }

    @Override
    public StaffProfileDTO getStaffByUserId(String userId) {
        Staff staff = staffRepository.findByUserIdAndIsDeletedFalse(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Staff profile not found for user: " + userId));
                
        validateSecurityAccessForProfile(staff);
        
        return staffMapper.toProfileDTO(staff);
    }

    @Override
    public List<StaffSummaryDTO> getStaffBySociety(String societyId) {
        validateSecurityAccessForSociety(societyId);
        List<Staff> staffMembers = staffRepository.findBySocietyIdAndIsDeletedFalse(societyId);
        return staffMapper.toSummaryDTOs(staffMembers);
    }

    @Override
    public Page<StaffSummaryDTO> searchStaff(String societyId, String keyword, String department, StaffType staffType, EmploymentType employmentType, Shift shift, StaffStatus status, int page, int size, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Page<Staff> staffPage = staffRepository.searchStaff(societyId, keyword, department, staffType, employmentType, shift, status, pageable);
        return staffPage.map(staffMapper::toSummaryDTO);
    }

    @Override
    @Transactional
    public void deleteStaff(String id) {
        log.info("Soft deleting staff ID: {}", id);
        Staff staff = staffRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Staff not found with id: " + id));

        validateSecurityAccessForSociety(staff.getSocietyId());

        staff.setIsDeleted(true);
        staffRepository.save(staff);
    }
    
    // --- Helper Methods ---

    private String generateStaffCode() {
        return "STF-" + UUID.randomUUID().toString().substring(0, 6).toUpperCase();
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
    
    private void validateSecurityAccessForProfile(Staff staff) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !auth.getName().equals("anonymousUser")) {
            String email = auth.getName();
            User user = userRepository.findByEmail(email).orElse(null);
            
            if (user != null) {
                if (user.getRole() == Role.SOCIETY_ADMIN && !user.getSocietyId().equals(staff.getSocietyId())) {
                    throw new AccessDeniedException("SOCIETY_ADMIN can only view staff in their own society.");
                }
                if (user.getRole() == Role.STAFF && !user.getId().equals(staff.getUserId())) {
                    throw new AccessDeniedException("STAFF can only access their own profile.");
                }
            }
        }
    }
}
