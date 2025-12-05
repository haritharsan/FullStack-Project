package com.example.demo.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.ApplicationModel;
import com.example.demo.repositoryint.ApplicationRepository;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository repo;

    @Autowired
    private EmailService emailService;   // Email Service

    // -------------------------------
    // USER APPLY METHOD
    // -------------------------------
    public ApplicationModel apply(ApplicationModel app) {

        app.setStatus("Pending");
        ApplicationModel saved = repo.save(app);

        // Send Application Submitted Email
        emailService.sendApplicationMail(
                saved.getEmail(),
                saved.getFullName(),
                saved.getCertificateType(),
                saved.getId(),
                saved.getAppliedDate()
        );

        return saved;
    }

    // TRACK BY EMAIL
    public List<ApplicationModel> getByEmail(String email) {
        return repo.findByEmail(email);
    }

    public List<ApplicationModel> getAllApplications() {
        return repo.findAll();
    }

    // -------------------------------
    // UPDATE STATUS (ADMIN USES)
    // -------------------------------
    public ApplicationModel updateStatus(Long id, String status) {

        ApplicationModel app = repo.findById(id).orElse(null);
        if (app == null) return null;

        app.setStatus(status);

        // 🔥 APPROVED → Send Email
        if (status.equals("Approved")) {

            // Set certificate file name if not set
            if (app.getCertificateUrl() == null || app.getCertificateUrl().isEmpty()) {
                app.setCertificateUrl("CERT-" + id + ".pdf");
            }

            // 🔥 Send simple approval email (NO PDF)
            emailService.sendApprovedMail(
                    app.getEmail(),
                    app.getFullName(),
                    app.getCertificateType()
            );
        }

        return repo.save(app);
    }

    public ApplicationModel getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public boolean delete(Long id) {
        if (!repo.existsById(id)) {
            return false;
        }
        repo.deleteById(id);
        return true;
    }
}
