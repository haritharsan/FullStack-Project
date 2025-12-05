package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Tender;
import com.example.demo.service.TenderService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/tenders")
public class TenderController {

    @Autowired
    private TenderService tenderService;

    // CREATE Tender
    @PostMapping
    public Tender addTender(@RequestBody Tender tender) {
        return tenderService.addTender(tender);
    }

    // READ All Tenders
    @GetMapping
    public List<Tender> getAllTenders() {
        return tenderService.getAllTenders();
    }

    // READ Tender by ID
    @GetMapping("/{id}")
    public Tender getTenderById(@PathVariable Long id) {
        return tenderService.getTenderById(id);
    }

    // UPDATE Tender
    @PutMapping("/{id}")
    public Tender updateTender(@PathVariable Long id, @RequestBody Tender tender) {
        return tenderService.updateTender(id, tender);
    }

    // DELETE Tender
    @DeleteMapping("/{id}")
    public String deleteTender(@PathVariable Long id) {
        boolean deleted = tenderService.deleteTender(id);
        return deleted ? "Tender Deleted Successfully" : "Tender Not Found!";
    }
}
