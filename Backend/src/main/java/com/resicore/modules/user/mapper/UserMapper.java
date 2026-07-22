package com.resicore.modules.user.mapper;

import com.resicore.modules.user.dto.UserResponseDTO;
import com.resicore.modules.user.entity.User;
import org.springframework.stereotype.Component;

/**
 * Mapper for converting between User entity and its DTOs.
 */
@Component
public class UserMapper {

    /**
     * Converts a User entity to a UserResponseDTO.
     *
     * @param user the user entity
     * @return the UserResponseDTO
     */
    public UserResponseDTO toResponseDTO(User user) {
        if (user == null) {
            return null;
        }

        return UserResponseDTO.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .role(user.getRole())
                .profileImage(user.getProfileImage())
                .isEmailVerified(user.isEmailVerified())
                .isPhoneVerified(user.isPhoneVerified())
                .isActive(user.isActive())
                .lastLogin(user.getLastLogin())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }
}
