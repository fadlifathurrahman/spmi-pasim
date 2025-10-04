package com.spmipasim.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "prodi")
public class Prodi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nama_prodi")
    private String namaProdi;

    @ManyToOne
    @JoinColumn(name = "id_fakultas", referencedColumnName = "id")
    private Fakultas fakultas;

    private String status;
}