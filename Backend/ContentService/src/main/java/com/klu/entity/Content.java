package com.klu.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import com.klu.enums.ContentType;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "contents")
@Getter
@Setter
@Data
public class Content {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String author;

    private String description;

    @Enumerated(EnumType.STRING)
    private ContentType type;

    private String fileName;

    private String filePath;

    private LocalDateTime createdAt;
}