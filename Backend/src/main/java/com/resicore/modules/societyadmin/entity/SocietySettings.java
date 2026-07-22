package com.resicore.modules.societyadmin.entity;

import com.resicore.common.entity.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Document(collection = "society_settings")
public class SocietySettings extends BaseEntity {

    @Indexed(unique = true)
    private String societyId;

    private String workingHours;
    private String visitorRules;
    private String amenityRules;
    private String complaintRules;
    private String billingRules;
}
