package com.resicore.modules.complaint.mapper;

import com.resicore.modules.complaint.dto.ComplaintRequestDTO;
import com.resicore.modules.complaint.dto.ComplaintResponseDTO;
import com.resicore.modules.complaint.dto.ComplaintSummaryDTO;
import com.resicore.modules.complaint.dto.ComplaintUpdateDTO;
import com.resicore.modules.complaint.entity.Complaint;
import org.springframework.stereotype.Component;

@Component
public class ComplaintMapper {

    public Complaint toEntity(ComplaintRequestDTO dto) {
        if (dto == null) {
            return null;
        }

        return Complaint.builder()
                .residentId(dto.getResidentId())
                .title(dto.getTitle())
                .description(dto.getDescription())
                .category(dto.getCategory())
                .priority(dto.getPriority())
                .attachments(dto.getAttachments())
                .build();
    }

    public void updateEntityFromDto(ComplaintUpdateDTO dto, Complaint entity) {
        if (dto == null || entity == null) {
            return;
        }

        if (dto.getTitle() != null && !dto.getTitle().isBlank()) {
            entity.setTitle(dto.getTitle());
        }
        if (dto.getDescription() != null && !dto.getDescription().isBlank()) {
            entity.setDescription(dto.getDescription());
        }
        if (dto.getCategory() != null) {
            entity.setCategory(dto.getCategory());
        }
        if (dto.getPriority() != null) {
            entity.setPriority(dto.getPriority());
        }
        if (dto.getAttachments() != null && !dto.getAttachments().isEmpty()) {
            entity.setAttachments(dto.getAttachments());
        }
    }

    public ComplaintResponseDTO toResponseDTO(Complaint entity, String residentName, String assignedStaffName) {
        if (entity == null) {
            return null;
        }

        return ComplaintResponseDTO.builder()
                .id(entity.getId())
                .complaintNumber(entity.getComplaintNumber())
                .title(entity.getTitle())
                .description(entity.getDescription())
                .category(entity.getCategory())
                .priority(entity.getPriority())
                .status(entity.getStatus())
                .residentId(entity.getResidentId())
                .residentName(residentName)
                .societyId(entity.getSocietyId())
                .buildingId(entity.getBuildingId())
                .flatId(entity.getFlatId())
                .assignedStaffId(entity.getAssignedStaffId())
                .assignedStaffName(assignedStaffName)
                .attachments(entity.getAttachments())
                .resolutionNotes(entity.getResolutionNotes())
                .rating(entity.getRating())
                .feedback(entity.getFeedback())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .resolvedAt(entity.getResolvedAt())
                .closedAt(entity.getClosedAt())
                .build();
    }

    public ComplaintSummaryDTO toSummaryDTO(Complaint entity, String residentName, String assignedStaffName) {
        if (entity == null) {
            return null;
        }

        return ComplaintSummaryDTO.builder()
                .id(entity.getId())
                .complaintNumber(entity.getComplaintNumber())
                .title(entity.getTitle())
                .category(entity.getCategory())
                .priority(entity.getPriority())
                .status(entity.getStatus())
                .residentName(residentName)
                .assignedStaffName(assignedStaffName)
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }
}
