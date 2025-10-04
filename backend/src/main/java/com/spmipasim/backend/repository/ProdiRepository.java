package com.spmipasim.backend.repository;

import com.spmipasim.backend.model.Prodi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProdiRepository extends JpaRepository<Prodi, Long> {
    List<Prodi> findByStatus(String status);

    List<Prodi> findByFakultasId(Long fakultasId);
}