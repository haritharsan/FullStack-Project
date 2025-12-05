package com.example.demo.repositoryint;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.AdminModel;

public interface AdminRepository extends JpaRepository<AdminModel, Long> {

}
