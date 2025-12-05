package com.example.demo.service;

import com.example.demo.model.Gallery;
import com.example.demo.repositoryint.GalleryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GalleryService {

    @Autowired
    private GalleryRepository repo;

    // SAVE
    public Gallery save(Gallery gallery) {
        return repo.save(gallery);
    }

    // GET ALL
    public List<Gallery> getAll() {
        return repo.findAll();
    }

    // ⭐ GET BY ID (IMPORTANT)
    public Gallery getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    // ⭐ UPDATE IMAGE DETAILS
    public Gallery update(Long id, Gallery newData) {

        Optional<Gallery> existing = repo.findById(id);

        if (existing.isPresent()) {
            Gallery g = existing.get();

            g.setTitle(newData.getTitle());
            g.setCategory(newData.getCategory());

            // update only if new image URL provided
            if (newData.getImageUrl() != null) {
                g.setImageUrl(newData.getImageUrl());
            }

            return repo.save(g);
        }

        return null;
    }

    // ⭐ DELETE BY ID
    public boolean delete(Long id) {

        Optional<Gallery> existing = repo.findById(id);

        if (existing.isPresent()) {
            repo.deleteById(id);
            return true;
        }

        return false;
    }
}
