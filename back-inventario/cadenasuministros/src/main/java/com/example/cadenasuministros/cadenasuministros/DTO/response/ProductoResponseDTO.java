package com.example.cadenasuministros.cadenasuministros.DTO.response;

import com.example.cadenasuministros.cadenasuministros.model.Producto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductoResponseDTO {

    private Long id;
    private String nombre;
    private String categoria;
    private Integer stock;
    private double precio;
    private boolean habilitado;

    public ProductoResponseDTO fromEntity(Producto producto) {
        this.id = producto.getId();
        this.nombre = producto.getNombre();
        this.categoria = producto.getCategoria();
        this.precio = producto.getPrecio();
        this.stock = producto.getStock();
        this.habilitado = producto.isHabilitado();
        return this;
    }

}
