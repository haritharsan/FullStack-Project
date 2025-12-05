package com.example.demo.controller;

import com.example.demo.model.Career;
import com.example.demo.service.CareerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/careers")
@CrossOrigin(origins = "*")
public class CareerController {

    @Autowired
    private CareerService service;

    // GET all jobs
    @GetMapping
    public ResponseEntity<List<Career>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    // GET job by id
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        Career c = service.getById(id);
        if (c == null) return ResponseEntity.status(404).body("Job not found");
        return ResponseEntity.ok(c);
    }

    // POST - add new job
    @PostMapping
    public ResponseEntity<?> create(@RequestBody Career career) {
        Career saved = service.save(career);
        return ResponseEntity.ok(saved);
    }

    // PUT - update job
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Career career) {
        Career updated = service.update(id, career);
        if (updated == null) return ResponseEntity.status(404).body("Job not found");
        return ResponseEntity.ok(updated);
    }

    // DELETE - remove job
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        boolean ok = service.delete(id);
        if (!ok) return ResponseEntity.status(404).body("Job not found");
        return ResponseEntity.ok("Deleted");
    }
}
