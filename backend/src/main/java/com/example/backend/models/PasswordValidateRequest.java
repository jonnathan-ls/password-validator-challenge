package com.example.backend.models;

/**
 * Model representing the request body for password validation.
 */
public class PasswordValidateRequest {
    private String password;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}