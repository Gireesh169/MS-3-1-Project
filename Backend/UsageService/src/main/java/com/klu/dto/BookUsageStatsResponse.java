package com.klu.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookUsageStatsResponse {

    private Long bookId;
    private String bookTitle;
    private long totalAccessCount;
    private long totalReadingDurationMinutes;
    private long uniqueReadersCount;

    public BookUsageStatsResponse() {
    }

    public BookUsageStatsResponse(Long bookId, String bookTitle, long totalAccessCount,
                                  long totalReadingDurationMinutes, long uniqueReadersCount) {
        this.bookId = bookId;
        this.bookTitle = bookTitle;
        this.totalAccessCount = totalAccessCount;
        this.totalReadingDurationMinutes = totalReadingDurationMinutes;
        this.uniqueReadersCount = uniqueReadersCount;
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

    public long getUniqueReadersCount() {
        return uniqueReadersCount;
    }

    public void setUniqueReadersCount(long uniqueReadersCount) {
        this.uniqueReadersCount = uniqueReadersCount;
    }
}
