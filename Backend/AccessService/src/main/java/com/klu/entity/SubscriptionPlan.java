package com.klu.entity;

import com.klu.enums.PlanType;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "subscription_plans")

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

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public PlanType getPlanType() {
		return planType;
	}

	public void setPlanType(PlanType planType) {
		this.planType = planType;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public boolean isCanView() {
		return canView;
	}

	public void setCanView(boolean canView) {
		this.canView = canView;
	}

	public boolean isCanDownload() {
		return canDownload;
	}

	public void setCanDownload(boolean canDownload) {
		this.canDownload = canDownload;
	}

	public boolean isCanAccessBooks() {
		return canAccessBooks;
	}

	public void setCanAccessBooks(boolean canAccessBooks) {
		this.canAccessBooks = canAccessBooks;
	}

	public boolean isCanAccessJournals() {
		return canAccessJournals;
	}

	public void setCanAccessJournals(boolean canAccessJournals) {
		this.canAccessJournals = canAccessJournals;
	}

	public boolean isCanAccessResearch() {
		return canAccessResearch;
	}

	public void setCanAccessResearch(boolean canAccessResearch) {
		this.canAccessResearch = canAccessResearch;
	}
}