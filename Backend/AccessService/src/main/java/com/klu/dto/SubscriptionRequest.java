package com.klu.dto;

import com.klu.enums.PlanType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;


public class SubscriptionRequest {

    @NotBlank(message = "Username is required")
    private String username;

    @NotNull(message = "Plan type is required")
    private PlanType planType;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public PlanType getPlanType() {
		return planType;
	}

	public void setPlanType(PlanType planType) {
		this.planType = planType;
	}
}