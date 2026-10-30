package com.klu.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.PageRequest;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.klu.dto.BookUsageStatsResponse;
import com.klu.dto.ReadingHistoryResponse;
import com.klu.dto.TopBookResponse;
import com.klu.dto.UsageRecordRequest;
import com.klu.dto.UserUsageStatsResponse;
import com.klu.entity.ReadingHistory;
import com.klu.repository.ReadingHistoryRepository;

@Service
@Transactional
public class UsageServiceImpl implements UsageService {

    private final ReadingHistoryRepository repository;

    public UsageServiceImpl(ReadingHistoryRepository repository) {
        this.repository = repository;
    }

    @Override
    public ReadingHistoryResponse recordUsage(UsageRecordRequest request, String currentUsername) {
        String resolvedUserId = (currentUsername != null && !currentUsername.isBlank())
                ? currentUsername
                : request.getUserId();

        if (resolvedUserId == null || resolvedUserId.isBlank()) {
            throw new IllegalArgumentException("User ID is required to record reading activity.");
        }

        ReadingHistory history = new ReadingHistory();
        history.setUserId(resolvedUserId);
        history.setBookId(request.getBookId());
        history.setBookTitle(request.getBookTitle());
        history.setAccessDate(LocalDateTime.now());
        history.setDurationMinutes(request.getDurationMinutes() != null ? request.getDurationMinutes() : 0);

        ReadingHistory saved = repository.save(history);

        long count = repository.countByUserIdAndBookId(resolvedUserId, request.getBookId());

        return mapToReadingHistoryResponse(saved, count);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReadingHistoryResponse> getUserReadingHistory(String requestedUserId, String currentUsername, boolean isAdmin) {
        validateUserAccess(requestedUserId, currentUsername, isAdmin);

        List<ReadingHistory> list = repository.findByUserIdOrderByAccessDateDesc(requestedUserId);

        return list.stream()
                .map(item -> {
                    long accessCount = repository.countByUserIdAndBookId(requestedUserId, item.getBookId());
                    return mapToReadingHistoryResponse(item, accessCount);
                })
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public long getUserBookAccessCount(String requestedUserId, Long bookId, String currentUsername, boolean isAdmin) {
        validateUserAccess(requestedUserId, currentUsername, isAdmin);
        return repository.countByUserIdAndBookId(requestedUserId, bookId);
    }

    @Override
    @Transactional(readOnly = true)
    public BookUsageStatsResponse getBookUsageStats(Long bookId) {
        long totalAccessCount = repository.countByBookId(bookId);
        Long totalDuration = repository.sumDurationByBookId(bookId);
        long uniqueReaders = repository.countDistinctUsersByBookId(bookId);

        List<String> titles = repository.findLatestTitleByBookId(bookId, PageRequest.of(0, 1));
        String bookTitle = titles.isEmpty() ? null : titles.get(0);

        return new BookUsageStatsResponse(
                bookId,
                bookTitle,
                totalAccessCount,
                (totalDuration != null ? totalDuration : 0L),
                uniqueReaders
        );
    }

    @Override
    @Transactional(readOnly = true)
    public UserUsageStatsResponse getUserUsageStats(String requestedUserId, String currentUsername, boolean isAdmin) {
        validateUserAccess(requestedUserId, currentUsername, isAdmin);

        long totalBooksRead = repository.countDistinctBooksByUserId(requestedUserId);
        long totalAccessCount = repository.countByUserId(requestedUserId);
        Long totalDuration = repository.sumDurationByUserId(requestedUserId);

        List<Long> mostReadIds = repository.findMostReadBookIdsByUserId(requestedUserId, PageRequest.of(0, 1));
        Long mostReadBookId = mostReadIds.isEmpty() ? null : mostReadIds.get(0);
        String mostReadBookTitle = null;

        if (mostReadBookId != null) {
            List<String> titles = repository.findLatestTitleByBookId(mostReadBookId, PageRequest.of(0, 1));
            mostReadBookTitle = titles.isEmpty() ? null : titles.get(0);
        }

        return new UserUsageStatsResponse(
                requestedUserId,
                totalBooksRead,
                totalAccessCount,
                (totalDuration != null ? totalDuration : 0L),
                mostReadBookId,
                mostReadBookTitle
        );
    }

    @Override
    @Transactional(readOnly = true)
    public List<TopBookResponse> getMostAccessedBooks(int limit) {
        int safeLimit = (limit <= 0) ? 10 : limit;
        return repository.findMostAccessedBooks(PageRequest.of(0, safeLimit));
    }

    private void validateUserAccess(String requestedUserId, String currentUsername, boolean isAdmin) {
        if (isAdmin) {
            return;
        }
        if (currentUsername == null || !currentUsername.equalsIgnoreCase(requestedUserId)) {
            throw new AccessDeniedException("Access denied: You are only permitted to view your own reading history and usage statistics.");
        }
    }

    private ReadingHistoryResponse mapToReadingHistoryResponse(ReadingHistory history, long userBookAccessCount) {
        return new ReadingHistoryResponse(
                history.getId(),
                history.getUserId(),
                history.getBookId(),
                history.getBookTitle(),
                history.getAccessDate(),
                history.getDurationMinutes(),
                userBookAccessCount
        );
    }
}
