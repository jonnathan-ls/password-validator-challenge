package com.example.backend.controllers;

import org.springframework.web.bind.annotation.*;

import com.example.backend.models.PasswordValidateRequest;
import com.example.backend.services.PasswordValidatorService;

import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/password")
public class PasswordValidatorController {

    @Autowired
    private PasswordValidatorService validatorService;

    @PostMapping("/validate")
    public boolean validatePassword(@RequestBody PasswordValidateRequest requestBody) {
        String pwd = requestBody.getPassword();
        return pwd.length() == 0 ? false : validatorService.isValid(pwd);
    }
}