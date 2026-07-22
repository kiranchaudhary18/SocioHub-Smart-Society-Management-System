package com.resicore.modules.society.mapper;

import com.resicore.modules.society.dto.SocietyRequestDTO;
import com.resicore.modules.society.dto.SocietyResponseDTO;
import com.resicore.modules.society.dto.SocietySummaryDTO;
import com.resicore.modules.society.entity.Society;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class SocietyMapper {

    public Society toEntity(SocietyRequestDTO dto) {
        if (dto == null) {
            return null;
        }

        return Society.builder()
                .societyName(dto.getSocietyName())
                .registrationNumber(dto.getRegistrationNumber())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .website(dto.getWebsite())
                .description(dto.getDescription())
                .logo(dto.getLogo())
                .coverImage(dto.getCoverImage())
                .country(dto.getCountry())
                .state(dto.getState())
                .city(dto.getCity())
                .address(dto.getAddress())
                .pincode(dto.getPincode())
                .latitude(dto.getLatitude())
                .longitude(dto.getLongitude())
                .timezone(dto.getTimezone())
                .currency(dto.getCurrency())
                .build();
    }

    public void updateEntityFromDto(SocietyRequestDTO dto, Society entity) {
        if (dto == null || entity == null) {
            return;
        }
        
        entity.setSocietyName(dto.getSocietyName());
        entity.setRegistrationNumber(dto.getRegistrationNumber());
        entity.setEmail(dto.getEmail());
        entity.setPhone(dto.getPhone());
        entity.setWebsite(dto.getWebsite());
        entity.setDescription(dto.getDescription());
        entity.setLogo(dto.getLogo());
        entity.setCoverImage(dto.getCoverImage());
        entity.setCountry(dto.getCountry());
        entity.setState(dto.getState());
        entity.setCity(dto.getCity());
        entity.setAddress(dto.getAddress());
        entity.setPincode(dto.getPincode());
        entity.setLatitude(dto.getLatitude());
        entity.setLongitude(dto.getLongitude());
        entity.setTimezone(dto.getTimezone());
        entity.setCurrency(dto.getCurrency());
    }

    public SocietyResponseDTO toResponseDTO(Society entity) {
        if (entity == null) {
            return null;
        }

        return SocietyResponseDTO.builder()
                .id(entity.getId())
                .societyName(entity.getSocietyName())
                .societyCode(entity.getSocietyCode())
                .registrationNumber(entity.getRegistrationNumber())
                .email(entity.getEmail())
                .phone(entity.getPhone())
                .website(entity.getWebsite())
                .description(entity.getDescription())
                .status(entity.getStatus())
                .logo(entity.getLogo())
                .coverImage(entity.getCoverImage())
                .country(entity.getCountry())
                .state(entity.getState())
                .city(entity.getCity())
                .address(entity.getAddress())
                .pincode(entity.getPincode())
                .latitude(entity.getLatitude())
                .longitude(entity.getLongitude())
                .timezone(entity.getTimezone())
                .currency(entity.getCurrency())
                .totalBuildings(entity.getTotalBuildings())
                .totalFlats(entity.getTotalFlats())
                .totalResidents(entity.getTotalResidents())
                .totalStaff(entity.getTotalStaff())
                .amenitiesCount(entity.getAmenitiesCount())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    public SocietySummaryDTO toSummaryDTO(Society entity) {
        if (entity == null) {
            return null;
        }

        return SocietySummaryDTO.builder()
                .id(entity.getId())
                .societyName(entity.getSocietyName())
                .societyCode(entity.getSocietyCode())
                .city(entity.getCity())
                .state(entity.getState())
                .status(entity.getStatus())
                .logo(entity.getLogo())
                .totalFlats(entity.getTotalFlats())
                .totalResidents(entity.getTotalResidents())
                .build();
    }

    public List<SocietySummaryDTO> toSummaryDTOs(List<Society> entities) {
        if (entities == null) {
            return null;
        }
        return entities.stream().map(this::toSummaryDTO).collect(Collectors.toList());
    }
}
