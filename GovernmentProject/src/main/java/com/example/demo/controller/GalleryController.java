package com.example.demo.controller;

import com.example.demo.model.Gallery;
import com.example.demo.service.GalleryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/gallery")
@CrossOrigin("*")
public class GalleryController {

    @Autowired
    private GalleryService service;

    private static final String UPLOAD_DIR = "uploads/";

    // ------------------------------------------------
    // ⭐ UPLOAD IMAGE
    // ------------------------------------------------
    @PostMapping("/upload")
    public ResponseEntity<?> uploadImage(
            @RequestParam("image") MultipartFile file,
            @RequestParam("title") String title,
            @RequestParam("category") String category) {

        try {
            Files.createDirectories(Paths.get(UPLOAD_DIR));

            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path path = Paths.get(UPLOAD_DIR + fileName);

            Files.write(path, file.getBytes());

            String imageUrl = "http://localhost:8080/" + UPLOAD_DIR + fileName;

            Gallery g = new Gallery();
            g.setTitle(title);
            g.setCategory(category);
            g.setImageUrl(imageUrl);

            return ResponseEntity.ok(service.save(g));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Upload failed: " + e.getMessage());
        }
    }

    // ------------------------------------------------
    // ⭐ GET ALL IMAGES
    // ------------------------------------------------
    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(service.getAll());
    }


    // ------------------------------------------------
    // ⭐ UPDATE (WITH OPTIONAL NEW IMAGE)
    // ------------------------------------------------
    @PutMapping("/{id}")
    public ResponseEntity<?> updateGallery(
            @PathVariable Long id,
            @RequestParam(value = "image", required = false) MultipartFile file,
            @RequestParam("title") String title,
            @RequestParam("category") String category) {

        try {
            Gallery g = service.getById(id);

            if (g == null) {
                return ResponseEntity.badRequest().body("Gallery item not found");
            }

            g.setTitle(title);
            g.setCategory(category);

            // If new image uploaded, replace old
            if (file != null && !file.isEmpty()) {
                // delete old image file
                deleteOldFile(g.getImageUrl());

                String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
                Path path = Paths.get(UPLOAD_DIR + fileName);
                Files.write(path, file.getBytes());

                g.setImageUrl("http://localhost:8080/" + UPLOAD_DIR + fileName);
            }

            return ResponseEntity.ok(service.save(g));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Update failed: " + e.getMessage());
        }
    }


    // ------------------------------------------------
    // ⭐ DELETE IMAGE ITEM (AND FILE)
    // ------------------------------------------------
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteGallery(@PathVariable Long id) {

        try {
            Gallery g = service.getById(id);

            if (g == null) {
                return ResponseEntity.badRequest().body("Gallery item not found");
            }

            // Delete physical file
            deleteOldFile(g.getImageUrl());

            service.delete(id);

            return ResponseEntity.ok("Deleted successfully");

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Delete failed: " + e.getMessage());
        }
    }


    // ------------------------------------------------
    // ⭐ DELETE FILE FROM SERVER
    // ------------------------------------------------
    private void deleteOldFile(String imageUrl) {
        if (imageUrl != null && imageUrl.contains("uploads/")) {
            String filePath = imageUrl.substring(imageUrl.indexOf("uploads/"));
            File file = new File(filePath);

            if (file.exists()) file.delete();
        }
    }
}
