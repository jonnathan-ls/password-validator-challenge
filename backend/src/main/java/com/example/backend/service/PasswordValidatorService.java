package com.example.backend.service;

import org.springframework.stereotype.Service;

@Service
public class PasswordValidatorService {
    public boolean isValid(String password) {
        // Password validation criteria:
        // - Minimum 8 characters
        // - At least one uppercase letter
        // - At least one lowercase letter
        // - At least one digit
        // - At least one special character
        if (password == null || password.isEmpty()) {
            return false;
        }

        String regex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&+=!]).{8,}$";
        // Pending criteria not include blank spaces
        return password.matches(regex);
    }
}
