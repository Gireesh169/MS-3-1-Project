package com.klu.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReadingHistoryResponse {

    private Long id;
    private String userId;
    private Long bookId;
    private String bookTitle;
    private LocalDateTime accessDate;
    private Integer durationMinutes;
    private long userBookAccessCount;

    public ReadingHistoryResponse() {
    }

    public ReadingHistoryResponse(Long id, String userId, Long bookId, String bookTitle,
                                  LocalDateTime accessDate, Integer durationMinutes, long userBookAccessCount) {
        this.id = id;
        this.userId = userId;
        this.bookId = bookId;
        this.bookTitle = bookTitle;
        this.accessDate = accessDate;
        this.durationMinutes = durationMinutes;
        this.userBookAccessCount = userBookAccessCount;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
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

    public LocalDateTime getAccessDate() {
        return accessDate;
    }

    public void setAccessDate(LocalDateTime accessDate) {
        this.accessDate = accessDate;
    }

    public Integer getDurationMinutes() {
        return durationMinutes;
    }

    public void setDurationMinutes(Integer durationMinutes) {
        this.durationMinutes = durationMinutes;
    }

    public long getUserBookAccessCount() {
        return userBookAccessCount;
    }

    public void setUserBookAccessCount(long userBookAccessCount) {
        this.userBookAccessCount = userBookAccessCount;
    }
}
