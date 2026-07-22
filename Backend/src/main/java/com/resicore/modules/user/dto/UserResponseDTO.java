package com.resicore.modules.user.dto;

import com.resicore.common.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Data Transfer Object for User responses.
 * Password is intentionally excluded.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDTO {
    
    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private Role role;
    private String profileImage;
    private boolean isEmailVerified;
    private boolean isPhoneVerified;
    private boolean isActive;
    private LocalDateTime lastLogin;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
