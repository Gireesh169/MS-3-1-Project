package com.klu.entity;

import com.klu.enums.PlanType;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "subscription_plans")
@Getter
@Setter
public class SubscriptionPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private PlanType planType;

    private double price;

    private boolean canView;

    private boolean canDownload;

    private boolean canAccessBooks;

    private boolean canAccessJournals;

    private boolean canAccessResearch;
}