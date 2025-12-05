package com.vedha.project.controller;

import com.vedha.project.dto.LoginDto;
import com.vedha.project.dto.LoginRequest;
import com.vedha.project.model.LoginModel;
import com.vedha.project.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @GetMapping("/check-user")
    public ResponseEntity<?> checkUser(@RequestParam String email, @RequestParam String username) {

        String exists = loginService.checkUserExists(email, username);

        if (exists != null) {
            return ResponseEntity.ok(Map.of("exists", true, "field", exists));
        }

        return ResponseEntity.ok(Map.of("exists", false));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody LoginDto loginDto) {

        String exists = loginService.checkUserExists(loginDto.getEmail(), loginDto.getUsername());

        if (exists != null) {
            return ResponseEntity.status(409).body(exists + " already exists!");
        }

        return ResponseEntity.ok(loginService.register(loginDto));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        LoginModel user = loginService.login(request.getIdentifier(), request.getPassword());

        if (user == null) {
            return ResponseEntity.status(401).body("Invalid Username / Email / Password");
        }

        return ResponseEntity.ok(user);
    }

    @GetMapping("/get")
    public List<LoginModel> getAllUsers() {
        return loginService.getUsers();
    }
}
