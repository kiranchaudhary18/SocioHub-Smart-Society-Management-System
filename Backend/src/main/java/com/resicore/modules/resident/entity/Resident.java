package com.resicore.modules.resident.entity;

import com.resicore.common.entity.BaseEntity;
import com.resicore.modules.resident.enums.Gender;
import com.resicore.modules.resident.enums.OwnerType;
import com.resicore.modules.resident.enums.ResidentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Document(collection = "residents")
public class Resident extends BaseEntity {

    private String userId;
    private String societyId;
    private String buildingId;
    private String flatId;

    private String residentCode;

    private String firstName;
    private String lastName;
    private String fullName;

    private String email;
    private String phone;
    private String alternatePhone;

    private LocalDate dateOfBirth;
    private Gender gender;
    private String bloodGroup;
    private String occupation;

    private String aadhaarNumber;
    private String panNumber;

    private String profilePhoto;

    private OwnerType ownerType;
    
    @Builder.Default
    private ResidentStatus residentStatus = ResidentStatus.PENDING_APPROVAL;

    private LocalDate moveInDate;
    private LocalDate moveOutDate;

    private String emergencyContactName;
    private String emergencyContactNumber;
    private String emergencyRelationship;

    @Builder.Default
    private Boolean isPrimaryResident = false;

    @Builder.Default
    private Boolean isVerified = false;

    private String notes;

    @Builder.Default
    private Boolean isDeleted = false;
}
