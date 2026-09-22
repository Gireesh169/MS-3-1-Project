package com.klu.entity;

import java.time.LocalDateTime;

import com.klu.enums.PlanType;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "user_subscriptions")
@Getter
@Setter
public class UserSubscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    @Enumerated(EnumType.STRING)
    private PlanType planType;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private boolean active;
}