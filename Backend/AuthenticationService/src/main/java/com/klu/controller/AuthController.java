package com.klu.controller;


import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.klu.dto.LoginInRequest;
import com.klu.entity.User;
import com.klu.service.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public String register(
            @RequestBody User user) {

        authService.register(user);

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