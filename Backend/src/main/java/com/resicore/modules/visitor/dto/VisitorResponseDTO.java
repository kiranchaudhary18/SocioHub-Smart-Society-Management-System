package com.resicore.modules.visitor.dto;

import com.resicore.modules.resident.enums.Gender;
import com.resicore.modules.visitor.enums.IdProofType;
import com.resicore.modules.visitor.enums.Purpose;
import com.resicore.modules.visitor.enums.VisitorStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VisitorResponseDTO {
    private String id;
    private String visitorCode;
    
    private String firstName;
    private String lastName;
    private String fullName;
    private String phone;
    private String email;
    private Gender gender;
    private String photo;

    private IdProofType idProofType;
    private String idProofNumber;
    private String vehicleNumber;
    private String companyName;

    private Purpose purpose;

    private String residentId;
    private String societyId;
    private String buildingId;
    private String flatId;

    private String hostName;

    private VisitorStatus status;

    private LocalDateTime expectedArrival;
    private LocalDateTime actualCheckIn;
    private LocalDateTime actualCheckOut;

    private String approvedByResidentId;
    private String checkedInByStaffId;
    private String checkedOutByStaffId;

    private String remarks;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
