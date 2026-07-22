package com.resicore.common.util;

public final class ValidationUtils {

    private ValidationUtils() {}

    public static boolean isValidEmail(String email) {
        if (email == null) return false;
        return email.matches("^[A-Za-z0-9+_.-]+@(.+)$");
    }

    public static boolean isPasswordStrong(String password) {
        if (password == null) return false;
        return password.length() >= 8;
    }
}
