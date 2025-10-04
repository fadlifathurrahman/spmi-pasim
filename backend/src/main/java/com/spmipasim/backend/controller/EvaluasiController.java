package com.spmipasim.backend.controller;

import com.spmipasim.backend.model.Evaluasi;
import com.spmipasim.backend.repository.EvaluasiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/evaluasi")
public class EvaluasiController {

    @Autowired
    private EvaluasiRepository evaluasiRepository;

    @GetMapping
    public List<Evaluasi> getAllEvaluasi() {
        return evaluasiRepository.findAll();
    }

    @PostMapping
    public Evaluasi createEvaluasi(@RequestBody Evaluasi evaluasi) {
        return evaluasiRepository.save(evaluasi);
    }

    @GetMapping("/{id}")
    public Evaluasi getEvaluasiById(@PathVariable Long id) {
        return evaluasiRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Evaluasi updateEvaluasi(@PathVariable Long id, @RequestBody Evaluasi updatedEvaluasi) {
        Evaluasi evaluasi = evaluasiRepository.findById(id).orElse(null);
        if (evaluasi != null) {
            evaluasi.setPeriode(updatedEvaluasi.getPeriode());
            evaluasi.setStandar(updatedEvaluasi.getStandar());
            evaluasi.setSubstandar(updatedEvaluasi.getSubstandar());
            evaluasi.setIndikator(updatedEvaluasi.getIndikator());
            evaluasi.setTarget(updatedEvaluasi.getTarget());
            evaluasi.setCapaian(updatedEvaluasi.getCapaian());
            evaluasi.setDiverifikasi(updatedEvaluasi.getDiverifikasi());
            evaluasi.setStatus(updatedEvaluasi.getStatus());
            return evaluasiRepository.save(evaluasi);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteEvaluasi(@PathVariable Long id) {
        evaluasiRepository.deleteById(id);
    }

    @GetMapping("/status/{status}")
    public List<Evaluasi> getEvaluasiByStatus(@PathVariable String status) {
        return evaluasiRepository.findByStatus(status);
    }

    @GetMapping("/periode/{periodeId}")
    public List<Evaluasi> getEvaluasiByPeriode(@PathVariable Long periodeId) {
        return evaluasiRepository.findByPeriodeId(periodeId);
    }

    @GetMapping("/standar/{standarId}")
    public List<Evaluasi> getEvaluasiByStandar(@PathVariable Long standarId) {
        return evaluasiRepository.findByStandarId(standarId);
    }

    @GetMapping("/verifikasi/{diverifikasi}")
    public List<Evaluasi> getEvaluasiByVerifikasi(@PathVariable Boolean diverifikasi) {
        return evaluasiRepository.findByDiverifikasi(diverifikasi);
    }
}