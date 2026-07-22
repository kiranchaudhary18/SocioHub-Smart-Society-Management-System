package com.resicore.modules.visitor.service.impl;

import com.resicore.common.enums.Role;
import com.resicore.exception.ResourceNotFoundException;
import com.resicore.modules.resident.entity.Resident;
import com.resicore.modules.resident.repository.ResidentRepository;
import com.resicore.modules.staff.repository.StaffRepository;
import com.resicore.modules.user.entity.User;
import com.resicore.modules.user.repository.UserRepository;
import com.resicore.modules.visitor.dto.VisitorCheckInDTO;
import com.resicore.modules.visitor.dto.VisitorCheckOutDTO;
import com.resicore.modules.visitor.dto.VisitorRequestDTO;
import com.resicore.modules.visitor.dto.VisitorResponseDTO;
import com.resicore.modules.visitor.dto.VisitorSummaryDTO;
import com.resicore.modules.visitor.entity.Visitor;
import com.resicore.modules.visitor.enums.Purpose;
import com.resicore.modules.visitor.enums.VisitorStatus;
import com.resicore.modules.visitor.mapper.VisitorMapper;
import com.resicore.modules.visitor.repository.VisitorRepository;
import com.resicore.modules.visitor.service.VisitorService;
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

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class VisitorServiceImpl implements VisitorService {

    private final VisitorRepository visitorRepository;
    private final ResidentRepository residentRepository;
    private final StaffRepository staffRepository;
    private final UserRepository userRepository;
    private final VisitorMapper visitorMapper;

    @Override
    @Transactional
    public VisitorResponseDTO createVisitorRequest(VisitorRequestDTO requestDTO) {
        log.info("Creating visitor request for Resident ID: {}", requestDTO.getResidentId());

        Resident resident = residentRepository.findByIdAndIsDeletedFalse(requestDTO.getResidentId())
                .orElseThrow(() -> new ResourceNotFoundException("Resident not found with id: " + requestDTO.getResidentId()));

        validateSecurityAccessForCreation(resident.getSocietyId(), resident.getId());

        Visitor visitor = visitorMapper.toEntity(requestDTO);
        
        visitor.setSocietyId(resident.getSocietyId());
        visitor.setBuildingId(resident.getBuildingId());
        visitor.setFlatId(resident.getFlatId());
        visitor.setHostName(resident.getFullName());
        
        visitor.setVisitorCode(generateVisitorCode());
        visitor.setStatus(VisitorStatus.PENDING);
        
        visitor = visitorRepository.save(visitor);
        return visitorMapper.toResponseDTO(visitor);
    }

    @Override
    @Transactional
    public VisitorResponseDTO updateVisitor(String id, VisitorRequestDTO requestDTO) {
        log.info("Updating visitor ID: {}", id);

        Visitor visitor = visitorRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Visitor not found with id: " + id));

        validateSecurityAccessForSociety(visitor.getSocietyId());

        if (visitor.getStatus() == VisitorStatus.CHECKED_IN || visitor.getStatus() == VisitorStatus.CHECKED_OUT) {
             throw new IllegalArgumentException("Cannot update visitor details once checked in or checked out");
        }

        if (!visitor.getResidentId().equals(requestDTO.getResidentId())) {
            Resident resident = residentRepository.findByIdAndIsDeletedFalse(requestDTO.getResidentId())
                .orElseThrow(() -> new ResourceNotFoundException("Resident not found with id: " + requestDTO.getResidentId()));
            
            visitor.setBuildingId(resident.getBuildingId());
            visitor.setFlatId(resident.getFlatId());
            visitor.setHostName(resident.getFullName());
        }

        visitorMapper.updateEntityFromDto(requestDTO, visitor);
        visitor = visitorRepository.save(visitor);

        return visitorMapper.toResponseDTO(visitor);
    }

    @Override
    @Transactional
    public VisitorResponseDTO approveVisitor(String id) {
        log.info("Approving visitor ID: {}", id);
        
        Visitor visitor = visitorRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Visitor not found with id: " + id));

        validateSecurityAccessForResidentAction(visitor.getSocietyId(), visitor.getResidentId());

        if (visitor.getStatus() != VisitorStatus.PENDING) {
             throw new IllegalArgumentException("Only PENDING visitors can be approved.");
        }

        visitor.setStatus(VisitorStatus.APPROVED);
        visitor.setApprovedByResidentId(visitor.getResidentId());
        
        visitor = visitorRepository.save(visitor);
        return visitorMapper.toResponseDTO(visitor);
    }

    @Override
    @Transactional
    public VisitorResponseDTO rejectVisitor(String id, String remarks) {
        log.info("Rejecting visitor ID: {}", id);
        
        Visitor visitor = visitorRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Visitor not found with id: " + id));

        validateSecurityAccessForResidentAction(visitor.getSocietyId(), visitor.getResidentId());

        if (visitor.getStatus() == VisitorStatus.CHECKED_IN || visitor.getStatus() == VisitorStatus.CHECKED_OUT) {
             throw new IllegalArgumentException("Cannot reject a visitor who is already checked in or checked out.");
        }

        visitor.setStatus(VisitorStatus.REJECTED);
        if (remarks != null && !remarks.isBlank()) {
            visitor.setRemarks(remarks);
        }
        
        visitor = visitorRepository.save(visitor);
        return visitorMapper.toResponseDTO(visitor);
    }

    @Override
    @Transactional
    public VisitorResponseDTO cancelVisitor(String id, String remarks) {
        log.info("Cancelling visitor ID: {}", id);
        
        Visitor visitor = visitorRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Visitor not found with id: " + id));

        validateSecurityAccessForResidentAction(visitor.getSocietyId(), visitor.getResidentId());

        if (visitor.getStatus() == VisitorStatus.CHECKED_IN || visitor.getStatus() == VisitorStatus.CHECKED_OUT) {
             throw new IllegalArgumentException("Cannot cancel a visitor who is already checked in or checked out.");
        }

        visitor.setStatus(VisitorStatus.CANCELLED);
        if (remarks != null && !remarks.isBlank()) {
            visitor.setRemarks(remarks);
        }
        
        visitor = visitorRepository.save(visitor);
        return visitorMapper.toResponseDTO(visitor);
    }

    @Override
    @Transactional
    public VisitorResponseDTO checkInVisitor(String id, VisitorCheckInDTO checkInDTO) {
        log.info("Checking in visitor ID: {}", id);
        
        Visitor visitor = visitorRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Visitor not found with id: " + id));

        validateSecurityAccessForStaffAction(visitor.getSocietyId());

        if (visitor.getStatus() == VisitorStatus.REJECTED || visitor.getStatus() == VisitorStatus.CANCELLED) {
             throw new IllegalArgumentException("Cannot check in a REJECTED or CANCELLED visitor.");
        }
        
        if (visitor.getStatus() == VisitorStatus.CHECKED_IN || visitor.getStatus() == VisitorStatus.CHECKED_OUT) {
             throw new IllegalArgumentException("Visitor has already been checked in or out.");
        }
        
        if (!staffRepository.existsById(checkInDTO.getStaffId())) {
             throw new ResourceNotFoundException("Staff not found with id: " + checkInDTO.getStaffId());
        }

        visitor.setStatus(VisitorStatus.CHECKED_IN);
        visitor.setActualCheckIn(LocalDateTime.now());
        visitor.setCheckedInByStaffId(checkInDTO.getStaffId());
        
        if (checkInDTO.getPhoto() != null && !checkInDTO.getPhoto().isBlank()) {
            visitor.setPhoto(checkInDTO.getPhoto());
        }
        
        if (checkInDTO.getRemarks() != null && !checkInDTO.getRemarks().isBlank()) {
            visitor.setRemarks(checkInDTO.getRemarks());
        }
        
        visitor = visitorRepository.save(visitor);
        return visitorMapper.toResponseDTO(visitor);
    }

    @Override
    @Transactional
    public VisitorResponseDTO checkOutVisitor(String id, VisitorCheckOutDTO checkOutDTO) {
        log.info("Checking out visitor ID: {}", id);
        
        Visitor visitor = visitorRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Visitor not found with id: " + id));

        validateSecurityAccessForStaffAction(visitor.getSocietyId());

        if (visitor.getStatus() != VisitorStatus.CHECKED_IN) {
             throw new IllegalArgumentException("Visitor must be CHECKED_IN before they can be CHECKED_OUT.");
        }
        
        if (!staffRepository.existsById(checkOutDTO.getStaffId())) {
             throw new ResourceNotFoundException("Staff not found with id: " + checkOutDTO.getStaffId());
        }

        visitor.setStatus(VisitorStatus.CHECKED_OUT);
        visitor.setActualCheckOut(LocalDateTime.now());
        visitor.setCheckedOutByStaffId(checkOutDTO.getStaffId());
        
        if (checkOutDTO.getRemarks() != null && !checkOutDTO.getRemarks().isBlank()) {
            visitor.setRemarks(checkOutDTO.getRemarks());
        }
        
        visitor = visitorRepository.save(visitor);
        return visitorMapper.toResponseDTO(visitor);
    }

    @Override
    public VisitorResponseDTO getVisitorById(String id) {
        Visitor visitor = visitorRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Visitor not found with id: " + id));
        validateSecurityAccessForSociety(visitor.getSocietyId());
        return visitorMapper.toResponseDTO(visitor);
    }

    @Override
    public VisitorResponseDTO getVisitorByCode(String visitorCode) {
        Visitor visitor = visitorRepository.findByVisitorCodeAndIsDeletedFalse(visitorCode)
                .orElseThrow(() -> new ResourceNotFoundException("Visitor not found with code: " + visitorCode));
        validateSecurityAccessForSociety(visitor.getSocietyId());
        return visitorMapper.toResponseDTO(visitor);
    }

    @Override
    public List<VisitorSummaryDTO> getVisitorsByResident(String residentId) {
        Resident resident = residentRepository.findByIdAndIsDeletedFalse(residentId)
                .orElseThrow(() -> new ResourceNotFoundException("Resident not found with id: " + residentId));

        validateSecurityAccessForCreation(resident.getSocietyId(), residentId);
        
        List<Visitor> visitors = visitorRepository.findByResidentIdAndIsDeletedFalse(residentId);
        return visitorMapper.toSummaryDTOs(visitors);
    }

    @Override
    public List<VisitorSummaryDTO> getVisitorsBySociety(String societyId) {
        validateSecurityAccessForSociety(societyId);
        List<Visitor> visitors = visitorRepository.findBySocietyIdAndIsDeletedFalse(societyId);
        return visitorMapper.toSummaryDTOs(visitors);
    }

    @Override
    public Page<VisitorSummaryDTO> searchVisitors(String societyId, String residentId, String buildingId, String flatId, String keyword, VisitorStatus status, Purpose purpose, LocalDateTime startDate, LocalDateTime endDate, int page, int size, String sortBy, String sortDir) {
        
        if (societyId != null) {
            validateSecurityAccessForSociety(societyId);
        }
        
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Page<Visitor> visitorPage = visitorRepository.searchVisitors(societyId, residentId, buildingId, flatId, keyword, status, purpose, startDate, endDate, pageable);
        return visitorPage.map(visitorMapper::toSummaryDTO);
    }

    @Override
    @Transactional
    public void deleteVisitor(String id) {
        log.info("Soft deleting visitor ID: {}", id);
        Visitor visitor = visitorRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Visitor not found with id: " + id));

        validateSecurityAccessForSociety(visitor.getSocietyId());

        visitor.setIsDeleted(true);
        visitorRepository.save(visitor);
    }
    
    // --- Helper Methods ---

    private String generateVisitorCode() {
        return "VIS-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }

    private void validateSecurityAccessForSociety(String targetSocietyId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !auth.getName().equals("anonymousUser")) {
            String email = auth.getName();
            User user = userRepository.findByEmail(email).orElse(null);
            
            if (user != null) {
                if (user.getRole() == Role.SOCIETY_ADMIN && !user.getSocietyId().equals(targetSocietyId)) {
                    throw new AccessDeniedException("SOCIETY_ADMIN can only manage resources belonging to their own society.");
                }
                if (user.getRole() == Role.STAFF && !user.getSocietyId().equals(targetSocietyId)) {
                    throw new AccessDeniedException("STAFF can only access records in their own society.");
                }
            }
        }
    }
    
    private void validateSecurityAccessForStaffAction(String targetSocietyId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !auth.getName().equals("anonymousUser")) {
            String email = auth.getName();
            User user = userRepository.findByEmail(email).orElse(null);
            
            if (user != null) {
                if (user.getRole() == Role.SOCIETY_ADMIN && !user.getSocietyId().equals(targetSocietyId)) {
                    throw new AccessDeniedException("SOCIETY_ADMIN can only manage resources belonging to their own society.");
                }
                if (user.getRole() == Role.STAFF && !user.getSocietyId().equals(targetSocietyId)) {
                    throw new AccessDeniedException("STAFF can only process visitors for their own society.");
                }
                if (user.getRole() == Role.RESIDENT) {
                    throw new AccessDeniedException("RESIDENT cannot perform check-in or check-out operations.");
                }
            }
        }
    }
    
    private void validateSecurityAccessForCreation(String targetSocietyId, String targetResidentId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !auth.getName().equals("anonymousUser")) {
            String email = auth.getName();
            User user = userRepository.findByEmail(email).orElse(null);
            
            if (user != null) {
                if (user.getRole() == Role.SOCIETY_ADMIN && !user.getSocietyId().equals(targetSocietyId)) {
                    throw new AccessDeniedException("SOCIETY_ADMIN can only manage resources belonging to their own society.");
                }
                if (user.getRole() == Role.STAFF) {
                    throw new AccessDeniedException("STAFF cannot create visitor requests.");
                }
                if (user.getRole() == Role.RESIDENT) {
                    Resident resident = residentRepository.findByUserIdAndIsDeletedFalse(user.getId())
                            .orElseThrow(() -> new ResourceNotFoundException("Resident profile not found"));
                    if (!resident.getId().equals(targetResidentId)) {
                        throw new AccessDeniedException("RESIDENT can only manage visitor requests for their own profile.");
                    }
                }
            }
        }
    }
    
    private void validateSecurityAccessForResidentAction(String targetSocietyId, String targetResidentId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !auth.getName().equals("anonymousUser")) {
            String email = auth.getName();
            User user = userRepository.findByEmail(email).orElse(null);
            
            if (user != null) {
                if (user.getRole() == Role.SOCIETY_ADMIN && !user.getSocietyId().equals(targetSocietyId)) {
                    throw new AccessDeniedException("SOCIETY_ADMIN can only manage resources belonging to their own society.");
                }
                if (user.getRole() == Role.STAFF) {
                    throw new AccessDeniedException("STAFF cannot approve or reject visitors.");
                }
                if (user.getRole() == Role.RESIDENT) {
                    Resident resident = residentRepository.findByUserIdAndIsDeletedFalse(user.getId())
                            .orElseThrow(() -> new ResourceNotFoundException("Resident profile not found"));
                    if (!resident.getId().equals(targetResidentId)) {
                        throw new AccessDeniedException("RESIDENT can only approve or reject visitors assigned to their own profile.");
                    }
                }
            }
        }
    }
}
