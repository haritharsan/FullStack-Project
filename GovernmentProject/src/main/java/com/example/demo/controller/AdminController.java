package com.example.demo.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.service.AdminService;

@RestController
@CrossOrigin("*")
public class AdminController {
	
	@Autowired
	public AdminService adminService;

	@PostMapping("/admin/login")
	public ResponseEntity<?> adminLogin(@RequestBody Map<String, String> loginData) {
	    String email = loginData.get("email");
	    String password = loginData.get("password");

	    if (adminService.validateAdmin(email, password)) {
	        return ResponseEntity.ok(Map.of(
	            "status", "success",
	            "role", "admin",
	            "message", "Admin Login Successful"
	        ));
	    }

	    return ResponseEntity.status(401).body("❌ Invalid Admin Credentials");
	}

}
