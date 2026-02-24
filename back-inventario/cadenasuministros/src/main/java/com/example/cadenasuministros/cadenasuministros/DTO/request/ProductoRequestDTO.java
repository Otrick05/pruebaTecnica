package com.example.cadenasuministros.cadenasuministros.DTO.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductoRequestDTO {

    private String nombre;
    private String categoria;
    private double precio;
    private String descripcion;
}
