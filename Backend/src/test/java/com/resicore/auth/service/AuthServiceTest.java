package com.resicore.auth.service;

import com.resicore.auth.dto.LoginRequest;
import com.resicore.auth.dto.SignupRequest;
import com.resicore.auth.jwt.JwtService;
import com.resicore.common.enums.Role;
import com.resicore.exception.InvalidCredentialsException;
import com.resicore.exception.PasswordMismatchException;
import com.resicore.exception.UserAlreadyExistsException;
import com.resicore.exception.UserNotFoundException;
import com.resicore.modules.user.entity.User;
import com.resicore.modules.user.mapper.UserMapper;
import com.resicore.modules.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private JwtService jwtService;
    @Mock
    private AuthenticationManager authenticationManager;
    @Mock
    private UserMapper userMapper;
    @Mock
    private CustomUserDetailsService userDetailsService;

    @InjectMocks
    private AuthService authService;

    private SignupRequest signupRequest;
    private LoginRequest loginRequest;

    @BeforeEach
    void setUp() {
        signupRequest = SignupRequest.builder()
                .firstName("John")
                .lastName("Doe")
                .email("john@example.com")
                .phone("1234567890")
                .password("password123")
                .confirmPassword("password123")
                .role(Role.RESIDENT)
                .build();

        loginRequest = LoginRequest.builder()
                .email("john@example.com")
                .password("password123")
                .build();
    }

    @Test
    void registerUser_Success() {
        when(userRepository.existsByEmail(any())).thenReturn(false);
        when(userRepository.existsByPhone(any())).thenReturn(false);
        when(passwordEncoder.encode(any())).thenReturn("encodedPassword");
        when(userRepository.save(any())).thenReturn(new User());

        assertDoesNotThrow(() -> authService.registerUser(signupRequest));
        verify(userRepository).save(any(User.class));
    }

    @Test
    void registerUser_PasswordMismatch_ThrowsException() {
        signupRequest.setConfirmPassword("differentPassword");
        assertThrows(PasswordMismatchException.class, () -> authService.registerUser(signupRequest));
    }

    @Test
    void registerUser_DuplicateEmail_ThrowsException() {
        when(userRepository.existsByEmail(any())).thenReturn(true);
        assertThrows(UserAlreadyExistsException.class, () -> authService.registerUser(signupRequest));
    }

    @Test
    void registerUser_DuplicatePhone_ThrowsException() {
        when(userRepository.existsByEmail(any())).thenReturn(false);
        when(userRepository.existsByPhone(any())).thenReturn(true);
        assertThrows(UserAlreadyExistsException.class, () -> authService.registerUser(signupRequest));
    }

    @Test
    void loginUser_Success() {
        User user = User.builder().email("john@example.com").role(Role.RESIDENT).build();
        when(userRepository.findByEmail("john@example.com")).thenReturn(Optional.of(user));
        when(userDetailsService.loadUserByUsername("john@example.com")).thenReturn(mock(UserDetails.class));
        when(jwtService.generateToken(any())).thenReturn("testToken");

        var response = authService.loginUser(loginRequest);
        assertNotNull(response);
        assertEquals("testToken", response.getAccessToken());
        verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
    }

    @Test
    void loginUser_WrongPassword_ThrowsException() {
        doThrow(new BadCredentialsException("Bad creds")).when(authenticationManager).authenticate(any());
        assertThrows(InvalidCredentialsException.class, () -> authService.loginUser(loginRequest));
    }

    @Test
    void loginUser_UnknownEmail_ThrowsException() {
        // authenticationManager might succeed, or maybe we just skip to findByEmail returning empty
        // In a real scenario, if UserDetails service throws, authManager throws.
        // But for this mock setup, let's assume authManager succeeds but findByEmail returns empty
        when(userRepository.findByEmail(any())).thenReturn(Optional.empty());
        assertThrows(UserNotFoundException.class, () -> authService.loginUser(loginRequest));
    }
}
