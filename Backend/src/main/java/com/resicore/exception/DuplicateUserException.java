package com.resicore.exception;

/**
 * Exception thrown when attempting to create a user that already exists.
 */
public class DuplicateUserException extends RuntimeException {
    
    public DuplicateUserException(String message) {
        super(message);
    }
}
