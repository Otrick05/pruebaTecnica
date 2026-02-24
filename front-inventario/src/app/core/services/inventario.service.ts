import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { InventarioStats, PaginatedProductoResponse } from '../models/inventario.models';

@Injectable({
    providedIn: 'root'
})
export class InventarioService {

    private apiUrl = 'http://localhost:8080/api/productos';

    constructor(private http: HttpClient) { }

    getInventarioStats(): Observable<InventarioStats> {
        return of({
            totalProducts: 2543,
            totalValue: 1200000,
            lowStock: 12,
            outOfStock: 4
        });
    }

    getProductos(page: number = 0, filtro?: 'todos' | 'habilitados' | 'deshabilitados'): Observable<PaginatedProductoResponse> {
        let params = new HttpParams().set('page', page.toString());

        if (filtro === 'habilitados') {
            params = params.set('habilitado', 'true');
        } else if (filtro === 'deshabilitados') {
            params = params.set('habilitado', 'false');
        }

        return this.http.get<PaginatedProductoResponse>(this.apiUrl, { params });
    }
}
