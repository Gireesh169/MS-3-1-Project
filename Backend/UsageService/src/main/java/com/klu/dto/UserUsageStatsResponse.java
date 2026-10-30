package com.klu.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserUsageStatsResponse {

    private String userId;
    private long totalBooksRead;
    private long totalAccessCount;
    private long totalReadingDurationMinutes;
    private Long mostReadBookId;
    private String mostReadBookTitle;

    public UserUsageStatsResponse() {
    }

    public UserUsageStatsResponse(String userId, long totalBooksRead, long totalAccessCount,
                                 long totalReadingDurationMinutes, Long mostReadBookId, String mostReadBookTitle) {
        this.userId = userId;
        this.totalBooksRead = totalBooksRead;
        this.totalAccessCount = totalAccessCount;
        this.totalReadingDurationMinutes = totalReadingDurationMinutes;
        this.mostReadBookId = mostReadBookId;
        this.mostReadBookTitle = mostReadBookTitle;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public long getTotalBooksRead() {
        return totalBooksRead;
    }

    public void setTotalBooksRead(long totalBooksRead) {
        this.totalBooksRead = totalBooksRead;
    }

    public long getTotalAccessCount() {
        return totalAccessCount;
    }

    public void setTotalAccessCount(long totalAccessCount) {
        this.totalAccessCount = totalAccessCount;
    }

    public long getTotalReadingDurationMinutes() {
        return totalReadingDurationMinutes;
    }

    public void setTotalReadingDurationMinutes(long totalReadingDurationMinutes) {
        this.totalReadingDurationMinutes = totalReadingDurationMinutes;
    }

    public Long getMostReadBookId() {
        return mostReadBookId;
    }

    public void setMostReadBookId(Long mostReadBookId) {
        this.mostReadBookId = mostReadBookId;
    }

    public String getMostReadBookTitle() {
        return mostReadBookTitle;
    }

    public void setMostReadBookTitle(String mostReadBookTitle) {
        this.mostReadBookTitle = mostReadBookTitle;
    }
}
