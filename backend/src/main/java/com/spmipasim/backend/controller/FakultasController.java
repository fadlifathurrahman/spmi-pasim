package com.spmipasim.backend.controller;

import com.spmipasim.backend.model.Fakultas;
import com.spmipasim.backend.repository.FakultasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fakultas")
public class FakultasController {

    @Autowired
    private FakultasRepository fakultasRepository;

    @GetMapping
    public List<Fakultas> getAllFakultas() {
        return fakultasRepository.findAll();
    }

    @PostMapping
    public Fakultas createFakultas(@RequestBody Fakultas fakultas) {
        return fakultasRepository.save(fakultas);
    }

    @GetMapping("/{id}")
    public Fakultas getFakultasById(@PathVariable Long id) {
        return fakultasRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Fakultas updateFakultas(@PathVariable Long id, @RequestBody Fakultas updatedFakultas) {
        Fakultas fakultas = fakultasRepository.findById(id).orElse(null);
        if (fakultas != null) {
            fakultas.setNamaFakultas(updatedFakultas.getNamaFakultas());
            fakultas.setStatus(updatedFakultas.getStatus());
            return fakultasRepository.save(fakultas);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteFakultas(@PathVariable Long id) {
        fakultasRepository.deleteById(id);
    }

    @GetMapping("/status/{status}")
    public List<Fakultas> getFakultasByStatus(@PathVariable String status) {
        return fakultasRepository.findByStatus(status);
    }
}
