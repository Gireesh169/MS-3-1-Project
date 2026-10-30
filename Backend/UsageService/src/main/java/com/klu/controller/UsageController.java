package com.klu.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.klu.dto.BookUsageStatsResponse;
import com.klu.dto.ReadingHistoryResponse;
import com.klu.dto.TopBookResponse;
import com.klu.dto.UsageRecordRequest;
import com.klu.dto.UserUsageStatsResponse;
import com.klu.service.UsageService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/usage")
public class UsageController {

    private final UsageService usageService;

    public UsageController(UsageService usageService) {
        this.usageService = usageService;
    }

    /**
     * 1. Record when a user opens or reads a digital book.
     */
    @PostMapping("/record")
    public ResponseEntity<ReadingHistoryResponse> recordUsage(
            @Valid @RequestBody UsageRecordRequest request,
            Authentication authentication) {

        String currentUsername = authentication != null ? authentication.getName() : null;
        ReadingHistoryResponse response = usageService.recordUsage(request, currentUsername);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * 2. Allow users to view their own reading history (current logged-in user).
     */
    @GetMapping("/history/my-history")
    public ResponseEntity<List<ReadingHistoryResponse>> getMyReadingHistory(Authentication authentication) {
        String currentUsername = authentication != null ? authentication.getName() : null;
        boolean isAdmin = hasAdminRole(authentication);
        List<ReadingHistoryResponse> history = usageService.getUserReadingHistory(currentUsername, currentUsername, isAdmin);
        return ResponseEntity.ok(history);
    }

    /**
     * 3. View reading history for a specified user ID (secured: only own history or ADMIN).
     */
    @GetMapping("/history/user/{userId}")
    public ResponseEntity<List<ReadingHistoryResponse>> getUserReadingHistory(
            @PathVariable String userId,
            Authentication authentication) {

        String currentUsername = authentication != null ? authentication.getName() : null;
        boolean isAdmin = hasAdminRole(authentication);
        List<ReadingHistoryResponse> history = usageService.getUserReadingHistory(userId, currentUsername, isAdmin);
        return ResponseEntity.ok(history);
    }

    /**
     * 4. Track number of times a user accesses a specific book.
     */
    @GetMapping("/count/user/{userId}/book/{bookId}")
    public ResponseEntity<Long> getUserBookAccessCount(
            @PathVariable String userId,
            @PathVariable Long bookId,
            Authentication authentication) {

        String currentUsername = authentication != null ? authentication.getName() : null;
        boolean isAdmin = hasAdminRole(authentication);
        long count = usageService.getUserBookAccessCount(userId, bookId, currentUsername, isAdmin);
        return ResponseEntity.ok(count);
    }

    /**
     * Track number of times current authenticated user accessed a specific book.
     */
    @GetMapping("/count/book/{bookId}")
    public ResponseEntity<Long> getMyBookAccessCount(
            @PathVariable Long bookId,
            Authentication authentication) {

        String currentUsername = authentication != null ? authentication.getName() : null;
        boolean isAdmin = hasAdminRole(authentication);
        long count = usageService.getUserBookAccessCount(currentUsername, bookId, currentUsername, isAdmin);
        return ResponseEntity.ok(count);
    }

    /**
     * 5. Total usage statistics for each book.
     */
    @GetMapping("/stats/book/{bookId}")
    public ResponseEntity<BookUsageStatsResponse> getBookUsageStats(
            @PathVariable Long bookId) {

        BookUsageStatsResponse stats = usageService.getBookUsageStats(bookId);
        return ResponseEntity.ok(stats);
    }

    /**
     * 6. Provide usage statistics for a particular user (secured: only own stats or ADMIN).
     */
    @GetMapping("/stats/user/{userId}")
    public ResponseEntity<UserUsageStatsResponse> getUserUsageStats(
            @PathVariable String userId,
            Authentication authentication) {

        String currentUsername = authentication != null ? authentication.getName() : null;
        boolean isAdmin = hasAdminRole(authentication);
        UserUsageStatsResponse stats = usageService.getUserUsageStats(userId, currentUsername, isAdmin);
        return ResponseEntity.ok(stats);
    }

    /**
     * Provide usage statistics for the current logged-in user.
     */
    @GetMapping("/stats/my-stats")
    public ResponseEntity<UserUsageStatsResponse> getMyUsageStats(
            Authentication authentication) {

        String currentUsername = authentication != null ? authentication.getName() : null;
        boolean isAdmin = hasAdminRole(authentication);
        UserUsageStatsResponse stats = usageService.getUserUsageStats(currentUsername, currentUsername, isAdmin);
        return ResponseEntity.ok(stats);
    }

    /**
     * 7. Provide an API to retrieve the most accessed books.
     */
    @GetMapping("/stats/most-accessed")
    public ResponseEntity<List<TopBookResponse>> getMostAccessedBooks(
            @RequestParam(defaultValue = "10") int limit) {

        List<TopBookResponse> topBooks = usageService.getMostAccessedBooks(limit);
        return ResponseEntity.ok(topBooks);
    }

    private boolean hasAdminRole(Authentication authentication) {
        if (authentication == null) {
            return false;
        }
        for (GrantedAuthority authority : authentication.getAuthorities()) {
            String role = authority.getAuthority();
            if ("ROLE_ADMIN".equalsIgnoreCase(role) || "ADMIN".equalsIgnoreCase(role)) {
                return true;
            }
        }
        return false;
    }
}
