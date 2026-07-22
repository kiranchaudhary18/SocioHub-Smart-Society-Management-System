package com.resicore.modules.visitor.dto;

import com.resicore.modules.resident.enums.Gender;
import com.resicore.modules.visitor.enums.IdProofType;
import com.resicore.modules.visitor.enums.Purpose;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VisitorRequestDTO {

    @NotBlank(message = "Resident ID is required")
    private String residentId;

    @NotBlank(message = "First name is required")
    private String firstName;

    private String lastName;

    @NotBlank(message = "Phone number is required")
    private String phone;

    private String email;
    private Gender gender;
    
    private IdProofType idProofType;
    private String idProofNumber;
    private String vehicleNumber;
    private String companyName;

    @NotNull(message = "Purpose is required")
    private Purpose purpose;

    private LocalDateTime expectedArrival;
    private String remarks;
}
