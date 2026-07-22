package com.resicore.modules.flat.entity;

import com.resicore.common.entity.BaseEntity;
import com.resicore.modules.flat.enums.FlatStatus;
import com.resicore.modules.flat.enums.FlatType;
import com.resicore.modules.flat.enums.OwnershipType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Document(collection = "flats")
public class Flat extends BaseEntity {

    private String societyId;
    private String buildingId;
    
    private String flatNumber;
    private Integer floorNumber;
    private String block;
    private String wing;
    
    private FlatType flatType;
    
    @Builder.Default
    private FlatStatus status = FlatStatus.AVAILABLE;
    
    private OwnershipType ownershipType;
    
    private Double areaSqFt;
    private Double carpetArea;
    
    @Builder.Default
    private Integer bedrooms = 0;
    
    @Builder.Default
    private Integer bathrooms = 0;
    
    @Builder.Default
    private Integer balconies = 0;
    
    @Builder.Default
    private Integer parkingSlots = 0;
    
    private String maintenanceCategory;
    
    @Builder.Default
    private Double maintenanceAmount = 0.0;
    
    @Builder.Default
    private Boolean isOccupied = false;
    
    private String currentResidentId;
    
    @Builder.Default
    private Boolean isDeleted = false;
}
