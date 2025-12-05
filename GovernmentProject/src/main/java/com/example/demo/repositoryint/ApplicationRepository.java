package com.example.demo.repositoryint;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.model.ApplicationModel;

public interface ApplicationRepository extends JpaRepository<ApplicationModel, Long> {

    // ❌ OLD — loginId based (Remove or keep if not needed)
    // List<ApplicationModel> findByLoginId(String loginId);

    // ✅ NEW — Email based tracking
    List<ApplicationModel> findByEmail(String email);
}
