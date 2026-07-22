package com.resicore.modules.visitor.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VisitorCheckInDTO {
    @NotBlank(message = "Staff ID recording check-in is required")
    private String staffId;
    
    private String photo;
    private String remarks;
}
