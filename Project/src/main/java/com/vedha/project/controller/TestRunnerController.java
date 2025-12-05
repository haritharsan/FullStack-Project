package com.vedha.project.controller;

import com.vedha.project.service.TestExecutionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/test")
@CrossOrigin("*")
public class TestRunnerController {

    @Autowired
    private TestExecutionService testExecutionService;

    @GetMapping("/run")
    public ResponseEntity<?> executeTests() {
        String result = testExecutionService.runTests();
        return ResponseEntity.ok(result);
    }
}
