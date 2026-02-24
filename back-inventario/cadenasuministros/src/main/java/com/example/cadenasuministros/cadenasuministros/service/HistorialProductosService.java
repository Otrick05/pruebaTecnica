package com.example.cadenasuministros.cadenasuministros.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.cadenasuministros.cadenasuministros.DTO.response.HistorialProductosResponseDTO;
import com.example.cadenasuministros.cadenasuministros.model.HistorialProductos;
import com.example.cadenasuministros.cadenasuministros.repository.HistorialProductosRepository;

@Service
public class HistorialProductosService {

    private final HistorialProductosRepository historialProductosRepository;

    public HistorialProductosService(HistorialProductosRepository historialProductosRepository) {
        this.historialProductosRepository = historialProductosRepository;
    }

    public Page<HistorialProductosResponseDTO> getHistorialProductos(HistorialProductos.Tipo tipo, int page) {
        Pageable pageable = PageRequest.of(page, 20); // 20 elementos por página obligatorios

        Page<HistorialProductos> historialPage;
        if (tipo == null) {
            historialPage = historialProductosRepository.findAll(pageable);
        } else {
            historialPage = historialProductosRepository.findByTipo(tipo, pageable);
        }

        return historialPage
                .map(historialProducto -> new HistorialProductosResponseDTO().fromEntity(historialProducto));
    }
}
