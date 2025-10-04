package com.spmipasim.backend.repository;

import com.spmipasim.backend.model.Substandar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubstandarRepository extends JpaRepository<Substandar, Long> {
    List<Substandar> findByStatus(String status);

    List<Substandar> findByStandarId(Long standarId);
}