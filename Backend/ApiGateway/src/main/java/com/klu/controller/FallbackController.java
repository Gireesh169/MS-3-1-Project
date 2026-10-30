package com.klu.controller;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/fallback")
public class FallbackController {

    @RequestMapping("/auth")
    public ResponseEntity<Map<String, Object>> authFallback() {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("message", "Authentication service is temporarily unavailable");
        response.put("service", "AUTHENTICATIONSERVICE");
        response.put("status", HttpStatus.SERVICE_UNAVAILABLE.value());
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(response);
    }

    @RequestMapping("/content")
    public ResponseEntity<Map<String, Object>> contentFallback() {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("message", "Content service is temporarily unavailable");
        response.put("service", "CONTENT-SERVICE");
        response.put("status", HttpStatus.SERVICE_UNAVAILABLE.value());
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(response);
    }

    @RequestMapping("/access")
    public ResponseEntity<Map<String, Object>> accessFallback() {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("message", "Access service is temporarily unavailable");
        response.put("service", "ACCESS-SERVICE");
        response.put("status", HttpStatus.SERVICE_UNAVAILABLE.value());
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(response);
    }
}
