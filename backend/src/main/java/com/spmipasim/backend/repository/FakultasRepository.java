package com.spmipasim.backend.repository;

import com.spmipasim.backend.model.Fakultas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FakultasRepository extends JpaRepository<Fakultas, Long> {
    List<Fakultas> findByStatus(String status);
}