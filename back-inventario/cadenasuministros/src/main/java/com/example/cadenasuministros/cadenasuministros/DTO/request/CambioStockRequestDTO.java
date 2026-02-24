package com.example.cadenasuministros.cadenasuministros.DTO.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CambioStockRequestDTO {

    @NotNull
    private Integer cantidad;

    private String motivo;

    private String destino;
}
