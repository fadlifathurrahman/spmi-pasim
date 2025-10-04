package com.spmipasim.backend.repository;

import com.spmipasim.backend.model.Capaian;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CapaianRepository extends JpaRepository<Capaian, Long> {
    List<Capaian> findByStatus(String status);
}