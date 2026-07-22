package com.resicore.modules.familymember.mapper;

import com.resicore.modules.familymember.dto.FamilyMemberRequestDTO;
import com.resicore.modules.familymember.dto.FamilyMemberResponseDTO;
import com.resicore.modules.familymember.dto.FamilyMemberSummaryDTO;
import com.resicore.modules.familymember.entity.FamilyMember;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class FamilyMemberMapper {

    public FamilyMember toEntity(FamilyMemberRequestDTO dto, String societyId, String buildingId, String flatId) {
        if (dto == null) {
            return null;
        }

        String lastName = dto.getLastName() != null ? dto.getLastName() : "";
        String fullName = dto.getFirstName() + (lastName.isEmpty() ? "" : " " + lastName);

        return FamilyMember.builder()
                .residentId(dto.getResidentId())
                .societyId(societyId)
                .buildingId(buildingId)
                .flatId(flatId)
                .firstName(dto.getFirstName())
                .lastName(lastName)
                .fullName(fullName)
                .relationship(dto.getRelationship())
                .gender(dto.getGender())
                .dateOfBirth(dto.getDateOfBirth())
                .bloodGroup(dto.getBloodGroup())
                .phone(dto.getPhone())
                .email(dto.getEmail())
                .occupation(dto.getOccupation())
                .aadhaarNumber(dto.getAadhaarNumber())
                .isEmergencyContact(dto.getIsEmergencyContact() != null ? dto.getIsEmergencyContact() : false)
                .status(dto.getStatus())
                .notes(dto.getNotes())
                .build();
    }

    public void updateEntityFromDto(FamilyMemberRequestDTO dto, FamilyMember entity) {
        if (dto == null || entity == null) {
            return;
        }

        String lastName = dto.getLastName() != null ? dto.getLastName() : "";
        String fullName = dto.getFirstName() + (lastName.isEmpty() ? "" : " " + lastName);

        entity.setFirstName(dto.getFirstName());
        entity.setLastName(lastName);
        entity.setFullName(fullName);
        entity.setRelationship(dto.getRelationship());
        entity.setGender(dto.getGender());
        entity.setDateOfBirth(dto.getDateOfBirth());
        entity.setBloodGroup(dto.getBloodGroup());
        entity.setPhone(dto.getPhone());
        entity.setEmail(dto.getEmail());
        entity.setOccupation(dto.getOccupation());
        entity.setAadhaarNumber(dto.getAadhaarNumber());
        
        if (dto.getIsEmergencyContact() != null) {
            entity.setIsEmergencyContact(dto.getIsEmergencyContact());
        }
        if (dto.getStatus() != null) {
            entity.setStatus(dto.getStatus());
        }
        
        entity.setNotes(dto.getNotes());
    }

    public FamilyMemberResponseDTO toResponseDTO(FamilyMember entity) {
        if (entity == null) {
            return null;
        }

        return FamilyMemberResponseDTO.builder()
                .id(entity.getId())
                .residentId(entity.getResidentId())
                .societyId(entity.getSocietyId())
                .buildingId(entity.getBuildingId())
                .flatId(entity.getFlatId())
                .firstName(entity.getFirstName())
                .lastName(entity.getLastName())
                .fullName(entity.getFullName())
                .relationship(entity.getRelationship())
                .gender(entity.getGender())
                .dateOfBirth(entity.getDateOfBirth())
                .bloodGroup(entity.getBloodGroup())
                .phone(entity.getPhone())
                .email(entity.getEmail())
                .occupation(entity.getOccupation())
                .aadhaarNumber(entity.getAadhaarNumber())
                .profilePhoto(entity.getProfilePhoto())
                .isEmergencyContact(entity.getIsEmergencyContact())
                .isVerified(entity.getIsVerified())
                .status(entity.getStatus())
                .notes(entity.getNotes())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    public FamilyMemberSummaryDTO toSummaryDTO(FamilyMember entity) {
        if (entity == null) {
            return null;
        }

        return FamilyMemberSummaryDTO.builder()
                .id(entity.getId())
                .residentId(entity.getResidentId())
                .fullName(entity.getFullName())
                .relationship(entity.getRelationship())
                .phone(entity.getPhone())
                .status(entity.getStatus())
                .build();
    }

    public List<FamilyMemberSummaryDTO> toSummaryDTOs(List<FamilyMember> entities) {
        if (entities == null) {
            return null;
        }
        return entities.stream().map(this::toSummaryDTO).collect(Collectors.toList());
    }
}
