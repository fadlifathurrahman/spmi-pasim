package com.spmipasim.backend.repository;

import com.spmipasim.backend.model.JenisIndikator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JenisIndikatorRepository extends JpaRepository<JenisIndikator, Long> {
    List<JenisIndikator> findByStatus(String status);
}