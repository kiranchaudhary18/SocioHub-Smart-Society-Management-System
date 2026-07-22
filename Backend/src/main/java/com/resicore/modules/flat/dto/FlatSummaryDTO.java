package com.resicore.modules.flat.dto;

import com.resicore.modules.flat.enums.FlatStatus;
import com.resicore.modules.flat.enums.FlatType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FlatSummaryDTO {
    private String id;
    private String buildingId;
    private String flatNumber;
    private String block;
    private String wing;
    private FlatType flatType;
    private FlatStatus status;
    private Boolean isOccupied;
}
