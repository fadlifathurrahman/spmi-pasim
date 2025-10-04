package com.spmipasim.backend.repository;

import com.spmipasim.backend.model.Indikator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IndikatorRepository extends JpaRepository<Indikator, Long> {
    List<Indikator> findByStatus(String status);
}