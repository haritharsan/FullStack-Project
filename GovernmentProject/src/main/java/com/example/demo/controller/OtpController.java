package com.example.demo.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.service.EmailService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/otp")
public class OtpController {

    @Autowired
    private EmailService emailService;

    @GetMapping("/send")
    public String sendOtp(@RequestParam String email) {
        emailService.sendOtp(email);
        return "OTP sent successfully";
    }

    @PostMapping("/verify")
    public boolean verifyOtp(@RequestBody Map<String, Object> request) {
        String email = request.get("email").toString();
        int otp = Integer.parseInt(request.get("otp").toString());
        return emailService.verifyOtp(email, otp);
    }


    // DTO class for OTP verify
    static class VerifyRequest {
        private String email;
        private int otp;

        public String getEmail() { return email; }
        public int getOtp() { return otp; }
    }
}
