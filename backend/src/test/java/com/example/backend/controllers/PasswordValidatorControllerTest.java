package com.example.backend.controllers;

import java.lang.reflect.Field;

import com.example.backend.models.PasswordValidateRequest;
import com.example.backend.services.PasswordValidatorService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class PasswordValidatorControllerTest {

    private PasswordValidatorService pwdValidatorService;
    private PasswordValidatorController pwdValidatorController;

    @BeforeEach
    public void setUp() throws Exception {
        pwdValidatorController = new PasswordValidatorController();
        pwdValidatorService = new PasswordValidatorService();

        Field serviceField = PasswordValidatorController.class.getDeclaredField("validatorService");
        serviceField.setAccessible(true);
        serviceField.set(pwdValidatorController, pwdValidatorService);
    }

    @Test
    public void testValidatePassword_EmptyPassword() {
        PasswordValidateRequest request = new PasswordValidateRequest();
        request.setPassword("");

        boolean result = pwdValidatorController.validatePassword(request);

        assertFalse(result, "Empty password should return false");
    }

    @Test
    public void testValidatePassword_ValidPassword() {
        String password = "AbTp9!fok";
        PasswordValidateRequest request = new PasswordValidateRequest();
        request.setPassword(password);

        boolean result = pwdValidatorController.validatePassword(request);

        assertTrue(result, "Valid password should return true");
    }

    @Test
    public void testValidatePassword_InvalidPassword() {
        String password = "invalid";
        PasswordValidateRequest request = new PasswordValidateRequest();
        request.setPassword(password);

        boolean result = pwdValidatorController.validatePassword(request);

        assertFalse(result, "Invalid password should return false");
    }

}
