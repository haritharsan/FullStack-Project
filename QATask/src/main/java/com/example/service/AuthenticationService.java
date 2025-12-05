package com.example.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.controller.AuthenticationController;
import com.example.dto.AuthenticationDto;
import com.example.model.AuthenticationModel;
import com.example.repositoryint.AuthenticationInt;

@Service
public class AuthenticationService {

    private final AuthenticationController authenticationController;

	@Autowired
	public AuthenticationInt authenticationInt;

    AuthenticationService(AuthenticationController authenticationController) {
        this.authenticationController = authenticationController;
    }
	
	public AuthenticationModel loginUser(AuthenticationDto authenticationDto) {
		AuthenticationModel login = new AuthenticationModel();
		login.setUsername(authenticationDto.getUsername());
		login.setPassword(authenticationDto.getPassword());
		login.setEmail(authenticationDto.getEmail());
		login.setPhone(authenticationDto.getPhone());
		return authenticationInt.save(login);
	}
	public List<AuthenticationModel> getUser(){
		return authenticationInt.findAll();
	}
}
