package com.spmipasim.backend.controller;

import com.spmipasim.backend.model.Prodi;
import com.spmipasim.backend.repository.ProdiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prodi")
public class ProdiController {

    @Autowired
    private ProdiRepository prodiRepository;

    @GetMapping
    public List<Prodi> getAllProdi() {
        return prodiRepository.findAll();
    }

    @PostMapping
    public Prodi createProdi(@RequestBody Prodi prodi) {
        return prodiRepository.save(prodi);
    }

    @GetMapping("/{id}")
    public Prodi getProdiById(@PathVariable Long id) {
        return prodiRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Prodi updateProdi(@PathVariable Long id, @RequestBody Prodi updatedProdi) {
        Prodi prodi = prodiRepository.findById(id).orElse(null);
        if (prodi != null) {
            prodi.setNamaProdi(updatedProdi.getNamaProdi());
            prodi.setFakultas(updatedProdi.getFakultas());
            prodi.setStatus(updatedProdi.getStatus());
            return prodiRepository.save(prodi);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteProdi(@PathVariable Long id) {
        prodiRepository.deleteById(id);
    }

    @GetMapping("/status/{status}")
    public List<Prodi> getProdiByStatus(@PathVariable String status) {
        return prodiRepository.findByStatus(status);
    }

    @GetMapping("/fakultas/{fakultasId}")
    public List<Prodi> getProdiByFakultas(@PathVariable Long fakultasId) {
        return prodiRepository.findByFakultasId(fakultasId);
    }
}