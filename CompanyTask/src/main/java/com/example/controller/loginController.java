package com.example.controller;


import com.example.dto.loginDto;
import com.example.model.LoginModel;
import com.example.service.loginService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auth")
public class loginController {

	@Autowired
    private loginService loginservice;

    @PostMapping("/register")
    public ResponseEntity<LoginModel> register(@RequestBody loginDto dto){
        return ResponseEntity.ok(loginservice.registerUser(dto));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginModel> login(@RequestParam String email,
                                            @RequestParam String password){
        return ResponseEntity.ok(loginservice.login(email, password));
    }

    @GetMapping("/users")
    public ResponseEntity<List<LoginModel>> getAll(){
        return ResponseEntity.ok(loginService.getAllUsers());
    }
}
