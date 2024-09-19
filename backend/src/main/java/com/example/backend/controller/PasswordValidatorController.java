package com.example.backend.controller;

import com.example.backend.service.PasswordValidatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/password")
public class PasswordValidatorController {

    @Autowired
    private PasswordValidatorService validatorService;

    @PostMapping("/validate")
    public boolean validatePassword(@RequestBody String password) {
        return validatorService.isValid(password);
    }
}