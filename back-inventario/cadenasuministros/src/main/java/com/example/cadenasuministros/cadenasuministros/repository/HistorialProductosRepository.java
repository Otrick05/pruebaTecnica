package com.example.cadenasuministros.cadenasuministros.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.cadenasuministros.cadenasuministros.model.HistorialProductos;

@Repository
public interface HistorialProductosRepository extends JpaRepository<HistorialProductos, Long> {

    Page<HistorialProductos> findByTipo(HistorialProductos.Tipo tipo, Pageable pageable);
}
