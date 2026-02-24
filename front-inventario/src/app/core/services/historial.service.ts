import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedHistorialResponse } from '../models/historial.models';

@Injectable({
    providedIn: 'root'
})
export class HistorialService {
    private apiUrl = 'http://localhost:8080/api/historial-productos';

    constructor(private http: HttpClient) { }

    getHistorial(page: number = 0, tipo?: string): Observable<PaginatedHistorialResponse> {
        let params = new HttpParams().set('page', page.toString());

        if (tipo && tipo !== 'todos') {
            params = params.set('tipo', tipo.toUpperCase());
        }

        return this.http.get<PaginatedHistorialResponse>(this.apiUrl, { params });
    }
}
