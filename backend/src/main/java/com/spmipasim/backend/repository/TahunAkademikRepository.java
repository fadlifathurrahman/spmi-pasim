package com.spmipasim.backend.repository;

import com.spmipasim.backend.model.TahunAkademik;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TahunAkademikRepository extends JpaRepository<TahunAkademik, Long> {
    List<TahunAkademik> findByStatus(String status);
}