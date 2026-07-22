package com.resicore.modules.complaint.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AssignComplaintDTO {
    @NotBlank(message = "Staff ID is required for assignment")
    private String staffId;
}
