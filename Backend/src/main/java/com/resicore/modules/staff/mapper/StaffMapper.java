package com.resicore.modules.staff.mapper;

import com.resicore.modules.staff.dto.StaffProfileDTO;
import com.resicore.modules.staff.dto.StaffRequestDTO;
import com.resicore.modules.staff.dto.StaffResponseDTO;
import com.resicore.modules.staff.dto.StaffSummaryDTO;
import com.resicore.modules.staff.entity.Staff;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class StaffMapper {

    public Staff toEntity(StaffRequestDTO dto) {
        if (dto == null) {
            return null;
        }

        String lastName = dto.getLastName() != null ? dto.getLastName() : "";
        String fullName = dto.getFirstName() + (lastName.isEmpty() ? "" : " " + lastName);

        return Staff.builder()
                .userId(dto.getUserId())
                .societyId(dto.getSocietyId())
                .employeeId(dto.getEmployeeId())
                .firstName(dto.getFirstName())
                .lastName(lastName)
                .fullName(fullName)
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .alternatePhone(dto.getAlternatePhone())
                .gender(dto.getGender())
                .dateOfBirth(dto.getDateOfBirth())
                .bloodGroup(dto.getBloodGroup())
                .department(dto.getDepartment())
                .designation(dto.getDesignation())
                .staffType(dto.getStaffType())
                .employmentType(dto.getEmploymentType())
                .joiningDate(dto.getJoiningDate())
                .salary(dto.getSalary())
                .shift(dto.getShift())
                .address(dto.getAddress())
                .city(dto.getCity())
                .state(dto.getState())
                .pincode(dto.getPincode())
                .aadhaarNumber(dto.getAadhaarNumber())
                .panNumber(dto.getPanNumber())
                .emergencyContactName(dto.getEmergencyContactName())
                .emergencyContactPhone(dto.getEmergencyContactPhone())
                .status(dto.getStatus())
                .notes(dto.getNotes())
                .build();
    }

    public void updateEntityFromDto(StaffRequestDTO dto, Staff entity) {
        if (dto == null || entity == null) {
            return;
        }

        String lastName = dto.getLastName() != null ? dto.getLastName() : "";
        String fullName = dto.getFirstName() + (lastName.isEmpty() ? "" : " " + lastName);

        entity.setEmployeeId(dto.getEmployeeId());
        entity.setFirstName(dto.getFirstName());
        entity.setLastName(lastName);
        entity.setFullName(fullName);
        entity.setEmail(dto.getEmail());
        entity.setPhone(dto.getPhone());
        entity.setAlternatePhone(dto.getAlternatePhone());
        entity.setGender(dto.getGender());
        entity.setDateOfBirth(dto.getDateOfBirth());
        entity.setBloodGroup(dto.getBloodGroup());
        entity.setDepartment(dto.getDepartment());
        entity.setDesignation(dto.getDesignation());
        entity.setStaffType(dto.getStaffType());
        entity.setEmploymentType(dto.getEmploymentType());
        entity.setJoiningDate(dto.getJoiningDate());
        entity.setSalary(dto.getSalary());
        entity.setShift(dto.getShift());
        entity.setAddress(dto.getAddress());
        entity.setCity(dto.getCity());
        entity.setState(dto.getState());
        entity.setPincode(dto.getPincode());
        entity.setAadhaarNumber(dto.getAadhaarNumber());
        entity.setPanNumber(dto.getPanNumber());
        entity.setEmergencyContactName(dto.getEmergencyContactName());
        entity.setEmergencyContactPhone(dto.getEmergencyContactPhone());
        
        if (dto.getStatus() != null) {
            entity.setStatus(dto.getStatus());
        }
        
        entity.setNotes(dto.getNotes());
    }

    public StaffResponseDTO toResponseDTO(Staff entity) {
        if (entity == null) {
            return null;
        }

        return StaffResponseDTO.builder()
                .id(entity.getId())
                .userId(entity.getUserId())
                .societyId(entity.getSocietyId())
                .staffCode(entity.getStaffCode())
                .employeeId(entity.getEmployeeId())
                .firstName(entity.getFirstName())
                .lastName(entity.getLastName())
                .fullName(entity.getFullName())
                .email(entity.getEmail())
                .phone(entity.getPhone())
                .alternatePhone(entity.getAlternatePhone())
                .profilePhoto(entity.getProfilePhoto())
                .gender(entity.getGender())
                .dateOfBirth(entity.getDateOfBirth())
                .bloodGroup(entity.getBloodGroup())
                .department(entity.getDepartment())
                .designation(entity.getDesignation())
                .staffType(entity.getStaffType())
                .employmentType(entity.getEmploymentType())
                .joiningDate(entity.getJoiningDate())
                .salary(entity.getSalary())
                .shift(entity.getShift())
                .address(entity.getAddress())
                .city(entity.getCity())
                .state(entity.getState())
                .pincode(entity.getPincode())
                .aadhaarNumber(entity.getAadhaarNumber())
                .panNumber(entity.getPanNumber())
                .emergencyContactName(entity.getEmergencyContactName())
                .emergencyContactPhone(entity.getEmergencyContactPhone())
                .status(entity.getStatus())
                .notes(entity.getNotes())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    public StaffSummaryDTO toSummaryDTO(Staff entity) {
        if (entity == null) {
            return null;
        }

        return StaffSummaryDTO.builder()
                .id(entity.getId())
                .staffCode(entity.getStaffCode())
                .employeeId(entity.getEmployeeId())
                .fullName(entity.getFullName())
                .phone(entity.getPhone())
                .department(entity.getDepartment())
                .staffType(entity.getStaffType())
                .shift(entity.getShift())
                .status(entity.getStatus())
                .build();
    }

    public StaffProfileDTO toProfileDTO(Staff entity) {
        if (entity == null) {
            return null;
        }

        return StaffProfileDTO.builder()
                .id(entity.getId())
                .staffCode(entity.getStaffCode())
                .employeeId(entity.getEmployeeId())
                .fullName(entity.getFullName())
                .email(entity.getEmail())
                .phone(entity.getPhone())
                .profilePhoto(entity.getProfilePhoto())
                .gender(entity.getGender())
                .dateOfBirth(entity.getDateOfBirth())
                .bloodGroup(entity.getBloodGroup())
                .department(entity.getDepartment())
                .designation(entity.getDesignation())
                .staffType(entity.getStaffType())
                .employmentType(entity.getEmploymentType())
                .shift(entity.getShift())
                .joiningDate(entity.getJoiningDate())
                .status(entity.getStatus())
                .build();
    }

    public List<StaffSummaryDTO> toSummaryDTOs(List<Staff> entities) {
        if (entities == null) {
            return null;
        }
        return entities.stream().map(this::toSummaryDTO).collect(Collectors.toList());
    }
}
