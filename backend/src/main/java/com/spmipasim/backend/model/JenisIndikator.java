package com.spmipasim.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "jenis_indikator")
public class JenisIndikator {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "kode")
    private String kode;

    @Column(name = "nama_indikator")
    private String namaIndikator;

    private String status;
}