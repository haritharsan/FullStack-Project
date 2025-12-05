package com.example.demo.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.UserDto;
import com.example.demo.model.UserModel;
import com.example.demo.service.UserService;

@RestController
@CrossOrigin("*")
public class UserController {

    @Autowired
    public UserService userService;

    @PostMapping("/register")
    public UserModel saveUser(@RequestBody UserDto userDto) {
        return userService.createUser(userDto);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDto dto) {

        // ADMIN LOGIN
        if ("admin@gmail.com".equals(dto.getEmail()) &&
            "Admin@123".equals(dto.getPassword())) {

            return ResponseEntity.ok(Map.of(
                    "status", "success",
                    "role", "admin",
                    "message", "Admin login successful"
            ));
        }

        // NORMAL USER LOGIN
        List<UserModel> users = userService.findByEmail(dto.getEmail());

        if (users.isEmpty()) {
            return ResponseEntity.status(404).body(Map.of(
                    "status", "error",
                    "message", "❌ Email not registered"
            ));
        }

        UserModel user = users.get(0);

        // NULL SAFE PASSWORD CHECK
        if (user.getPassword() == null) {
            return ResponseEntity.status(500).body(Map.of(
                    "status", "error",
                    "message", "❌ Password is missing. Please reset."
            ));
        }

        if (!user.getPassword().equals(dto.getPassword())) {
            return ResponseEntity.status(401).body(Map.of(
                    "status", "error",
                    "message", "❌ Incorrect Password"
            ));
        }

        return ResponseEntity.ok(Map.of(
                "status", "success",
                "role", "user",
                "message", "Login Successful",
                "user", user
        ));
    }

    @GetMapping("/users")
    public List<UserModel> getUsers() {
        return userService.getAllUser();
    }

    @DeleteMapping("/delete/{id}")
    public String deleteUser(@PathVariable Long id) {
        boolean deleted = userService.deleteUser(id);
        return deleted ? "User deleted" : "User not found";
    }

    @PutMapping("/update/{id}")
    public UserModel update(@PathVariable Long id, @RequestBody UserDto dto) {
        return userService.updateUser(id, dto);
    }
}
