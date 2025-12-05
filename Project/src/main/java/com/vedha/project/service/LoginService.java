package com.vedha.project.service;

import com.vedha.project.dto.LoginDto;
import com.vedha.project.model.LoginModel;
import com.vedha.project.repository.LoginRepositoryInt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoginService {

    @Autowired
    private LoginRepositoryInt repo;

    public String checkUserExists(String email, String username) {

        if (repo.existsByEmail(email.trim())) return "Email";
        if (repo.existsByUsername(username.trim())) return "Username";

        return null;
    }

    public LoginModel register(LoginDto loginDto) {

        LoginModel user = new LoginModel();
        user.setUsername(loginDto.getUsername());
        user.setEmail(loginDto.getEmail());
        user.setNumber(loginDto.getNumber());
        user.setPassword(loginDto.getPassword());

        return repo.save(user);
    }

    public LoginModel login(String identifier, String password) {
        return repo.findAll().stream()
                .filter(u -> 
                    (u.getEmail().equalsIgnoreCase(identifier) 
                    || u.getUsername().equalsIgnoreCase(identifier))
                    && u.getPassword().equals(password)
                )
                .findFirst().orElse(null);
    }

    public List<LoginModel> getUsers() {
        return repo.findAll();
    }
}
