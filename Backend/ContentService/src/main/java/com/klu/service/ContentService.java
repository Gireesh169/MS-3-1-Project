package com.klu.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.klu.dto.ContentRequest;
import com.klu.entity.Content;
import com.klu.repository.ContentRepository;
import com.klu.enums.ContentType;
@Service
public class ContentService {

    private final ContentRepository repository;

    private final String uploadFolder = "uploads";

    public ContentService(ContentRepository repository) {
        this.repository = repository;
    }

    public Content upload(
            ContentRequest request,
            MultipartFile file) throws IOException {

        Path folder = Paths.get(uploadFolder);

        if (!Files.exists(folder)) {
            Files.createDirectories(folder);
        }

        String fileName = file.getOriginalFilename();

        Path filePath = folder.resolve(fileName);

        Files.copy(
                file.getInputStream(),
                filePath,
                StandardCopyOption.REPLACE_EXISTING
        );

        Content content = new Content();

        content.setTitle(request.getTitle());
        content.setAuthor(request.getAuthor());
        content.setDescription(request.getDescription());
        content.setType(request.getType());

        content.setFileName(fileName);
        content.setFilePath(filePath.toString());

        content.setCreatedAt(LocalDateTime.now());

        return repository.save(content);
    }

    public Content create(ContentRequest request) {
        Content content = new Content();

        content.setTitle(request.getTitle());
        content.setAuthor(request.getAuthor());
        content.setDescription(request.getDescription());
        content.setType(request.getType());

        content.setFileName("none");
        content.setFilePath("none");

        content.setCreatedAt(LocalDateTime.now());

        return repository.save(content);
    }

    public List<Content> getAll() {

        return repository.findAll();
    }

    public Content getById(Long id) {

        return repository.findById(id).orElse(null);
    }

    public void delete(Long id) throws IOException {

        Content content =
                repository.findById(id).orElse(null);

        if (content != null) {

            Files.deleteIfExists(
                    Paths.get(content.getFilePath())
            );

            repository.delete(content);
        }
    }
}