package com.example.cadenasuministros.cadenasuministros.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.cadenasuministros.cadenasuministros.DTO.request.CambioStockRequestDTO;
import com.example.cadenasuministros.cadenasuministros.DTO.request.ProductoRequestDTO;
import com.example.cadenasuministros.cadenasuministros.DTO.response.ProductoResponseDTO;
import com.example.cadenasuministros.cadenasuministros.service.ProductoService;

@RestController
@RequestMapping("api/productos")
public class ProductoController {

    private ProductoService productoService;

    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    @PreAuthorize("hasAuthority('LEER_INVENTARIO')")
    @GetMapping
    public ResponseEntity<Page<ProductoResponseDTO>> getAllProductos(
            @RequestParam(required = false) Boolean habilitado,
            @RequestParam(defaultValue = "0") int page) {

        Page<ProductoResponseDTO> productos = productoService.getProductos(habilitado, page);

        return ResponseEntity.ok(productos);
    }

    @PreAuthorize("hasAuthority('AGREGAR_PRODUCTO')")
    @PostMapping
    public ResponseEntity<ProductoResponseDTO> createProducto(@RequestBody ProductoRequestDTO producto) {

        System.out.println(producto);

        ProductoResponseDTO productoResponseDTO = productoService.createProducto(producto);

        return ResponseEntity.ok(productoResponseDTO);
    }

    @PreAuthorize("hasAuthority('AUMENTAR_STOCK_PRODUCTO')")
    @PatchMapping("/entradaProducto/{id}")
    public ResponseEntity<ProductoResponseDTO> entradaProducto(@PathVariable Long id,
            @RequestBody CambioStockRequestDTO cambioStock) {
        ProductoResponseDTO productoResponseDTO = productoService.aumentarStockProducto(id, cambioStock);
        return ResponseEntity.ok(productoResponseDTO);
    }

    @PreAuthorize("hasAuthority('CAMBIAR_ESTADO_PRODUCTO')")
    @PatchMapping("/actualizarEstado/{id}")
    public ResponseEntity<ProductoResponseDTO> updateEstadoProducto(@PathVariable Long id,
            @RequestBody boolean estado) {
        ProductoResponseDTO productoResponseDTO = productoService.updateEstadoProducto(id, estado);
        return ResponseEntity.ok(productoResponseDTO);
    }

    @PreAuthorize("hasAuthority('DECREMENTAR_STOCK_PRODUCTO')")
    @PatchMapping("/salidaProducto/{id}")
    public ResponseEntity<ProductoResponseDTO> salidaProducto(@PathVariable Long id,
            @RequestBody CambioStockRequestDTO cambioStock) {
        ProductoResponseDTO productoResponseDTO = productoService.disminuirStockProducto(id, cambioStock);
        return ResponseEntity.ok(productoResponseDTO);
    }
}
