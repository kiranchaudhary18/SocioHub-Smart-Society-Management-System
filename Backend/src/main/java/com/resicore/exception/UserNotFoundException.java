package com.resicore.exception;

/**
 * Exception thrown when a requested User is not found.
 */
public class UserNotFoundException extends RuntimeException {
    
    public UserNotFoundException(String message) {
        super(message);
    }
}
