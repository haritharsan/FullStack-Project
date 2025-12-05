package com.example.demo.service;

import com.example.demo.model.Career;
import com.example.demo.repositoryint.CareerRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CareerService {

    @Autowired
    private CareerRepository repo;

    public List<Career> getAll() {
        return repo.findAll();
    }

    public Career getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public Career save(Career career) {
        return repo.save(career);
    }

    public Career update(Long id, Career updated) {
        Optional<Career> opt = repo.findById(id);
        if (opt.isPresent()) {
            Career c = opt.get();
            c.setTitle(updated.getTitle());
            c.setLocation(updated.getLocation());
            c.setExperience(updated.getExperience());
            c.setClosingDate(updated.getClosingDate());
            c.setSummary(updated.getSummary());
            c.setResponsibilities(updated.getResponsibilities());
            c.setSkills(updated.getSkills());
            return repo.save(c);
        }
        return null;
    }

    public boolean delete(Long id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return true;
        }
        return false;
    }
}
