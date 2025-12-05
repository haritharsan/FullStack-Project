package com.example.repositoryInt;


import org.springframework.data.jpa.repository.JpaRepository;

import com.example.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByLoginId(String loginId);

    boolean existsByAadhaar(String aadhaar);

    User findByLoginId(String loginId);
}
