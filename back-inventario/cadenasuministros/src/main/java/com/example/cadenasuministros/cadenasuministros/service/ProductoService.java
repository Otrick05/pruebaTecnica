package com.example.cadenasuministros.cadenasuministros.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.cadenasuministros.cadenasuministros.DTO.request.CambioStockRequestDTO;
import com.example.cadenasuministros.cadenasuministros.DTO.request.ProductoRequestDTO;
import com.example.cadenasuministros.cadenasuministros.DTO.response.ProductoResponseDTO;
import com.example.cadenasuministros.cadenasuministros.model.Producto;
import com.example.cadenasuministros.cadenasuministros.model.HistorialProductos;
import com.example.cadenasuministros.cadenasuministros.model.Usuario;
import com.example.cadenasuministros.cadenasuministros.repository.ProductoRepository;
import com.example.cadenasuministros.cadenasuministros.repository.UsuarioRepository;
import com.example.cadenasuministros.cadenasuministros.repository.HistorialProductosRepository;

import jakarta.transaction.Transactional;

@Service
public class ProductoService {

    private final ProductoRepository productoRepository;
    private final UsuarioRepository usuarioRepository;
    private final HistorialProductosRepository historialProductosRepository;

    public ProductoService(ProductoRepository productoRepository,
            UsuarioRepository usuarioRepository,
            HistorialProductosRepository historialProductosRepository) {
        this.productoRepository = productoRepository;
        this.usuarioRepository = usuarioRepository;
        this.historialProductosRepository = historialProductosRepository;
    }

    public Page<ProductoResponseDTO> getProductos(Boolean habilitado, int page) {
        Pageable pageable = PageRequest.of(page, 20); // 20 elementos por página obligatorios

        Page<Producto> productosPage;
        if (habilitado == null) {
            productosPage = productoRepository.findAll(pageable);
        } else {
            productosPage = productoRepository.findByHabilitado(habilitado, pageable);
        }

        return productosPage.map(producto -> new ProductoResponseDTO().fromEntity(producto));
    }

    public ProductoResponseDTO createProducto(ProductoRequestDTO producto) {
        Producto nuevoProducto = new Producto();
        nuevoProducto.setNombre(producto.getNombre());
        nuevoProducto.setCategoria(producto.getCategoria());
        nuevoProducto.setPrecio(producto.getPrecio());
        nuevoProducto.setDescripcion(producto.getDescripcion());

        return new ProductoResponseDTO().fromEntity(productoRepository.save(nuevoProducto));
    }

    @Transactional
    public ProductoResponseDTO aumentarStockProducto(Long id, CambioStockRequestDTO cambioStock) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con IF: " + id));

        producto.setStock(producto.getStock() + cambioStock.getCantidad());
        Producto savedProducto = productoRepository.save(producto);

        registrarHistorial(savedProducto, HistorialProductos.Tipo.ENTRADA, cambioStock.getMotivo(),
                cambioStock.getDestino());

        return new ProductoResponseDTO().fromEntity(savedProducto);
    }

    @Transactional
    public ProductoResponseDTO disminuirStockProducto(Long id, CambioStockRequestDTO cambioStock) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con ID: " + id));

        if (producto.getStock() < cambioStock.getCantidad()) {
            throw new RuntimeException("Stock insuficiente para realizar la operación.");
        }

        producto.setStock(producto.getStock() - cambioStock.getCantidad());
        Producto savedProducto = productoRepository.save(producto);

        registrarHistorial(savedProducto, HistorialProductos.Tipo.SALIDA, cambioStock.getMotivo(),
                cambioStock.getDestino());

        return new ProductoResponseDTO().fromEntity(savedProducto);
    }

    @Transactional
    public ProductoResponseDTO updateEstadoProducto(Long id, boolean estado) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con ID: " + id));

        producto.setHabilitado(estado);
        Producto savedProducto = productoRepository.save(producto);

        return new ProductoResponseDTO().fromEntity(savedProducto);
    }

    private void registrarHistorial(Producto producto, HistorialProductos.Tipo tipo, String motivo, String destino) {
        String username = org.springframework.security.core.context.SecurityContextHolder.getContext()
                .getAuthentication().getName();
        Usuario usuario = usuarioRepository.findByCorreo(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado: " + username));

        HistorialProductos historial = new HistorialProductos();
        historial.setProducto(producto);
        historial.setTipo(tipo);
        historial.setMotivo(motivo);
        historial.setDestino(destino);
        historial.setUsuario(usuario);
        // fecha is auto-set by default

        historialProductosRepository.save(historial);
    }
}
