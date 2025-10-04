package com.spmipasim.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "periode")
public class Periode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_tahunakademik", referencedColumnName = "id")
    private TahunAkademik tahunAkademik;

    @ManyToOne
    @JoinColumn(name = "id_prodi", referencedColumnName = "id")
    private Prodi prodi;

    private String status;
}