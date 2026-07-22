package com.resicore.modules.society.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SocietyRequestDTO {

    @NotBlank(message = "Society name is required")
    private String societyName;

    @NotBlank(message = "Registration number is required")
    private String registrationNumber;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^\\+?[1-9]\\d{1,14}$", message = "Invalid phone number format")
    private String phone;

    private String website;
    private String description;
    
    private String logo;
    private String coverImage;
    
    private String country;
    private String state;
    private String city;
    private String address;

    @NotBlank(message = "Pincode is required")
    @Pattern(regexp = "^[0-9]{5,6}$", message = "Invalid pincode format")
    private String pincode;

    private Double latitude;
    private Double longitude;
    
    private String timezone;
    private String currency;
}
