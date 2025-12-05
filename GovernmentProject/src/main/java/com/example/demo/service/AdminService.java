package com.example.demo.service;

import org.springframework.stereotype.Service;

@Service
public class AdminService {

    private final String ADMIN_EMAIL = "haritharsan1@gmail.com";
    private final String ADMIN_PASSWORD = "Hari@6104";

    public boolean validateAdmin(String email, String password) {
        return email.equals(ADMIN_EMAIL) && password.equals(ADMIN_PASSWORD);
    }
}
