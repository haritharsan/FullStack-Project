package com.example.demo.repositoryint;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.model.Gallery;

public interface GalleryRepository extends JpaRepository<Gallery, Long> {
}