package com.klu.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsageRecordRequest {

    @NotNull(message = "bookId is required")
    private Long bookId;

    private String bookTitle;

    @Min(value = 0, message = "durationMinutes must be 0 or greater")
    private Integer durationMinutes = 0;

    // Optional: will default to the authenticated user from JWT if omitted
    private String userId;

    public UsageRecordRequest() {
    }

    public UsageRecordRequest(Long bookId, String bookTitle, Integer durationMinutes, String userId) {
        this.bookId = bookId;
        this.bookTitle = bookTitle;
        this.durationMinutes = durationMinutes;
        this.userId = userId;
    }

    public Long getBookId() {
        return bookId;
    }

    public void setBookId(Long bookId) {
        this.bookId = bookId;
    }

    public String getBookTitle() {
        return bookTitle;
    }

    public void setBookTitle(String bookTitle) {
        this.bookTitle = bookTitle;
    }

    public Integer getDurationMinutes() {
        return durationMinutes;
    }

    public void setDurationMinutes(Integer durationMinutes) {
        this.durationMinutes = durationMinutes;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
