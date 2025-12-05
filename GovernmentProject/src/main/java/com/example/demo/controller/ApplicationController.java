package com.example.demo.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.model.ApplicationModel;
import com.example.demo.service.ApplicationService;
import com.example.demo.service.EmailService;

import tools.jackson.databind.ObjectMapper;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
@RestController
@RequestMapping("/applications")
public class ApplicationController {

    @Autowired
    private ApplicationService service;

    @Autowired
    private EmailService emailService;

    // APPLY — Save File + Save Data
    @PostMapping("/apply")
    public ApplicationModel apply(
            @RequestPart("data") String data,
            @RequestPart("aadhaarFile") MultipartFile aadhaarFile) throws IOException {

        ObjectMapper mapper = new ObjectMapper();
        ApplicationModel app = mapper.readValue(data, ApplicationModel.class);

        String uploadDir = "uploads/aadhaar/";
        File folder = new File(uploadDir);
        if (!folder.exists()) folder.mkdirs();

        String fileName = System.currentTimeMillis() + "_" + aadhaarFile.getOriginalFilename();
        Path path = Paths.get(uploadDir + fileName);
        Files.write(path, aadhaarFile.getBytes());

        app.setAadhaar(fileName);

        return service.apply(app);
    }

    @GetMapping("/track/email/{email}")
    public List<ApplicationModel> getByEmail(@PathVariable String email) {
        return service.getByEmail(email);
    }

    @GetMapping("/admin")
    public List<ApplicationModel> getAll() {
        return service.getAllApplications();
    }

    @PutMapping("/status/{id}")
    public ApplicationModel updateStatus(@PathVariable Long id, @RequestParam String status) {
        return service.updateStatus(id, status);
    }

    @GetMapping("/{id}")
    public ApplicationModel getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteApplication(@PathVariable Long id) {
        boolean deleted = service.delete(id);
        return deleted ? "Application Deleted Successfully" : "Application Not Found";
    }

    // ⭐ APPROVE (Simple Mail, No PDF)
    @PostMapping("/approve/{id}")
    public String approveApplication(@PathVariable Long id) {

        ApplicationModel app = service.updateStatus(id, "Approved");
        if (app == null) return "Application Not Found";

        try {
            emailService.sendApprovedMail(
                    app.getEmail(),
                    app.getFullName(),
                    app.getCertificateType()
            );
            return "Approved & Email Sent";

        } catch (Exception e) {
            e.printStackTrace();
            return "Approved but Email Failed";
        }
    }

    // ⭐ REJECT WITH OPTIONAL REASON
    @PutMapping("/reject/{id}")
    public String rejectApplication(
            @PathVariable Long id,
            @RequestParam(required = false) String reason) {

        ApplicationModel app = service.updateStatus(id, "Rejected");
        if (app == null) return "Application Not Found";

        try {
            emailService.sendRejectedMail(
                    app.getEmail(),
                    app.getFullName(),
                    app.getCertificateType(),
                    reason
            );

            return "Rejected & Email Sent";

        } catch (Exception e) {
            e.printStackTrace();
            return "Rejected but Email Failed";
        }
    }
}
