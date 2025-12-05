package com.example.repositoryint;

import com.example.model.LoginModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoginRepositoryInt extends JpaRepository<LoginModel, Long> {

    LoginModel findByEmail(String email);
}
