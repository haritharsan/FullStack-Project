package com.example.demo.repositoryint;

import com.example.demo.model.Career;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CareerRepository extends JpaRepository<Career, Long> {
    // add custom queries if needed later
}
