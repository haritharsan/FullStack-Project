package com.vedha.project.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileStorageService {

    private final String UPLOAD_DIR = "uploads/";

    public String store(MultipartFile file) {

        try {

            File directory = new File(UPLOAD_DIR);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            Path path = Paths.get(UPLOAD_DIR + file.getOriginalFilename());

            // WRITE FILE
            Files.write(path, file.getBytes());

            return path.toString();

        } catch (Exception e) {
            throw new RuntimeException("Upload failed", e);
        }
    }
}
