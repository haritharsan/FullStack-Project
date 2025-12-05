package com.example.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.dto.UserRequestDto;
import com.example.service.UserService;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")

public class UserController {

	@Autowired
    private  UserService userService;

    @PostMapping("/register")
    public Map<String, String> register(@RequestBody UserRequestDto dto) {
        String result = userService.register(dto);
        return Map.of("status", result.equals("success") ? "success" : "error", "message", result);
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> request) {
        String status = userService.login(request.get("username"), request.get("password"));
        return Map.of("status", status);
    }
}
