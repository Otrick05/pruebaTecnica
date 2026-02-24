import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { ProductoRequest } from '../models/producto.models';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class ProductoService {
    private http = inject(HttpClient);
    // Assuming API_URL structure based on auth.service.ts
    private readonly API_URL = 'http://localhost:8080/api/productos';

    private authService = inject(AuthService);

    constructor() { }

    addProducto(producto: ProductoRequest): Observable<any> {
        console.log('ProductoService.addProducto sending:', producto);
        return this.http.post<any>(`${this.API_URL}`, producto).pipe(
            catchError((error) => {
                console.error('ProductoService.addProducto Error caught:', error);
                return throwError(() => error);
            })
        );
    }

    aumentarStock(id: string, payload: { cantidad: number, motivo: string, destino?: string }): Observable<any> {
        const user = this.authService.currentUser();
        // Adjust role check depending on backend exact format
        if (user?.rol !== 'ADMIN' && user?.rol !== 'ROLE_ADMIN' && user?.rol !== 'Administrador') {
            return throwError(() => new Error('No tienes permisos de Administrador para modificar el stock.'));
        }
        return this.http.patch<any>(`${this.API_URL}/entradaProducto/${id}`, payload);
    }

    toggleEstado(id: string, nuevoEstado: boolean): Observable<any> {
        const user = this.authService.currentUser();
        if (user?.rol !== 'ADMIN' && user?.rol !== 'ROLE_ADMIN' && user?.rol !== 'Administrador') {
            return throwError(() => new Error('No tienes permisos de Administrador para modificar el stock.'));
        }
        return this.http.patch<any>(`${this.API_URL}/actualizarEstado/${id}`, nuevoEstado);
    }

    registrarSalida(id: string, payload: { cantidad: number; motivo: string; destino: string }): Observable<any> {
        return this.http.patch<any>(`${this.API_URL}/salidaProducto/${id}`, payload);
    }
}
