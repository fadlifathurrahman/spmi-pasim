package com.spmipasim.backend.controller;

import com.spmipasim.backend.model.TahunAkademik;
import com.spmipasim.backend.repository.TahunAkademikRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tahun-akademik")
public class TahunAkademikController {

    @Autowired
    private TahunAkademikRepository tahunAkademikRepository;

    @GetMapping
    public List<TahunAkademik> getAllTahunAkademik() {
        return tahunAkademikRepository.findAll();
    }

    @PostMapping
    public TahunAkademik createTahunAkademik(@RequestBody TahunAkademik tahunAkademik) {
        return tahunAkademikRepository.save(tahunAkademik);
    }

    @GetMapping("/{id}")
    public TahunAkademik getTahunAkademikById(@PathVariable Long id) {
        return tahunAkademikRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public TahunAkademik updateTahunAkademik(@PathVariable Long id, @RequestBody TahunAkademik updatedTahunAkademik) {
        TahunAkademik tahunAkademik = tahunAkademikRepository.findById(id).orElse(null);
        if (tahunAkademik != null) {
            tahunAkademik.setRentang(updatedTahunAkademik.getRentang());
            tahunAkademik.setStatus(updatedTahunAkademik.getStatus());
            return tahunAkademikRepository.save(tahunAkademik);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteTahunAkademik(@PathVariable Long id) {
        tahunAkademikRepository.deleteById(id);
    }

    @GetMapping("/status/{status}")
    public List<TahunAkademik> getTahunAkademikByStatus(@PathVariable String status) {
        return tahunAkademikRepository.findByStatus(status);
    }
}
