package com.klu.dto;

import com.klu.enums.PlanType;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PlanRequest {

    @NotNull(message = "Plan type is required")
    private PlanType planType;

    private double price;

    private boolean canView;

    private boolean canDownload;

    private boolean canAccessBooks;

    private boolean canAccessJournals;

    private boolean canAccessResearch;
}