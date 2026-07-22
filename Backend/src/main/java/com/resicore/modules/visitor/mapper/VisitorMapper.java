package com.resicore.modules.visitor.mapper;

import com.resicore.modules.visitor.dto.VisitorRequestDTO;
import com.resicore.modules.visitor.dto.VisitorResponseDTO;
import com.resicore.modules.visitor.dto.VisitorSummaryDTO;
import com.resicore.modules.visitor.entity.Visitor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class VisitorMapper {

    public Visitor toEntity(VisitorRequestDTO dto) {
        if (dto == null) {
            return null;
        }

        String lastName = dto.getLastName() != null ? dto.getLastName() : "";
        String fullName = dto.getFirstName() + (lastName.isEmpty() ? "" : " " + lastName);

        return Visitor.builder()
                .residentId(dto.getResidentId())
                .firstName(dto.getFirstName())
                .lastName(lastName)
                .fullName(fullName)
                .phone(dto.getPhone())
                .email(dto.getEmail())
                .gender(dto.getGender())
                .idProofType(dto.getIdProofType())
                .idProofNumber(dto.getIdProofNumber())
                .vehicleNumber(dto.getVehicleNumber())
                .companyName(dto.getCompanyName())
                .purpose(dto.getPurpose())
                .expectedArrival(dto.getExpectedArrival())
                .remarks(dto.getRemarks())
                .build();
    }

    public void updateEntityFromDto(VisitorRequestDTO dto, Visitor entity) {
        if (dto == null || entity == null) {
            return;
        }

        String lastName = dto.getLastName() != null ? dto.getLastName() : "";
        String fullName = dto.getFirstName() + (lastName.isEmpty() ? "" : " " + lastName);

        entity.setResidentId(dto.getResidentId());
        entity.setFirstName(dto.getFirstName());
        entity.setLastName(lastName);
        entity.setFullName(fullName);
        entity.setPhone(dto.getPhone());
        entity.setEmail(dto.getEmail());
        entity.setGender(dto.getGender());
        entity.setIdProofType(dto.getIdProofType());
        entity.setIdProofNumber(dto.getIdProofNumber());
        entity.setVehicleNumber(dto.getVehicleNumber());
        entity.setCompanyName(dto.getCompanyName());
        entity.setPurpose(dto.getPurpose());
        entity.setExpectedArrival(dto.getExpectedArrival());
        
        if (dto.getRemarks() != null && !dto.getRemarks().isBlank()) {
            entity.setRemarks(dto.getRemarks());
        }
    }

    public VisitorResponseDTO toResponseDTO(Visitor entity) {
        if (entity == null) {
            return null;
        }

        return VisitorResponseDTO.builder()
                .id(entity.getId())
                .visitorCode(entity.getVisitorCode())
                .firstName(entity.getFirstName())
                .lastName(entity.getLastName())
                .fullName(entity.getFullName())
                .phone(entity.getPhone())
                .email(entity.getEmail())
                .gender(entity.getGender())
                .photo(entity.getPhoto())
                .idProofType(entity.getIdProofType())
                .idProofNumber(entity.getIdProofNumber())
                .vehicleNumber(entity.getVehicleNumber())
                .companyName(entity.getCompanyName())
                .purpose(entity.getPurpose())
                .residentId(entity.getResidentId())
                .societyId(entity.getSocietyId())
                .buildingId(entity.getBuildingId())
                .flatId(entity.getFlatId())
                .hostName(entity.getHostName())
                .status(entity.getStatus())
                .expectedArrival(entity.getExpectedArrival())
                .actualCheckIn(entity.getActualCheckIn())
                .actualCheckOut(entity.getActualCheckOut())
                .approvedByResidentId(entity.getApprovedByResidentId())
                .checkedInByStaffId(entity.getCheckedInByStaffId())
                .checkedOutByStaffId(entity.getCheckedOutByStaffId())
                .remarks(entity.getRemarks())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    public VisitorSummaryDTO toSummaryDTO(Visitor entity) {
        if (entity == null) {
            return null;
        }

        return VisitorSummaryDTO.builder()
                .id(entity.getId())
                .visitorCode(entity.getVisitorCode())
                .fullName(entity.getFullName())
                .phone(entity.getPhone())
                .purpose(entity.getPurpose())
                .hostName(entity.getHostName())
                .vehicleNumber(entity.getVehicleNumber())
                .status(entity.getStatus())
                .expectedArrival(entity.getExpectedArrival())
                .actualCheckIn(entity.getActualCheckIn())
                .actualCheckOut(entity.getActualCheckOut())
                .build();
    }
    
    public List<VisitorSummaryDTO> toSummaryDTOs(List<Visitor> entities) {
        if (entities == null) {
            return null;
        }
        return entities.stream().map(this::toSummaryDTO).collect(Collectors.toList());
    }
}
