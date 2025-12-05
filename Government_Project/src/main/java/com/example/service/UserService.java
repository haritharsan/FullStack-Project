package com.example.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.dto.UserRequestDto;
import com.example.model.User;
import com.example.repositoryInt.UserRepository;

@Service

public class UserService {

	@Autowired
    private  UserRepository userRepository;

    public String register(UserRequestDto dto) {

        if (userRepository.existsByLoginId(dto.getLoginId())) {
            return "Login ID already exists!";
        }

        if (userRepository.existsByAadhaar(dto.getAadhaar())) {
            return "Aadhaar already registered!";
        }

        if (!dto.getPassword().equals(dto.getConfirmPassword())) {
            return "Passwords do not match!";
        }

        User user = new User();
        user.setName(dto.getName());
        user.setDistrict(dto.getDistrict());
        user.setTaluk(dto.getTaluk());
        user.setMobile(dto.getMobile());
        user.setEmail(dto.getEmail());
        user.setAadhaar(dto.getAadhaar());
        user.setLoginId(dto.getLoginId());
        user.setPassword(dto.getPassword()); // 🔥 No encryption

        userRepository.save(user);
        return "success";
    }

    public String login(String loginId, String password) {

        User user = userRepository.findByLoginId(loginId);

        if (user == null) return "invalid";

        if (!user.getPassword().equals(password)) return "invalid";

        return "success";
    }
}
