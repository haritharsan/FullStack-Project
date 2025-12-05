package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


import com.example.dto.AuthenticationDto;
import com.example.model.AuthenticationModel;
import com.example.service.AuthenticationService;



@RestController
public class AuthenticationController {

	@Autowired
	public AuthenticationService authenticationService;
	
	@PostMapping("/authentication/post")
	public AuthenticationModel saveUser(@RequestBody AuthenticationDto authenticationDto) {
		return authenticationService.loginUser(authenticationDto);
	}
	
	@GetMapping("/authentication/get")
	public List<AuthenticationModel> findAll() {
		return authenticationService.getUser();
	}
}
