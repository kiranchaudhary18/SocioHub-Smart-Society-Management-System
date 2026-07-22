package com.resicore.modules.flat.dto;

import com.resicore.modules.flat.enums.FlatStatus;
import com.resicore.modules.flat.enums.FlatType;
import com.resicore.modules.flat.enums.OwnershipType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FlatRequestDTO {

    @NotBlank(message = "Society ID is required")
    private String societyId;

    @NotBlank(message = "Building ID is required")
    private String buildingId;

    @NotBlank(message = "Flat number is required")
    private String flatNumber;

    private Integer floorNumber;
    private String block;
    private String wing;

    private FlatType flatType;
    private FlatStatus status;
    private OwnershipType ownershipType;

    @Min(value = 0, message = "Area must be greater than or equal to 0")
    private Double areaSqFt;

    @Min(value = 0, message = "Carpet Area must be greater than or equal to 0")
    private Double carpetArea;

    private Integer bedrooms;
    private Integer bathrooms;
    private Integer balconies;
    private Integer parkingSlots;

    private String maintenanceCategory;

    @Min(value = 0, message = "Maintenance Amount must be greater than or equal to 0")
    private Double maintenanceAmount;
}
