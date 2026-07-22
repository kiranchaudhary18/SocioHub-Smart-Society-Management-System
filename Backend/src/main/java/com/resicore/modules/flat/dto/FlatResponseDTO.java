package com.resicore.modules.flat.dto;

import com.resicore.modules.flat.enums.FlatStatus;
import com.resicore.modules.flat.enums.FlatType;
import com.resicore.modules.flat.enums.OwnershipType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FlatResponseDTO {
    private String id;
    private String societyId;
    private String buildingId;
    private String flatNumber;
    private Integer floorNumber;
    private String block;
    private String wing;
    private FlatType flatType;
    private FlatStatus status;
    private OwnershipType ownershipType;
    private Double areaSqFt;
    private Double carpetArea;
    private Integer bedrooms;
    private Integer bathrooms;
    private Integer balconies;
    private Integer parkingSlots;
    private String maintenanceCategory;
    private Double maintenanceAmount;
    private Boolean isOccupied;
    private String currentResidentId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
