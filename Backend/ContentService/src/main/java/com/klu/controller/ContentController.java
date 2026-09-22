package com.klu.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.klu.dto.ContentRequest;
import com.klu.entity.Content;
import com.klu.service.ContentService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/content")
public class ContentController {

    private final ContentService contentService;

    public ContentController(ContentService contentService) {
        this.contentService = contentService;
    }

    @PostMapping("/upload")
    public Content upload(
            @Valid @RequestPart("content")
            ContentRequest request,

            @RequestPart("file")
            MultipartFile file)
            throws IOException {

        return contentService.upload(request, file);
    }

    @GetMapping
    public List<Content> getAll() {

        return contentService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Content> getById(
            @PathVariable Long id) {

        Content content =
                contentService.getById(id);

        if (content == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(content);
    }

    @DeleteMapping("/{id}")
    public String delete(
            @PathVariable Long id)
            throws IOException {

        contentService.delete(id);

        return "Content deleted successfully";
    }
}