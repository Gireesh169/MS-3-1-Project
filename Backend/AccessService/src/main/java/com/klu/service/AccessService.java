package com.klu.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.klu.dto.PlanRequest;
import com.klu.dto.SubscriptionRequest;
import com.klu.entity.SubscriptionPlan;
import com.klu.entity.UserSubscription;
import com.klu.repository.SubscriptionPlanRepository;
import com.klu.repository.UserSubscriptionRepository;

@Service
public class AccessService {

    private final SubscriptionPlanRepository planRepository;
    private final UserSubscriptionRepository subscriptionRepository;

    public AccessService(
            SubscriptionPlanRepository planRepository,
            UserSubscriptionRepository subscriptionRepository) {

        this.planRepository = planRepository;
        this.subscriptionRepository = subscriptionRepository;
    }

 
    public SubscriptionPlan createPlan(PlanRequest request) {

        SubscriptionPlan plan = new SubscriptionPlan();

        plan.setPlanType(request.getPlanType());
        plan.setPrice(request.getPrice());
        plan.setCanView(request.isCanView());
        plan.setCanDownload(request.isCanDownload());
        plan.setCanAccessBooks(request.isCanAccessBooks());
        plan.setCanAccessJournals(request.isCanAccessJournals());
        plan.setCanAccessResearch(request.isCanAccessResearch());

        return planRepository.save(plan);
    }

    public UserSubscription subscribeUser(
            SubscriptionRequest request) {

        UserSubscription subscription = new UserSubscription();

        subscription.setUsername(request.getUsername());
        subscription.setPlanType(request.getPlanType());

        subscription.setStartDate(LocalDateTime.now());
        subscription.setEndDate(LocalDateTime.now().plusMonths(1));

        subscription.setActive(true);

        return subscriptionRepository.save(subscription);
    }
    public UserSubscription getSubscription(String username) {

        return subscriptionRepository
                .findByUsername(username)
                .orElse(null);
    }
    public boolean canView(String username, String contentType) {

        UserSubscription subscription = getSubscription(username);

        if (subscription == null || !subscription.isActive()) {
            return false;
        }

        if (subscription.getEndDate().isBefore(LocalDateTime.now())) {
            return false;
        }

        SubscriptionPlan plan = planRepository
                .findByPlanType(subscription.getPlanType())
                .orElse(null);

        if (plan == null) {
            return false;
        }

        if (!plan.isCanView()) {
            return false;
        }

        return checkContentType(plan, contentType);
    }

    public boolean canDownload(String username, String contentType) {

        UserSubscription subscription = getSubscription(username);

        if (subscription == null || !subscription.isActive()) {
            return false;
        }

        if (subscription.getEndDate().isBefore(LocalDateTime.now())) {
            return false;
        }

        SubscriptionPlan plan = planRepository
                .findByPlanType(subscription.getPlanType())
                .orElse(null);

        if (plan == null) {
            return false;
        }

        if (!plan.isCanDownload()) {
            return false;
        }

        return checkContentType(plan, contentType);
    }

    private boolean checkContentType(
            SubscriptionPlan plan,
            String contentType) {

        switch (contentType.toUpperCase()) {

            case "BOOK":
                return plan.isCanAccessBooks();

            case "JOURNAL":
                return plan.isCanAccessJournals();

            case "RESEARCH_DOCUMENT":
                return plan.isCanAccessResearch();

            default:
                return false;
        }
    }
}