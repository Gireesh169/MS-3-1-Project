
package com.klu.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.klu.entity.User;
import com.klu.repository.AuthRepository;
import com.klu.security.JwtService;

@Service
public class AuthService {

    private final AuthRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(
            AuthRepository repository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {

        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public void register(User user) {

        user.setPassword(
                passwordEncoder.encode(user.getPassword())
        );

        repository.save(user);
    }

    public String login(
            String username,
            String password) {

        User user =
                repository.findByUsername(username);

        if (user == null) {
            return null;
        }

        if (!passwordEncoder.matches(
                password,
                user.getPassword())) {

            return null;
        }

        return jwtService.generateToken(
                user.getUsername()
        );
    }
}