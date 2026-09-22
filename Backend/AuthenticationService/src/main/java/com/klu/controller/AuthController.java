package com.klu.controller;


import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.klu.dto.LoginInRequest;
import com.klu.dto.SignUpRequest;
import com.klu.service.AuthService;

import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public String register(
            @RequestBody SignUpRequest request) {

        authService.register(request);

        return "User registered successfully";
    }

    @PostMapping("/login")
    public String login(
            @RequestBody LoginInRequest request) {

        String token = authService.login(
                request.getUsername(),
                request.getPassword()
        );

        if (token == null) {
            return "Invalid username or password";
        }

        return token;
    }
    
}