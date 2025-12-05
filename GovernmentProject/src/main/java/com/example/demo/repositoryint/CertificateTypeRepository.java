package com.example.demo.repositoryint;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.CertificateType;



public interface CertificateTypeRepository extends JpaRepository<CertificateType, Long> {
	
}
