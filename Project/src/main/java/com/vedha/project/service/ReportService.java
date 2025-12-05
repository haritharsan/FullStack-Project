package com.vedha.project.service;

import java.io.File;

import org.springframework.core.io.FileSystemResource;
import org.springframework.stereotype.Service;

@Service
public class ReportService {

    public FileSystemResource getLatestReport() {
        File report = new File("reports/index.html");
        return new FileSystemResource(report);
    }
}

