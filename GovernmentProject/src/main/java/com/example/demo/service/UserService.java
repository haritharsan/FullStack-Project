package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.UserDto;
import com.example.demo.model.UserModel;
import com.example.demo.repositoryint.UserRepository;

@Service
public class UserService {

    @Autowired
    public UserRepository userRepository;

    public UserModel createUser(UserDto dto) {
        UserModel user = new UserModel();
        user.setName(dto.getName());
        user.setAadhaar(dto.getAadhaar());
        user.setDistrict(dto.getDistrict());
        user.setEmail(dto.getEmail());
        user.setLoginId(dto.getLoginId());
        user.setMobile(dto.getMobile());
        user.setPassword(dto.getPassword());
        user.setDob(dto.getDob());
        user.setTaluk(dto.getTaluk());

        return userRepository.save(user);
    }

    public List<UserModel> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public List<UserModel> getAllUser() {
        return userRepository.findAll();
    }

    public boolean deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // UPDATE — SAFE VERSION
    public UserModel updateUser(Long id, UserDto dto) {
        UserModel user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found!"));

        user.setName(dto.getName());
        user.setAadhaar(dto.getAadhaar());
        user.setDistrict(dto.getDistrict());
        user.setEmail(dto.getEmail());
        user.setLoginId(dto.getLoginId());
        user.setMobile(dto.getMobile());
        user.setDob(dto.getDob());
        user.setTaluk(dto.getTaluk());

        // ✔ FIX — DO NOT UPDATE PASSWORD IF FRONTEND SENDS EMPTY
        if (dto.getPassword() != null && !dto.getPassword().trim().isEmpty()) {
            user.setPassword(dto.getPassword());
        }

        return userRepository.save(user);
    }
}
