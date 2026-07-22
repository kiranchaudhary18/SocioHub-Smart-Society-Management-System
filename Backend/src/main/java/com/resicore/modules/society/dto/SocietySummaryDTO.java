package com.resicore.modules.society.dto;

import com.resicore.modules.society.enums.SocietyStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SocietySummaryDTO {
    private String id;
    private String societyName;
    private String societyCode;
    private String city;
    private String state;
    private SocietyStatus status;
    private String logo;
    private Integer totalFlats;
    private Integer totalResidents;
}
