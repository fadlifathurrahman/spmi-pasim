package com.spmipasim.backend.repository;

import com.spmipasim.backend.model.Evaluasi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EvaluasiRepository extends JpaRepository<Evaluasi, Long> {
    List<Evaluasi> findByStatus(String status);

    List<Evaluasi> findByPeriodeId(Long periodeId);

    List<Evaluasi> findByStandarId(Long standarId);

    List<Evaluasi> findByDiverifikasi(Boolean diverifikasi);
}