package com.resicore.common.util;

import com.resicore.common.constant.AppConstants;

public final class JwtUtils {
    
    private JwtUtils() {}
    
    public static String extractTokenFromHeader(String authHeader) {
        if (authHeader != null && authHeader.startsWith(AppConstants.JwtConstants.BEARER_PREFIX)) {
            return authHeader.substring(AppConstants.JwtConstants.BEARER_PREFIX.length());
        }
        return null;
    }
    
    public static String buildBearerToken(String token) {
        return AppConstants.JwtConstants.BEARER_PREFIX + token;
    }
}
