package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.CertificateType;
import com.example.demo.repositoryint.CertificateTypeRepository;

@Service
public class CertificateTypeService {

    @Autowired
    private CertificateTypeRepository repo;

    public CertificateType addCertificate(CertificateType cert) {
        return repo.save(cert);
    }

    public List<CertificateType> getAll() {
        return repo.findAll();
    }

    public String deleteCertificate(Long id) {
        repo.deleteById(id);
        return "Deleted successfully";
    }

    // ---------------------- UPDATE METHOD ----------------------
    public CertificateType updateCertificate(Long id, CertificateType updatedCert) {
        Optional<CertificateType> existingCertOpt = repo.findById(id);

        if (existingCertOpt.isPresent()) {
            CertificateType existingCert = existingCertOpt.get();
           existingCert.setCode(updatedCert.getCode());
           existingCert.setTitle(updatedCert.getTitle());

            return repo.save(existingCert);
        } else {
            return null; // or throw new RuntimeException("Certificate Not Found");
        }
    }
}
