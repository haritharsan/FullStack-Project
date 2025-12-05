package com.example.demo.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Project;
import com.example.demo.repositoryint.ProjectRepository;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository repo;

    // GET ALL
    public List<Project> getAll() {
        return repo.findAll();
    }

    // ADD
    public Project add(Project p) {
        return repo.save(p);
    }

    // GET BY ID
    public Project getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    // UPDATE
    public Project update(Long id, Project updated) {
        Project existing = repo.findById(id).orElse(null);

        if (existing != null) {
            existing.setSno(updated.getSno());
            existing.setProjectName(updated.getProjectName());
            existing.setDepartment(updated.getDepartment());
            return repo.save(existing);
        }

        return null;
    }

    // DELETE
    public boolean delete(Long id) {
        Project p = repo.findById(id).orElse(null);

        if (p != null) {
            repo.delete(p);
            return true;
        }

        return false;
    }
}
