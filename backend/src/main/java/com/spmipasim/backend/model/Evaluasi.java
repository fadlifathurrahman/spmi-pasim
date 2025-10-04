package com.spmipasim.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "evaluasi")
public class Evaluasi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_periode", referencedColumnName = "id")
    private Periode periode;

    @ManyToOne
    @JoinColumn(name = "id_standar", referencedColumnName = "id")
    private Standar standar;

    @ManyToOne
    @JoinColumn(name = "id_substandar", referencedColumnName = "id")
    private Substandar substandar;

    @ManyToOne
    @JoinColumn(name = "id_indikator", referencedColumnName = "id")
    private Indikator indikator;

    @ManyToOne
    @JoinColumn(name = "id_target", referencedColumnName = "id")
    private Target target;

    @ManyToOne
    @JoinColumn(name = "id_capaian", referencedColumnName = "id")
    private Capaian capaian;

    @Column(name = "diverifikasi")
    private Boolean diverifikasi;

    private String status;
}