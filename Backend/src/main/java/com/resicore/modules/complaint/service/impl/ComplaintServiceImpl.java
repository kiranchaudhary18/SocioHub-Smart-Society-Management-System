package com.resicore.modules.complaint.service.impl;

import com.resicore.common.enums.Role;
import com.resicore.exception.ResourceNotFoundException;
import com.resicore.modules.complaint.dto.AssignComplaintDTO;
import com.resicore.modules.complaint.dto.ComplaintRequestDTO;
import com.resicore.modules.complaint.dto.ComplaintResponseDTO;
import com.resicore.modules.complaint.dto.ComplaintSummaryDTO;
import com.resicore.modules.complaint.dto.ComplaintUpdateDTO;
import com.resicore.modules.complaint.dto.FeedbackDTO;
import com.resicore.modules.complaint.dto.ResolveComplaintDTO;
import com.resicore.modules.complaint.entity.Complaint;
import com.resicore.modules.complaint.enums.ComplaintCategory;
import com.resicore.modules.complaint.enums.ComplaintPriority;
import com.resicore.modules.complaint.enums.ComplaintStatus;
import com.resicore.modules.complaint.mapper.ComplaintMapper;
import com.resicore.modules.complaint.repository.ComplaintRepository;
import com.resicore.modules.complaint.service.ComplaintService;
import com.resicore.modules.resident.entity.Resident;
import com.resicore.modules.resident.repository.ResidentRepository;
import com.resicore.modules.staff.entity.Staff;
import com.resicore.modules.staff.repository.StaffRepository;
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

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ComplaintServiceImpl implements ComplaintService {

    private final ComplaintRepository complaintRepository;
    private final ResidentRepository residentRepository;
    private final StaffRepository staffRepository;
    private final UserRepository userRepository;
    private final ComplaintMapper complaintMapper;

    @Override
    @Transactional
    public ComplaintResponseDTO createComplaint(ComplaintRequestDTO requestDTO) {
        log.info("Creating complaint for resident: {}", requestDTO.getResidentId());

        Resident resident = residentRepository.findByIdAndIsDeletedFalse(requestDTO.getResidentId())
                .orElseThrow(() -> new ResourceNotFoundException("Resident not found with id: " + requestDTO.getResidentId()));

        validateResidentAccess(resident.getSocietyId(), resident.getId());

        Complaint complaint = complaintMapper.toEntity(requestDTO);
        
        complaint.setSocietyId(resident.getSocietyId());
        complaint.setBuildingId(resident.getBuildingId());
        complaint.setFlatId(resident.getFlatId());
        
        complaint.setComplaintNumber(generateComplaintNumber());
        complaint.setStatus(ComplaintStatus.OPEN);
        
        complaint = complaintRepository.save(complaint);
        return buildResponseDto(complaint);
    }

    @Override
    @Transactional
    public ComplaintResponseDTO updateComplaint(String id, ComplaintUpdateDTO updateDTO) {
        log.info("Updating complaint: {}", id);

        Complaint complaint = complaintRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Complaint not found: " + id));

        validateResidentAccess(complaint.getSocietyId(), complaint.getResidentId());

        if (complaint.getStatus() != ComplaintStatus.OPEN) {
             throw new IllegalArgumentException("Complaints can only be updated while in OPEN status.");
        }

        complaintMapper.updateEntityFromDto(updateDTO, complaint);
        complaint = complaintRepository.save(complaint);
        return buildResponseDto(complaint);
    }

    @Override
    @Transactional
    public ComplaintResponseDTO assignComplaint(String id, AssignComplaintDTO assignDTO) {
        log.info("Assigning complaint {} to staff {}", id, assignDTO.getStaffId());

        Complaint complaint = complaintRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Complaint not found: " + id));

        validateAdminAccess(complaint.getSocietyId());

        if (complaint.getStatus() == ComplaintStatus.CLOSED || complaint.getStatus() == ComplaintStatus.REJECTED || complaint.getStatus() == ComplaintStatus.RESOLVED) {
             throw new IllegalArgumentException("Cannot assign a complaint that is CLOSED, RESOLVED, or REJECTED.");
        }

        Staff staff = staffRepository.findByIdAndIsDeletedFalse(assignDTO.getStaffId())
                .orElseThrow(() -> new ResourceNotFoundException("Staff not found: " + assignDTO.getStaffId()));

        if (!staff.getSocietyId().equals(complaint.getSocietyId())) {
             throw new IllegalArgumentException("Cannot assign staff from a different society.");
        }

        complaint.setAssignedStaffId(staff.getId());
        complaint.setStatus(ComplaintStatus.ASSIGNED);
        
        complaint = complaintRepository.save(complaint);
        return buildResponseDto(complaint);
    }

    @Override
    @Transactional
    public ComplaintResponseDTO startWork(String id) {
        log.info("Starting work on complaint {}", id);
        
        Complaint complaint = complaintRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Complaint not found: " + id));

        validateStaffAccess(complaint.getSocietyId(), complaint.getAssignedStaffId());

        if (complaint.getStatus() != ComplaintStatus.ASSIGNED && complaint.getStatus() != ComplaintStatus.ON_HOLD) {
             throw new IllegalArgumentException("Can only start work on ASSIGNED or ON_HOLD complaints.");
        }

        complaint.setStatus(ComplaintStatus.IN_PROGRESS);
        complaint = complaintRepository.save(complaint);
        return buildResponseDto(complaint);
    }

    @Override
    @Transactional
    public ComplaintResponseDTO putOnHold(String id) {
        log.info("Putting complaint {} on hold", id);
        
        Complaint complaint = complaintRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Complaint not found: " + id));

        validateStaffAccess(complaint.getSocietyId(), complaint.getAssignedStaffId());

        if (complaint.getStatus() != ComplaintStatus.IN_PROGRESS && complaint.getStatus() != ComplaintStatus.ASSIGNED) {
             throw new IllegalArgumentException("Can only put IN_PROGRESS or ASSIGNED complaints on hold.");
        }

        complaint.setStatus(ComplaintStatus.ON_HOLD);
        complaint = complaintRepository.save(complaint);
        return buildResponseDto(complaint);
    }

    @Override
    @Transactional
    public ComplaintResponseDTO resolveComplaint(String id, ResolveComplaintDTO resolveDTO) {
        log.info("Resolving complaint {}", id);
        
        Complaint complaint = complaintRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Complaint not found: " + id));

        validateStaffAccess(complaint.getSocietyId(), complaint.getAssignedStaffId());

        if (complaint.getStatus() == ComplaintStatus.CLOSED || complaint.getStatus() == ComplaintStatus.REJECTED) {
             throw new IllegalArgumentException("Cannot resolve a CLOSED or REJECTED complaint.");
        }

        complaint.setStatus(ComplaintStatus.RESOLVED);
        complaint.setResolutionNotes(resolveDTO.getResolutionNotes());
        complaint.setResolvedAt(LocalDateTime.now());
        
        complaint = complaintRepository.save(complaint);
        return buildResponseDto(complaint);
    }

    @Override
    @Transactional
    public ComplaintResponseDTO closeComplaint(String id) {
        log.info("Closing complaint {}", id);
        
        Complaint complaint = complaintRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Complaint not found: " + id));

        validateAdminAccess(complaint.getSocietyId());

        if (complaint.getStatus() != ComplaintStatus.RESOLVED) {
             throw new IllegalArgumentException("Only RESOLVED complaints can be formally CLOSED by an admin.");
        }

        complaint.setStatus(ComplaintStatus.CLOSED);
        complaint.setClosedAt(LocalDateTime.now());
        
        complaint = complaintRepository.save(complaint);
        return buildResponseDto(complaint);
    }

    @Override
    @Transactional
    public ComplaintResponseDTO rejectComplaint(String id) {
        log.info("Rejecting complaint {}", id);
        
        Complaint complaint = complaintRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Complaint not found: " + id));

        validateAdminAccess(complaint.getSocietyId());

        if (complaint.getStatus() == ComplaintStatus.CLOSED || complaint.getStatus() == ComplaintStatus.RESOLVED) {
             throw new IllegalArgumentException("Cannot reject a CLOSED or RESOLVED complaint.");
        }

        complaint.setStatus(ComplaintStatus.REJECTED);
        complaint.setClosedAt(LocalDateTime.now());
        
        complaint = complaintRepository.save(complaint);
        return buildResponseDto(complaint);
    }

    @Override
    @Transactional
    public ComplaintResponseDTO submitFeedback(String id, FeedbackDTO feedbackDTO) {
        log.info("Submitting feedback for complaint {}", id);
        
        Complaint complaint = complaintRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Complaint not found: " + id));

        validateResidentAccess(complaint.getSocietyId(), complaint.getResidentId());

        if (complaint.getStatus() != ComplaintStatus.RESOLVED && complaint.getStatus() != ComplaintStatus.CLOSED) {
             throw new IllegalArgumentException("Feedback can only be provided for RESOLVED or CLOSED complaints.");
        }

        complaint.setRating(feedbackDTO.getRating());
        
        if (feedbackDTO.getFeedback() != null && !feedbackDTO.getFeedback().isBlank()) {
            complaint.setFeedback(feedbackDTO.getFeedback());
        }
        
        complaint = complaintRepository.save(complaint);
        return buildResponseDto(complaint);
    }

    @Override
    public ComplaintResponseDTO getComplaintById(String id) {
        Complaint complaint = complaintRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Complaint not found: " + id));
        validateReadAccess(complaint);
        return buildResponseDto(complaint);
    }

    @Override
    public ComplaintResponseDTO getComplaintByNumber(String complaintNumber) {
        Complaint complaint = complaintRepository.findByComplaintNumberAndIsDeletedFalse(complaintNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Complaint not found with number: " + complaintNumber));
        validateReadAccess(complaint);
        return buildResponseDto(complaint);
    }

    @Override
    public List<ComplaintSummaryDTO> getComplaintsByResident(String residentId) {
        Resident resident = residentRepository.findByIdAndIsDeletedFalse(residentId)
                .orElseThrow(() -> new ResourceNotFoundException("Resident not found with id: " + residentId));

        validateResidentAccess(resident.getSocietyId(), residentId);
        
        List<Complaint> complaints = complaintRepository.findByResidentIdAndIsDeletedFalse(residentId);
        return buildSummaryList(complaints);
    }
    
    @Override
    public List<ComplaintSummaryDTO> getComplaintsByStaff(String staffId) {
        Staff staff = staffRepository.findByIdAndIsDeletedFalse(staffId)
                .orElseThrow(() -> new ResourceNotFoundException("Staff not found with id: " + staffId));

        validateStaffAccess(staff.getSocietyId(), staffId);
        
        List<Complaint> complaints = complaintRepository.findByAssignedStaffIdAndIsDeletedFalse(staffId);
        return buildSummaryList(complaints);
    }

    @Override
    public List<ComplaintSummaryDTO> getComplaintsBySociety(String societyId) {
        validateAdminAccess(societyId);
        List<Complaint> complaints = complaintRepository.findBySocietyIdAndIsDeletedFalse(societyId);
        return buildSummaryList(complaints);
    }

    @Override
    public Page<ComplaintSummaryDTO> searchComplaints(String societyId, String residentId, String staffId, String buildingId, String flatId, String keyword, ComplaintStatus status, ComplaintPriority priority, ComplaintCategory category, LocalDateTime startDate, LocalDateTime endDate, int page, int size, String sortBy, String sortDir) {
        
        if (societyId != null) {
            validateAdminAccess(societyId); // Or adapt for multi-role search
        }
        
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Page<Complaint> complaintPage = complaintRepository.searchComplaints(societyId, residentId, staffId, buildingId, flatId, keyword, status, priority, category, startDate, endDate, pageable);
        
        // Batch fetch names for summaries
        List<String> residentIds = complaintPage.getContent().stream().map(Complaint::getResidentId).distinct().collect(Collectors.toList());
        List<String> staffIds = complaintPage.getContent().stream().map(Complaint::getAssignedStaffId).filter(id -> id != null).distinct().collect(Collectors.toList());
        
        Map<String, String> residentNames = residentRepository.findAllById(residentIds).stream()
                .collect(Collectors.toMap(Resident::getId, Resident::getFullName));
        Map<String, String> staffNames = staffRepository.findAllById(staffIds).stream()
                .collect(Collectors.toMap(Staff::getId, Staff::getFullName));
                
        return complaintPage.map(c -> complaintMapper.toSummaryDTO(
                c, 
                residentNames.getOrDefault(c.getResidentId(), "Unknown"), 
                c.getAssignedStaffId() != null ? staffNames.getOrDefault(c.getAssignedStaffId(), "Unassigned") : "Unassigned"
        ));
    }

    @Override
    @Transactional
    public void deleteComplaint(String id) {
        log.info("Soft deleting complaint ID: {}", id);
        Complaint complaint = complaintRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Complaint not found with id: " + id));

        validateAdminAccess(complaint.getSocietyId());
        
        if (complaint.getStatus() != ComplaintStatus.CLOSED && complaint.getStatus() != ComplaintStatus.REJECTED) {
            throw new IllegalArgumentException("Only CLOSED or REJECTED complaints can be deleted.");
        }

        complaint.setIsDeleted(true);
        complaintRepository.save(complaint);
    }
    
    // --- Helper Methods ---

    private String generateComplaintNumber() {
        return "CMP-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
    
    private ComplaintResponseDTO buildResponseDto(Complaint complaint) {
        String residentName = residentRepository.findByIdAndIsDeletedFalse(complaint.getResidentId())
                .map(Resident::getFullName)
                .orElse("Unknown Resident");
                
        String staffName = "Unassigned";
        if (complaint.getAssignedStaffId() != null) {
            staffName = staffRepository.findByIdAndIsDeletedFalse(complaint.getAssignedStaffId())
                .map(Staff::getFullName)
                .orElse("Unknown Staff");
        }
        
        return complaintMapper.toResponseDTO(complaint, residentName, staffName);
    }
    
    private List<ComplaintSummaryDTO> buildSummaryList(List<Complaint> complaints) {
        List<String> residentIds = complaints.stream().map(Complaint::getResidentId).distinct().collect(Collectors.toList());
        List<String> staffIds = complaints.stream().map(Complaint::getAssignedStaffId).filter(id -> id != null).distinct().collect(Collectors.toList());
        
        Map<String, String> residentNames = residentRepository.findAllById(residentIds).stream()
                .collect(Collectors.toMap(Resident::getId, Resident::getFullName));
        Map<String, String> staffNames = staffRepository.findAllById(staffIds).stream()
                .collect(Collectors.toMap(Staff::getId, Staff::getFullName));
                
        return complaints.stream().map(c -> complaintMapper.toSummaryDTO(
                c, 
                residentNames.getOrDefault(c.getResidentId(), "Unknown"), 
                c.getAssignedStaffId() != null ? staffNames.getOrDefault(c.getAssignedStaffId(), "Unassigned") : "Unassigned"
        )).collect(Collectors.toList());
    }

    private void validateAdminAccess(String targetSocietyId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !auth.getName().equals("anonymousUser")) {
            String email = auth.getName();
            User user = userRepository.findByEmail(email).orElse(null);
            
            if (user != null) {
                if (user.getRole() == Role.SOCIETY_ADMIN && !user.getSocietyId().equals(targetSocietyId)) {
                    throw new AccessDeniedException("SOCIETY_ADMIN can only manage resources belonging to their own society.");
                }
                if (user.getRole() == Role.STAFF || user.getRole() == Role.RESIDENT) {
                     throw new AccessDeniedException("Insufficient privileges for this action.");
                }
            }
        }
    }
    
    private void validateStaffAccess(String targetSocietyId, String targetStaffId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !auth.getName().equals("anonymousUser")) {
            String email = auth.getName();
            User user = userRepository.findByEmail(email).orElse(null);
            
            if (user != null) {
                if (user.getRole() == Role.SOCIETY_ADMIN && !user.getSocietyId().equals(targetSocietyId)) {
                    throw new AccessDeniedException("SOCIETY_ADMIN can only manage resources belonging to their own society.");
                }
                if (user.getRole() == Role.STAFF) {
                    if (!user.getSocietyId().equals(targetSocietyId)) {
                        throw new AccessDeniedException("STAFF can only process complaints for their own society.");
                    }
                    Staff staff = staffRepository.findByUserIdAndIsDeletedFalse(user.getId())
                            .orElseThrow(() -> new ResourceNotFoundException("Staff profile not found"));
                    if (targetStaffId != null && !staff.getId().equals(targetStaffId)) {
                        throw new AccessDeniedException("STAFF can only process complaints directly assigned to them.");
                    }
                }
                if (user.getRole() == Role.RESIDENT) {
                    throw new AccessDeniedException("RESIDENT cannot perform staff execution operations.");
                }
            }
        }
    }
    
    private void validateResidentAccess(String targetSocietyId, String targetResidentId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !auth.getName().equals("anonymousUser")) {
            String email = auth.getName();
            User user = userRepository.findByEmail(email).orElse(null);
            
            if (user != null) {
                if (user.getRole() == Role.SOCIETY_ADMIN && !user.getSocietyId().equals(targetSocietyId)) {
                    throw new AccessDeniedException("SOCIETY_ADMIN can only manage resources belonging to their own society.");
                }
                if (user.getRole() == Role.STAFF) {
                    throw new AccessDeniedException("STAFF cannot perform resident operations.");
                }
                if (user.getRole() == Role.RESIDENT) {
                    Resident resident = residentRepository.findByUserIdAndIsDeletedFalse(user.getId())
                            .orElseThrow(() -> new ResourceNotFoundException("Resident profile not found"));
                    if (!resident.getId().equals(targetResidentId)) {
                        throw new AccessDeniedException("RESIDENT can only manage complaints assigned to their own profile.");
                    }
                }
            }
        }
    }
    
    private void validateReadAccess(Complaint complaint) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !auth.getName().equals("anonymousUser")) {
            String email = auth.getName();
            User user = userRepository.findByEmail(email).orElse(null);
            
            if (user != null) {
                if (user.getRole() == Role.SOCIETY_ADMIN && !user.getSocietyId().equals(complaint.getSocietyId())) {
                    throw new AccessDeniedException("SOCIETY_ADMIN can only view complaints in their own society.");
                }
                if (user.getRole() == Role.RESIDENT) {
                    Resident resident = residentRepository.findByUserIdAndIsDeletedFalse(user.getId())
                            .orElseThrow(() -> new ResourceNotFoundException("Resident profile not found"));
                    if (!resident.getId().equals(complaint.getResidentId())) {
                        throw new AccessDeniedException("RESIDENT can only view their own complaints.");
                    }
                }
                if (user.getRole() == Role.STAFF) {
                    Staff staff = staffRepository.findByUserIdAndIsDeletedFalse(user.getId())
                            .orElseThrow(() -> new ResourceNotFoundException("Staff profile not found"));
                    if (complaint.getAssignedStaffId() == null || !complaint.getAssignedStaffId().equals(staff.getId())) {
                        throw new AccessDeniedException("STAFF can only view complaints specifically assigned to them.");
                    }
                }
            }
        }
    }
}
