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
public class VisitorCheckOutDTO {
    @NotBlank(message = "Staff ID recording check-out is required")
    private String staffId;
    
    private String remarks;
}
