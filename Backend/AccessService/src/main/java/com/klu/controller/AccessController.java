package com.klu.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.klu.dto.PlanRequest;
import com.klu.dto.SubscriptionRequest;
import com.klu.entity.SubscriptionPlan;
import com.klu.entity.UserSubscription;
import com.klu.service.AccessService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/access")
public class AccessController {

    private final AccessService accessService;

    public AccessController(AccessService accessService) {
        this.accessService = accessService;
    }

    @PostMapping("/plans")
    public SubscriptionPlan createPlan(
            @Valid @RequestBody PlanRequest request) {

        return accessService.createPlan(request);
    }

    @PostMapping("/subscribe")
    public UserSubscription subscribe(
            @Valid @RequestBody SubscriptionRequest request) {

        return accessService.subscribeUser(request);
    }

    @GetMapping("/subscription/{username}")
    public ResponseEntity<UserSubscription> getSubscription(
            @PathVariable String username) {

        UserSubscription subscription =
                accessService.getSubscription(username);

        if (subscription == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(subscription);
    }

    @GetMapping("/view/{username}/{contentType}")
    public boolean canView(
            @PathVariable String username,
            @PathVariable String contentType) {

        return accessService.canView(username, contentType);
    }

    @GetMapping("/download/{username}/{contentType}")
    public boolean canDownload(
            @PathVariable String username,
            @PathVariable String contentType) {

        return accessService.canDownload(username, contentType);
    }
}