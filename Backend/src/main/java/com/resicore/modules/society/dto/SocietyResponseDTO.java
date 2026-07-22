package com.resicore.modules.society.dto;

import com.resicore.modules.society.enums.SocietyStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SocietyResponseDTO {
    private String id;
    private String societyName;
    private String societyCode;
    private String registrationNumber;
    private String email;
    private String phone;
    private String website;
    private String description;
    private SocietyStatus status;
    private String logo;
    private String coverImage;
    private String country;
    private String state;
    private String city;
    private String address;
    private String pincode;
    private Double latitude;
    private Double longitude;
    private String timezone;
    private String currency;
    private Integer totalBuildings;
    private Integer totalFlats;
    private Integer totalResidents;
    private Integer totalStaff;
    private Integer amenitiesCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
