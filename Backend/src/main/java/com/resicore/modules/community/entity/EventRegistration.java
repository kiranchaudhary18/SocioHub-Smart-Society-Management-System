package com.resicore.modules.community.entity;

import com.resicore.common.entity.BaseEntity;
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
@Document(collection = "event_registration")
public class EventRegistration extends BaseEntity {

    private String eventId;
    private String residentId;
    
    private LocalDateTime registrationDate;
    
    private String paymentId;
    
    private String status; // CONFIRMED, CANCELLED
    
    @Builder.Default
    private Boolean checkedIn = false;
    
    private LocalDateTime checkedInAt;
}
