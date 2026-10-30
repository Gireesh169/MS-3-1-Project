package com.klu.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TopBookResponse {

    private Long bookId;
    private String bookTitle;
    private long accessCount;
    private long totalDurationMinutes;

    public TopBookResponse() {
    }

    public TopBookResponse(Long bookId, String bookTitle, Long accessCount, Long totalDurationMinutes) {
        this.bookId = bookId;
        this.bookTitle = bookTitle;
        this.accessCount = (accessCount != null) ? accessCount : 0L;
        this.totalDurationMinutes = (totalDurationMinutes != null) ? totalDurationMinutes : 0L;
    }

    public TopBookResponse(Long bookId, String bookTitle, long accessCount, long totalDurationMinutes) {
        this.bookId = bookId;
        this.bookTitle = bookTitle;
        this.accessCount = accessCount;
        this.totalDurationMinutes = totalDurationMinutes;
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

    public long getAccessCount() {
        return accessCount;
    }

    public void setAccessCount(long accessCount) {
        this.accessCount = accessCount;
    }

    public long getTotalDurationMinutes() {
        return totalDurationMinutes;
    }

    public void setTotalDurationMinutes(long totalDurationMinutes) {
        this.totalDurationMinutes = totalDurationMinutes;
    }
}
