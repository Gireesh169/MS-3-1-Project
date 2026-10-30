package com.klu.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.klu.dto.TopBookResponse;
import com.klu.entity.ReadingHistory;

@Repository
public interface ReadingHistoryRepository extends JpaRepository<ReadingHistory, Long> {

    List<ReadingHistory> findByUserIdOrderByAccessDateDesc(String userId);

    long countByUserIdAndBookId(String userId, Long bookId);

    long countByBookId(Long bookId);

    long countByUserId(String userId);

    @Query("SELECT COALESCE(SUM(r.durationMinutes), 0L) FROM ReadingHistory r WHERE r.bookId = :bookId")
    Long sumDurationByBookId(@Param("bookId") Long bookId);

    @Query("SELECT COUNT(DISTINCT r.userId) FROM ReadingHistory r WHERE r.bookId = :bookId")
    long countDistinctUsersByBookId(@Param("bookId") Long bookId);

    @Query("SELECT COUNT(DISTINCT r.bookId) FROM ReadingHistory r WHERE r.userId = :userId")
    long countDistinctBooksByUserId(@Param("userId") String userId);

    @Query("SELECT COALESCE(SUM(r.durationMinutes), 0L) FROM ReadingHistory r WHERE r.userId = :userId")
    Long sumDurationByUserId(@Param("userId") String userId);

    @Query("SELECT r.bookId FROM ReadingHistory r WHERE r.userId = :userId GROUP BY r.bookId ORDER BY COUNT(r.id) DESC")
    List<Long> findMostReadBookIdsByUserId(@Param("userId") String userId, Pageable pageable);

    @Query("SELECT r.bookTitle FROM ReadingHistory r WHERE r.bookId = :bookId AND r.bookTitle IS NOT NULL ORDER BY r.accessDate DESC")
    List<String> findLatestTitleByBookId(@Param("bookId") Long bookId, Pageable pageable);

    @Query("SELECT new com.klu.dto.TopBookResponse(r.bookId, MAX(r.bookTitle), COUNT(r.id), COALESCE(SUM(r.durationMinutes), 0L)) " +
           "FROM ReadingHistory r GROUP BY r.bookId ORDER BY COUNT(r.id) DESC")
    List<TopBookResponse> findMostAccessedBooks(Pageable pageable);
}
