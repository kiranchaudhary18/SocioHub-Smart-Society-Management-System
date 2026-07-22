package com.resicore.common.constant;

public final class AppConstants {
    private AppConstants() {}

    public static final class JwtConstants {
        private JwtConstants() {}
        public static final String BEARER_PREFIX = "Bearer ";
        public static final String AUTHORIZATION_HEADER = "Authorization";
    }

    public static final class ApiConstants {
        private ApiConstants() {}
        public static final String BASE_URL = "/api";
        public static final String API_V1 = "/v1";
        public static final String HEALTH_CHECK = BASE_URL + "/health";
    }

    public static final class MessageConstants {
        private MessageConstants() {}
        public static final String SUCCESS = "Operation completed successfully";
        public static final String FAILED = "Operation failed";
        public static final String UNAUTHORIZED = "Unauthorized access";
        public static final String VALIDATION_FAILED = "Validation failed for request";
    }

    public static final class SecurityConstants {
        private SecurityConstants() {}
        public static final String ROLE_PREFIX = "ROLE_";
        public static final String[] PUBLIC_URLS = {
                "/api/auth/**",
                "/api/test",
                "/api/health",
                "/v2/api-docs",
                "/v3/api-docs",
                "/v3/api-docs/**",
                "/swagger-resources",
                "/swagger-resources/**",
                "/configuration/ui",
                "/configuration/security",
                "/swagger-ui/**",
                "/webjars/**",
                "/swagger-ui.html"
        };
    }
    
    public static final class ValidationConstants {
        private ValidationConstants() {}
        public static final String REQUIRED_FIELD = "This field is required";
        public static final String INVALID_EMAIL = "Invalid email format";
        public static final String INVALID_PHONE = "Invalid phone number format";
        public static final String PASSWORD_MIN_LENGTH = "Password must be at least 8 characters long";
    }
}
