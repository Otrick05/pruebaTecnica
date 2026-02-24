package com.example.cadenasuministros.cadenasuministros.DTO.response;

import java.time.Instant;

import com.example.cadenasuministros.cadenasuministros.model.HistorialProductos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class HistorialProductosResponseDTO {

    private Long id;
    private Long productoId;
    private String nombreProducto;
    private String motivo;
    private String destino;
    private Instant fecha;
    private HistorialProductos.Tipo tipoMovimiento;
    private String realizadoPor;

    public HistorialProductosResponseDTO fromEntity(HistorialProductos historialProductos) {
        HistorialProductosResponseDTO historialProductosResponseDTO = new HistorialProductosResponseDTO();
        historialProductosResponseDTO.setId(historialProductos.getId());

        if (historialProductos.getProducto() != null) {
            historialProductosResponseDTO.setProductoId(historialProductos.getProducto().getId());
            historialProductosResponseDTO.setNombreProducto(historialProductos.getProducto().getNombre());
        }

        historialProductosResponseDTO.setMotivo(historialProductos.getMotivo());
        historialProductosResponseDTO.setDestino(historialProductos.getDestino());

        historialProductosResponseDTO.setFecha(historialProductos.getFecha());
        historialProductosResponseDTO.setTipoMovimiento(historialProductos.getTipo());

        if (historialProductos.getUsuario() != null) {
            historialProductosResponseDTO.setRealizadoPor(historialProductos.getUsuario().getNombreUsuario());
        }

        return historialProductosResponseDTO;
    }
}
