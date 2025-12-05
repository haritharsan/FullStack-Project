package com.example.repositoryint;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.model.AuthenticationModel;

public interface AuthenticationInt extends JpaRepository<AuthenticationModel, Long>{

}
