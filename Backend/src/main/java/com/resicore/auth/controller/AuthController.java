package com.resicore.auth.controller;

import com.resicore.auth.dto.JwtResponse;
import com.resicore.auth.dto.LoginRequest;
import com.resicore.auth.dto.SignupRequest;
import com.resicore.auth.service.AuthService;
import com.resicore.common.response.ApiResponse;
import com.resicore.modules.user.dto.UserResponseDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ApiResponse<UserResponseDTO> signup(@Valid @RequestBody SignupRequest request) {
        UserResponseDTO user = authService.registerUser(request);
        return ApiResponse.success("User registered successfully", user);
    }

    @PostMapping("/login")
    public ApiResponse<JwtResponse> login(@Valid @RequestBody LoginRequest request) {
        JwtResponse response = authService.loginUser(request);
        return ApiResponse.success("Login successful", response);
    }
}
