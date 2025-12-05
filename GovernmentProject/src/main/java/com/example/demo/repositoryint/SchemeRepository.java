package com.example.demo.repositoryint;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.model.SchemeModel;

public interface SchemeRepository extends JpaRepository<SchemeModel, Long> {

    List<SchemeModel> findBySchemeNameContainingIgnoreCase(String keyword);
}
