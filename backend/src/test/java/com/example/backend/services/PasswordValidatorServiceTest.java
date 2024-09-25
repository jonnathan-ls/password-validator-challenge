package com.example.backend.services;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

class PasswordValidatorServiceTest {

    private PasswordValidatorService passwordValidatorService;

    @BeforeEach
    void setUp() {
        passwordValidatorService = new PasswordValidatorService();
    }

    @Test
    @DisplayName("Should return false when the password is null")
    void testIsValid_NullPassword() {
        assertFalse(passwordValidatorService.isValid(null), "Null password should be invalid");
    }

    @Test
    @DisplayName("Should return false when the password has fewer than 8 characters")
    void testIsValid_ShortPassword() {
        assertFalse(passwordValidatorService.isValid("Ab1!"), "Password with fewer than 8 characters should be invalid");
    }

    @Test
    @DisplayName("Should return false when the password contains whitespace")
    void testIsValid_PasswordWithWhitespace() {
        assertFalse(passwordValidatorService.isValid("AbTp9 fok"), "Password containing whitespace should be invalid");
    }

    @Test
    @DisplayName("Should return false when the password contains duplicate characters")
    void testIsValid_DuplicateCharacters() {
        assertFalse(passwordValidatorService.isValid("AbTp9!foo"), "Password with duplicate characters should be invalid");
    }

    @Test
    @DisplayName("Should return false when the password does not contain digits")
    void testIsValid_NoDigit() {
        assertFalse(passwordValidatorService.isValid("AbTpi!fok"), "Password without digits should be invalid");
    }

    @Test
    @DisplayName("Should return false when the password does not contain lowercase letters")
    void testIsValid_NoLowercase() {
        assertFalse(passwordValidatorService.isValid("ABC1!DEF"), "Password without lowercase letters should be invalid");
    }

    @Test
    @DisplayName("Should return false when the password does not contain uppercase letters")
    void testIsValid_NoUppercase() {
        assertFalse(passwordValidatorService.isValid("abc1!def"), "Password without uppercase letters should be invalid");
    }

    @Test
    @DisplayName("Should return false when the password does not contain special characters")
    void testIsValid_NoSpecialCharacter() {
        assertFalse(passwordValidatorService.isValid("Abc12345"), "Password without special characters should be invalid");
    }

    @Test
    @DisplayName("Should return true for a valid password")
    void testIsValid_ValidPassword() {
        assertTrue(passwordValidatorService.isValid("AbTp9!fok"), "Valid password should be considered valid");
    }

    @Test
    @DisplayName("Should return false for password with invalid special character")
    void testIsValid_InvalidSpecialCharacter() {
        assertFalse(passwordValidatorService.isValid("AbTp9?fok"), "Password with invalid special character should be invalid");
    }

    @Test
    @DisplayName("Should return false for password with only repeated special characters")
    void testIsValid_RepeatedSpecialCharacters() {
        assertFalse(passwordValidatorService.isValid("AbTp9!!ok"), "Password with repeated special characters should be invalid");
    }
}
