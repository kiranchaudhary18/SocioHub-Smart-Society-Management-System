package com.resicore.modules.community.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EventRegistrationDTO {
    private String id;
    private String eventId;
    private String residentId;
    private LocalDateTime registrationDate;
    private String paymentId;
    private String status;
    private Boolean checkedIn;
    private LocalDateTime checkedInAt;
}
