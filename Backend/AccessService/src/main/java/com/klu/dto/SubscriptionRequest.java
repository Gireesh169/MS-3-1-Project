package com.klu.dto;

import com.klu.enums.PlanType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SubscriptionRequest {

    @NotBlank(message = "Username is required")
    private String username;

    @NotNull(message = "Plan type is required")
    private PlanType planType;
}