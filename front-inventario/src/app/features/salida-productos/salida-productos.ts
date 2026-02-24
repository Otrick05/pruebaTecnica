import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { InventarioService } from '../../core/services/inventario.service';
import { ProductoService } from '../../core/services/producto.service';
import { ItemInventario } from '../../core/models/inventario.models';

export interface OrderItem {
  id: string;
  producto: ItemInventario;
  cantidad: number;
  razon: string;
  destino: string;
}

@Component({
  selector: 'app-salida-productos',
  imports: [CommonModule],
  templateUrl: './salida-productos.html',
  styleUrl: './salida-productos.scss',
})
export class SalidaProductos implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private inventarioService = inject(InventarioService);
  private productoService = inject(ProductoService);

  // El backend se encarga de mandar puros items habilitados, por tanto usamos esto directo
  inventoryItems = signal<ItemInventario[]>([]);

  // Estado para la orden de salida
  orderItems = signal<OrderItem[]>([]);

  // Computed properties
  totalOrderItems = computed(() => this.orderItems().reduce((acc, item) => acc + item.cantidad, 0));
  totalOrderValue = computed(() => this.orderItems().reduce((acc, item) => acc + (item.cantidad * item.producto.precioUnitario), 0));

  ngOnInit() {
    const user = this.authService.currentUser();
    // Prevenir el acceso de usuarios con rol ADMIN
    if (user?.rol === 'ADMIN') {
      this.router.navigate(['/inventario']);
    }

    this.loadProducts();
  }

  loadProducts() {
    this.inventarioService.getProductos().subscribe(items => {
      this.inventoryItems.set(items.content);
    });
  }

  addToOrder(producto: ItemInventario) {
    if (producto.stock === 0) return;

    this.orderItems.update(items => {
      const existing = items.find(i => i.producto.id === producto.id);
      if (existing) {
        if (existing.cantidad < producto.stock) {
          existing.cantidad++;
        }
        return [...items];
      } else {
        return [...items, {
          id: Date.now().toString(),
          producto,
          cantidad: 1,
          razon: 'Venta', // Default
          destino: ''
        }];
      }
    });
  }

  removeFromOrder(itemToRemove: OrderItem) {
    this.orderItems.update(items => items.filter(i => i.id !== itemToRemove.id));
  }

  updateQuantity(item: OrderItem, delta: number) {
    this.orderItems.update(items => {
      const current = items.find(i => i.id === item.id);
      if (current) {
        const newQuantity = current.cantidad + delta;
        if (newQuantity > 0 && newQuantity <= current.producto.stock) {
          current.cantidad = newQuantity;
        }
      }
      return [...items];
    });
  }

  updateItemConfig(item: OrderItem, field: 'razon' | 'destino', value: string) {
    this.orderItems.update(items => {
      const current = items.find(i => i.id === item.id);
      if (current) {
        current[field] = value;
      }
      return [...items];
    });
  }

  clearOrder() {
    this.orderItems.set([]);
  }

  processOrder() {
    const items = this.orderItems();
    if (items.length === 0) return;

    // We process each item. A better approach for production is a single backend endpoint 
    // for a batch order, but here we call the individual endpoint per item.
    let completed = 0;
    let hasErrors = false;

    items.forEach(item => {
      const payload = {
        cantidad: item.cantidad,
        motivo: item.razon,
        destino: item.destino
      };

      this.productoService.registrarSalida(item.producto.id.toString(), payload).subscribe({
        next: () => {
          completed++;
          this.checkCompletion(completed, items.length, hasErrors);
        },
        error: (err) => {
          console.error('Error al registrar salida de', item.producto.nombre, err);
          hasErrors = true;
          completed++;
          this.checkCompletion(completed, items.length, hasErrors);
        }
      });
    });
  }

  private checkCompletion(completed: number, total: number, hasErrors: boolean) {
    if (completed === total) {
      if (hasErrors) {
        alert('Se procesó la orden pero hubieron algunos errores. Revisa la consola.');
      } else {
        alert('¡Orden de salida procesada con éxito!');
      }
      this.clearOrder();
      this.loadProducts(); // Reload stock
    }
  }
}

