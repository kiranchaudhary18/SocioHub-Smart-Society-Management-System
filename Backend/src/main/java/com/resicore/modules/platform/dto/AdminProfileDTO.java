package com.resicore.modules.platform.dto;

import com.resicore.common.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminProfileDTO {
    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private Role role;
    private String societyId;
    private Boolean isActive;
    private LocalDateTime createdAt;
}
