package com.vedha.project.service;

import org.springframework.stereotype.Service;

@Service
public class TestExecutionService {

    public String runTests() {
        try {
            ProcessBuilder builder = new ProcessBuilder();
            builder.command("cmd.exe", "/c", "mvn clean test");
            builder.redirectErrorStream(true);

            Process process = builder.start();
            process.waitFor();

            return "Tests executed successfully!";
        } catch (Exception e) {
            return "Test execution failed: " + e.getMessage();
        }
    }
}
