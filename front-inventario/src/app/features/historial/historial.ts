import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistorialService } from '../../core/services/historial.service';
import { HistorialProducto, PaginatedHistorialResponse } from '../../core/models/historial.models';
import { ListdropfiltroHistorialComponent, HistorialFilterOption } from './listdropfiltro-historial/listdropfiltro-historial.component';

import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule, ListdropfiltroHistorialComponent],
  templateUrl: './historial.html',
  styleUrl: './historial.scss',
})
export class Historial implements OnInit {

  historialItems = signal<HistorialProducto[]>([]);
  currentFilter = signal<HistorialFilterOption>('todos');
  currentPage = signal(0);
  totalPages = signal(0);
  totalElements = signal(0);

  constructor(
    private historialService: HistorialService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.authService.currentUser()?.rol !== 'ADMIN') {
      this.router.navigate(['/inventario']);
      return;
    }

    this.loadHistorial();
  }

  loadHistorial(): void {
    this.historialService.getHistorial(this.currentPage(), this.currentFilter()).subscribe({
      next: (data: PaginatedHistorialResponse) => {
        this.historialItems.set(data.content);
        this.totalPages.set(data.totalPages);
        this.totalElements.set(data.totalElements);
      },
      error: (err) => {
        console.error('Error fetching historial', err);
        this.historialItems.set([
          { id: 1, productoId: 101, nombreProducto: 'Excavadora X200', motivo: 'Compra de inventario', tipoMovimiento: 'ENTRADA', fecha: new Date() },
          { id: 2, productoId: 102, nombreProducto: 'Taladro DeWalt', destino: 'Proyecto Alpha', tipoMovimiento: 'SALIDA', fecha: new Date() }
        ]);
        this.totalElements.set(2);
        this.totalPages.set(1);
      }
    });
  }

  onFilterChange(filter: HistorialFilterOption): void {
    this.currentFilter.set(filter);
    this.currentPage.set(0); // Reset to first page
    this.loadHistorial();
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages() - 1) {
      this.currentPage.update(p => p + 1);
      this.loadHistorial();
    }
  }

  previousPage(): void {
    if (this.currentPage() > 0) {
      this.currentPage.update(p => p - 1);
      this.loadHistorial();
    }
  }
}
