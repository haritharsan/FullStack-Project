package com.example.demo.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Tender;
import com.example.demo.repositoryint.TenderRepository;


@Service
public class TenderService {

    @Autowired
    private TenderRepository tenderRepository;

    // Add Tender
    public Tender addTender(Tender tender) {
        return tenderRepository.save(tender);
    }

    // Get All Tenders
    public List<Tender> getAllTenders() {
        return tenderRepository.findAll();
    }

    // Get Tender by ID
    public Tender getTenderById(Long id) {
        return tenderRepository.findById(id).orElse(null);
    }

    // Update Tender
    public Tender updateTender(Long id, Tender tenderDetails) {
        Tender existing = tenderRepository.findById(id).orElse(null);

        if (existing != null) {
            existing.setTitle(tenderDetails.getTitle());
            existing.setRefNo(tenderDetails.getRefNo());
            existing.setStatus(tenderDetails.getStatus());
            existing.setLastDate(tenderDetails.getLastDate());
            return tenderRepository.save(existing);
        }
        return null;
    }

    // Delete Tender
    public boolean deleteTender(Long id) {
        Tender tender = tenderRepository.findById(id).orElse(null);
        if (tender != null) {
            tenderRepository.delete(tender);
            return true;
        }
        return false;
    }
}
