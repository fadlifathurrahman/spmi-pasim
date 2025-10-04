package com.spmipasim.backend.controller;

import com.spmipasim.backend.model.JenisIndikator;
import com.spmipasim.backend.repository.JenisIndikatorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jenis-indikator")
public class JenisIndikatorController {

    @Autowired
    private JenisIndikatorRepository jenisIndikatorRepository;

    @GetMapping
    public List<JenisIndikator> getAllJenisIndikator() {
        return jenisIndikatorRepository.findAll();
    }

    @PostMapping
    public JenisIndikator createJenisIndikator(@RequestBody JenisIndikator jenisIndikator) {
        return jenisIndikatorRepository.save(jenisIndikator);
    }

    @GetMapping("/{id}")
    public JenisIndikator getJenisIndikatorById(@PathVariable Long id) {
        return jenisIndikatorRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public JenisIndikator updateJenisIndikator(@PathVariable Long id,
            @RequestBody JenisIndikator updatedJenisIndikator) {
        JenisIndikator jenisIndikator = jenisIndikatorRepository.findById(id).orElse(null);
        if (jenisIndikator != null) {
            jenisIndikator.setKode(updatedJenisIndikator.getKode());
            jenisIndikator.setNamaIndikator(updatedJenisIndikator.getNamaIndikator());
            jenisIndikator.setStatus(updatedJenisIndikator.getStatus());
            return jenisIndikatorRepository.save(jenisIndikator);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteJenisIndikator(@PathVariable Long id) {
        jenisIndikatorRepository.deleteById(id);
    }

    @GetMapping("/status/{status}")
    public List<JenisIndikator> getJenisIndikatorByStatus(@PathVariable String status) {
        return jenisIndikatorRepository.findByStatus(status);
    }
}