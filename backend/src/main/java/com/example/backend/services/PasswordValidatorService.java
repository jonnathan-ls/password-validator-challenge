package com.example.backend.services;

import java.util.Set;
import java.util.HashSet;

import org.springframework.stereotype.Service;

@Service
public class PasswordValidatorService {
    private static final Set<Character> SPECIAL_CHARACTERS = 
        Set.of('!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '+');
    private static final Set<Character> checkedCharacters = new HashSet<>();

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
