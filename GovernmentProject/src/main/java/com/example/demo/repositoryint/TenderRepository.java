package com.example.demo.repositoryint;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Tender;

public interface TenderRepository extends JpaRepository<Tender, Long> {

}
