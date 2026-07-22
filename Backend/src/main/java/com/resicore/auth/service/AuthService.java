package com.resicore.auth.service;

import com.resicore.auth.dto.JwtResponse;
import com.resicore.auth.dto.LoginRequest;
import com.resicore.auth.dto.SignupRequest;
import com.resicore.auth.jwt.JwtService;
import com.resicore.exception.InvalidCredentialsException;
import com.resicore.exception.PasswordMismatchException;
import com.resicore.exception.UserAlreadyExistsException;
import com.resicore.exception.UserNotFoundException;
import com.resicore.modules.user.dto.UserResponseDTO;
import com.resicore.modules.user.entity.User;
import com.resicore.modules.user.mapper.UserMapper;
import com.resicore.modules.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserMapper userMapper;
    private final CustomUserDetailsService userDetailsService;

    @Transactional
    public UserResponseDTO registerUser(SignupRequest request) {
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new PasswordMismatchException("Password and Confirm Password must match");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new UserAlreadyExistsException("Email is already registered");
        }
        if (userRepository.existsByPhone(request.getPhone())) {
            throw new UserAlreadyExistsException("Phone number is already registered");
        }

        User user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .isActive(true)
                .isEmailVerified(false)
                .isPhoneVerified(false)
                .build();
                
        user.setDeleted(false);

        User savedUser = userRepository.save(user);
        return userMapper.toResponseDTO(savedUser);
    }

    public JwtResponse loginUser(LoginRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
        } catch (AuthenticationException e) {
            throw new InvalidCredentialsException("Invalid email or password");
        }

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);

        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
        String jwtToken = jwtService.generateToken(userDetails);

        return JwtResponse.builder()
                .accessToken(jwtToken)
                .expiresIn(86400000) // matches application.yml
                .role(user.getRole())
                .user(userMapper.toResponseDTO(user))
                .build();
    }
}
