package com.vedha.project.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.vedha.project.dto.TestDto;
import com.vedha.project.service.TestService;



@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/test")
public class TestController {

	@Autowired
	private TestService codeAnalysisService;

	@PostMapping("/analyze")
	public List<TestDto> analyzeJavaFiles(@RequestParam("files") MultipartFile[] files) throws IOException {

	    File tempDir = Files.createTempDirectory("uploads").toFile();

	    File[] uploadedFiles = new File[files.length];
	    int index = 0;
	    for (MultipartFile file : files) {
	        File dest = new File(tempDir, file.getOriginalFilename());
	        file.transferTo(dest);
	        uploadedFiles[index++] = dest;
	    }

	    return codeAnalysisService.analyzeFiles(codeAnalysisService.getJavaFilesFromFiles(uploadedFiles));
	}
}