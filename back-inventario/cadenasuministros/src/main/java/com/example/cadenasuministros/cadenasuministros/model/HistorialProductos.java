package com.example.cadenasuministros.cadenasuministros.model;

import java.time.Instant;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class HistorialProductos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = jakarta.persistence.FetchType.EAGER)
    @jakarta.persistence.JoinColumn(name = "producto_id", nullable = false)
    @NotNull
    private Producto producto;
    @NotNull
    private Tipo tipo;

    private String motivo;

    private String destino;
    @NotNull
    private Instant fecha = Instant.now();
    @ManyToOne(fetch = jakarta.persistence.FetchType.EAGER)
    @jakarta.persistence.JoinColumn(name = "usuario_id", nullable = false)
    @NotNull
    private Usuario usuario;

    public enum Tipo {
        ENTRADA,
        SALIDA
    }
}
