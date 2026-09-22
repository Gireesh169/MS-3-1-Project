package com.klu.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.klu.entity.Content;

public interface ContentRepository
        extends JpaRepository<Content, Long> {

}