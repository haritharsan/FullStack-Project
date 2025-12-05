package com.example.service;





import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.repositoryint.LoginRepositoryInt;

import java.util.List;

@Service

public class loginService {

	@Autowired
    private LoginRepositoryInt loginRepositoryInt;

    public loginModel registerUser(loginDto dto) {

        if(repository.findByEmail(dto.getEmail()) != null){
            throw new RuntimeException("User already exists");
        }

        loginModel user = new loginModel();
        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setPhoneNumber(dto.getPhoneNumber());
        user.setPassword(dto.getPassword());

        return loginRepositoryInt.save(user);
    }

    public LoginModel login(String email, String password) {
        LoginModel user = repository.findByEmail(email);

        if(user == null) throw new RuntimeException("User not found");
        if(!user.getPassword().equals(password)) throw new RuntimeException("Incorrect password");

        return user;
    }

    public List<LoginModel> getAllUsers(){
        return repository.findAll();
    }
}
