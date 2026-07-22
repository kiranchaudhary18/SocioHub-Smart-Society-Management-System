package com.resicore.modules.visitor.dto;

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
public class VisitorSummaryDTO {
    private String id;
    private String visitorCode;
    private String fullName;
    private String phone;
    private Purpose purpose;
    private String hostName;
    private String vehicleNumber;
    private VisitorStatus status;
    private LocalDateTime expectedArrival;
    private LocalDateTime actualCheckIn;
    private LocalDateTime actualCheckOut;
}
