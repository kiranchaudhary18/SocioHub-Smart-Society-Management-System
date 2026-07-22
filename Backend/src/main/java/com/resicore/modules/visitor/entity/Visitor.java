package com.resicore.modules.visitor.entity;

import com.resicore.common.entity.BaseEntity;
import com.resicore.modules.resident.enums.Gender;
import com.resicore.modules.visitor.enums.IdProofType;
import com.resicore.modules.visitor.enums.Purpose;
import com.resicore.modules.visitor.enums.VisitorStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Document(collection = "visitor")
public class Visitor extends BaseEntity {

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

    @Builder.Default
    private VisitorStatus status = VisitorStatus.PENDING;

    private LocalDateTime expectedArrival;
    private LocalDateTime actualCheckIn;
    private LocalDateTime actualCheckOut;

    private String approvedByResidentId;
    private String checkedInByStaffId;
    private String checkedOutByStaffId;

    private String remarks;

    @Builder.Default
    private Boolean isDeleted = false;
}
