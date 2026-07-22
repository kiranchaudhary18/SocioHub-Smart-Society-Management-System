package com.resicore.modules.resident.mapper;

import com.resicore.modules.resident.dto.ResidentProfileDTO;
import com.resicore.modules.resident.dto.ResidentRequestDTO;
import com.resicore.modules.resident.dto.ResidentResponseDTO;
import com.resicore.modules.resident.dto.ResidentSummaryDTO;
import com.resicore.modules.resident.entity.Resident;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ResidentMapper {

    public Resident toEntity(ResidentRequestDTO dto) {
        if (dto == null) {
            return null;
        }

        return Resident.builder()
                .userId(dto.getUserId())
                .societyId(dto.getSocietyId())
                .buildingId(dto.getBuildingId())
                .flatId(dto.getFlatId())
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .fullName(dto.getFirstName() + " " + dto.getLastName())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .alternatePhone(dto.getAlternatePhone())
                .dateOfBirth(dto.getDateOfBirth())
                .gender(dto.getGender())
                .bloodGroup(dto.getBloodGroup())
                .occupation(dto.getOccupation())
                .aadhaarNumber(dto.getAadhaarNumber())
                .panNumber(dto.getPanNumber())
                .ownerType(dto.getOwnerType())
                .residentStatus(dto.getResidentStatus())
                .moveInDate(dto.getMoveInDate())
                .moveOutDate(dto.getMoveOutDate())
                .emergencyContactName(dto.getEmergencyContactName())
                .emergencyContactNumber(dto.getEmergencyContactNumber())
                .emergencyRelationship(dto.getEmergencyRelationship())
                .isPrimaryResident(dto.getIsPrimaryResident() != null ? dto.getIsPrimaryResident() : false)
                .notes(dto.getNotes())
                .build();
    }

    public void updateEntityFromDto(ResidentRequestDTO dto, Resident entity) {
        if (dto == null || entity == null) {
            return;
        }

        entity.setFirstName(dto.getFirstName());
        entity.setLastName(dto.getLastName());
        entity.setFullName(dto.getFirstName() + " " + dto.getLastName());
        entity.setEmail(dto.getEmail());
        entity.setPhone(dto.getPhone());
        entity.setAlternatePhone(dto.getAlternatePhone());
        entity.setDateOfBirth(dto.getDateOfBirth());
        entity.setGender(dto.getGender());
        entity.setBloodGroup(dto.getBloodGroup());
        entity.setOccupation(dto.getOccupation());
        entity.setAadhaarNumber(dto.getAadhaarNumber());
        entity.setPanNumber(dto.getPanNumber());
        entity.setOwnerType(dto.getOwnerType());
        
        if (dto.getResidentStatus() != null) {
            entity.setResidentStatus(dto.getResidentStatus());
        }
        
        entity.setMoveInDate(dto.getMoveInDate());
        entity.setMoveOutDate(dto.getMoveOutDate());
        entity.setEmergencyContactName(dto.getEmergencyContactName());
        entity.setEmergencyContactNumber(dto.getEmergencyContactNumber());
        entity.setEmergencyRelationship(dto.getEmergencyRelationship());
        
        if (dto.getIsPrimaryResident() != null) {
            entity.setIsPrimaryResident(dto.getIsPrimaryResident());
        }
        
        entity.setNotes(dto.getNotes());
    }

    public ResidentResponseDTO toResponseDTO(Resident entity) {
        if (entity == null) {
            return null;
        }

        return ResidentResponseDTO.builder()
                .id(entity.getId())
                .userId(entity.getUserId())
                .societyId(entity.getSocietyId())
                .buildingId(entity.getBuildingId())
                .flatId(entity.getFlatId())
                .residentCode(entity.getResidentCode())
                .firstName(entity.getFirstName())
                .lastName(entity.getLastName())
                .fullName(entity.getFullName())
                .email(entity.getEmail())
                .phone(entity.getPhone())
                .alternatePhone(entity.getAlternatePhone())
                .dateOfBirth(entity.getDateOfBirth())
                .gender(entity.getGender())
                .bloodGroup(entity.getBloodGroup())
                .occupation(entity.getOccupation())
                .aadhaarNumber(entity.getAadhaarNumber())
                .panNumber(entity.getPanNumber())
                .profilePhoto(entity.getProfilePhoto())
                .ownerType(entity.getOwnerType())
                .residentStatus(entity.getResidentStatus())
                .moveInDate(entity.getMoveInDate())
                .moveOutDate(entity.getMoveOutDate())
                .emergencyContactName(entity.getEmergencyContactName())
                .emergencyContactNumber(entity.getEmergencyContactNumber())
                .emergencyRelationship(entity.getEmergencyRelationship())
                .isPrimaryResident(entity.getIsPrimaryResident())
                .isVerified(entity.getIsVerified())
                .notes(entity.getNotes())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    public ResidentSummaryDTO toSummaryDTO(Resident entity) {
        if (entity == null) {
            return null;
        }

        return ResidentSummaryDTO.builder()
                .id(entity.getId())
                .flatId(entity.getFlatId())
                .residentCode(entity.getResidentCode())
                .fullName(entity.getFullName())
                .email(entity.getEmail())
                .phone(entity.getPhone())
                .ownerType(entity.getOwnerType())
                .residentStatus(entity.getResidentStatus())
                .isPrimaryResident(entity.getIsPrimaryResident())
                .build();
    }

    public ResidentProfileDTO toProfileDTO(Resident entity) {
        if (entity == null) {
            return null;
        }

        return ResidentProfileDTO.builder()
                .id(entity.getId())
                .flatId(entity.getFlatId())
                .residentCode(entity.getResidentCode())
                .fullName(entity.getFullName())
                .email(entity.getEmail())
                .phone(entity.getPhone())
                .dateOfBirth(entity.getDateOfBirth())
                .gender(entity.getGender())
                .bloodGroup(entity.getBloodGroup())
                .profilePhoto(entity.getProfilePhoto())
                .ownerType(entity.getOwnerType())
                .residentStatus(entity.getResidentStatus())
                .isPrimaryResident(entity.getIsPrimaryResident())
                .moveInDate(entity.getMoveInDate())
                .emergencyContactName(entity.getEmergencyContactName())
                .emergencyContactNumber(entity.getEmergencyContactNumber())
                .build();
    }

    public List<ResidentSummaryDTO> toSummaryDTOs(List<Resident> entities) {
        if (entities == null) {
            return null;
        }
        return entities.stream().map(this::toSummaryDTO).collect(Collectors.toList());
    }
}
