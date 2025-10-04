package com.spmipasim.backend.repository;

import com.spmipasim.backend.model.Standar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StandarRepository extends JpaRepository<Standar, Long> {
    List<Standar> findByStatus(String status);
}