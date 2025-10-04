package com.spmipasim.backend.repository;

import com.spmipasim.backend.model.Periode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PeriodeRepository extends JpaRepository<Periode, Long> {
    List<Periode> findByStatus(String status);

    List<Periode> findByProdiId(Long prodiId);

    List<Periode> findByTahunAkademikId(Long tahunAkademikId);
}