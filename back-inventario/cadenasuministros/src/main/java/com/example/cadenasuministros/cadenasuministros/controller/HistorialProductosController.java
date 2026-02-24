package com.example.cadenasuministros.cadenasuministros.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.cadenasuministros.cadenasuministros.DTO.response.HistorialProductosResponseDTO;
import com.example.cadenasuministros.cadenasuministros.model.HistorialProductos;
import com.example.cadenasuministros.cadenasuministros.service.HistorialProductosService;

@RestController
@RequestMapping("api/historial-productos")
@PreAuthorize("hasAuthority('LEER_HISTORIAL_PRODUCTOS')")
public class HistorialProductosController {

    private final HistorialProductosService historialProductosService;

    public HistorialProductosController(HistorialProductosService historialProductosService) {
        this.historialProductosService = historialProductosService;
    }

    @GetMapping
    public ResponseEntity<Page<HistorialProductosResponseDTO>> getHistorialProductos(
            @RequestParam(required = false) HistorialProductos.Tipo tipo,
            @RequestParam(defaultValue = "0") int page) {

        Page<HistorialProductosResponseDTO> historialProductos = historialProductosService.getHistorialProductos(tipo,
                page);
        return ResponseEntity.ok(historialProductos);
    }

}
