package com.vedha.project.repository;

import com.vedha.project.model.LoginModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoginRepositoryInt extends JpaRepository<LoginModel, Long> {

    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
}
