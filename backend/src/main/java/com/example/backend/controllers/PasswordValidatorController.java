package com.example.backend.controllers;

import org.springframework.web.bind.annotation.*;

import com.example.backend.models.PasswordValidateRequest;
import com.example.backend.services.PasswordValidatorService;

import org.springframework.beans.factory.annotation.Autowired;

/**
 * REST controller responsible for handling password validation requests.
 */
@RestController
@RequestMapping("/password")
public class PasswordValidatorController {

    /**
     * Service that provides the password validation logic.
     */
    @Autowired
    private PasswordValidatorService validatorService;

    /**
     * Validates the given password based on the rules defined in the {@link PasswordValidatorService}.
     *
     * @param requestBody the request body containing the password to validate, encapsulated in a {@link PasswordValidateRequest}
     * @return {@code true} if the password is valid, {@code false} otherwise
     */
    @PostMapping("/validate")
    public boolean validatePassword(@RequestBody PasswordValidateRequest requestBody) {
        String pwd = requestBody.getPassword();
        return pwd.length() == 0 ? false : validatorService.isValid(pwd);
    }
}