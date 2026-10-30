package com.klu.service;

import java.util.List;

import com.klu.dto.BookUsageStatsResponse;
import com.klu.dto.ReadingHistoryResponse;
import com.klu.dto.TopBookResponse;
import com.klu.dto.UsageRecordRequest;
import com.klu.dto.UserUsageStatsResponse;

public interface UsageService {

    ReadingHistoryResponse recordUsage(UsageRecordRequest request, String currentUsername);

    List<ReadingHistoryResponse> getUserReadingHistory(String requestedUserId, String currentUsername, boolean isAdmin);

    long getUserBookAccessCount(String requestedUserId, Long bookId, String currentUsername, boolean isAdmin);

    BookUsageStatsResponse getBookUsageStats(Long bookId);

    UserUsageStatsResponse getUserUsageStats(String requestedUserId, String currentUsername, boolean isAdmin);

    List<TopBookResponse> getMostAccessedBooks(int limit);
}
