package com.example.backend.services;

import java.util.Set;
import java.util.HashSet;

import org.springframework.stereotype.Service;

/**
 * Service that provides password validation logic based on specific criteria.
 */
@Service
public class PasswordValidatorService {
    /**
     * Set of allowed special characters for password validation.
     */
    private static final Set<Character> SPECIAL_CHARACTERS = 
        Set.of('!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '+');

    /**
     * Set to track characters checked for repeated usage.
     */
    private static final Set<Character> checkedCharacters = new HashSet<>();

    /**
     * Validates the given password based on the following rules:
     * 
     * - The password must have at least 8 characters.
     * - It must contain at least one digit, one lowercase letter, one uppercase letter, and one special character.
     * - The password must not contain any whitespace.
     * - No character should repeat in the password.
     *
     * @param password the password string to be validated
     * @return {@code true} if the password is valid, {@code false} otherwise
     */
    public boolean isValid(String password) {
        if (password == null || password.length() < 8)
            return false;
        
        boolean hasDigit = false;
        boolean hasLowercase = false;
        boolean hasUppercase = false;
        boolean hasSpecialChar = false;
        
        checkedCharacters.clear();
        for (char ch : password.toCharArray()) {
            if (Character.isWhitespace(ch))
                return false;
            if (checkedCharacters.contains(ch))
                return false;
            checkedCharacters.add(ch);
            if (Character.isDigit(ch))
                hasDigit = true;
            else if (Character.isLowerCase(ch))
                hasLowercase = true;
            else if (Character.isUpperCase(ch))
                hasUppercase = true;
            else if (SPECIAL_CHARACTERS.contains(ch))
                hasSpecialChar = true;
        }
        return hasDigit && hasLowercase && hasUppercase && hasSpecialChar;
    }
}
