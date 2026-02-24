import { JwtPayload } from './../models/jwt-payload.models';
import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, of, catchError, map, retry, switchMap, filter } from 'rxjs';
import { Usuario } from '../models/usuario.models';
import { LoginRequest } from '../models/login-request.models';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public currentUser = signal<Usuario | null>(null);
    private readonly platformId = inject(PLATFORM_ID);
    private readonly API_URL = 'http://localhost:8080/api';
    private tokenTimer: any;

    constructor(private http: HttpClient) {
        this.checkInitialAuth();
    }

    private checkInitialAuth() {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }

        const jwt = localStorage.getItem('jwt');
        if (!jwt) {
            return;
        }

        try {
            const payload: JwtPayload = this.decodeJwt(jwt);
            if (payload.exp * 1000 < Date.now()) {
                this.logout(); // Token expirado
                return;
            }

            this.handleAuthSuccess(jwt);

        } catch (error) {
            console.error('Error decoding JWT during initial auth:', error);
            this.logout();
        }
    }


    private handleAuthSuccess(token: string): void {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('jwt', token);
            this.scheduleTokenExpiration(token);
        }

        console.log('Token recibido:', token);

        try {
            // Decodificar y extraer info del JWT directamente
            const decodedToken = this.decodeJwt(token);

            // Construimos el objeto Usuario a partir de los claims del JWT
            const usuario: Usuario = {
                correo: decodedToken.sub, // 'sub' (subject) contiene el correo 
                nombreUsuario: decodedToken.nombreUsuario || '',
                rol: decodedToken.rol || '',
            };

            this.currentUser.set(usuario);
        } catch (error) {
            console.error('Error handling auth success:', error);
        }
    }

    login(credentials: LoginRequest): Observable<boolean> {
        return this.http.post<any>(`${this.API_URL}/auth/login`, credentials).pipe(
            tap(response => {
                console.log('Login response from backend:', response);
                const token = response?.jwt || response?.token || response?.access_token;
                if (token) {
                    this.handleAuthSuccess(token);
                } else {
                    console.warn('Login response does not contain "jwt", "token", or "access_token":', response);
                }
            }),
            map(response => !!(response?.jwt || response?.token || response?.access_token)),
            catchError((error) => {
                console.error('Login error in AuthService:', error);
                return of(false);
            })
        );
    }


    logout() {
        if (this.tokenTimer) {
            clearTimeout(this.tokenTimer);
        }
        if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem('jwt');
        }
        this.currentUser.set(null);
    }

    private scheduleTokenExpiration(token: string) {
        const payload = this.decodeJwt(token);
        const expiresAt = payload.exp * 1000;
        const timeout = expiresAt - Date.now();
        console.log(`Token expiration scheduled. Expires at: ${new Date(expiresAt).toISOString()}, TTL (ms): ${timeout}`);

        if (this.tokenTimer) {
            clearTimeout(this.tokenTimer);
        }

        if (timeout > 0) {
            this.tokenTimer = setTimeout(() => {
                this.handleSessionExpired();
            }, timeout);
        } else {
            this.handleSessionExpired();
        }
    }

    handleSessionExpired() {
        this.logout();
        if (isPlatformBrowser(this.platformId)) {
            alert('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
            window.location.reload();
        }
    }

    private decodeJwt(token: string): JwtPayload {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload;
        } catch (e) {
            console.error('Failed to decode JWT', e);
            throw e;
        }
    }

    getToken(): string | null {
        if (isPlatformBrowser(this.platformId)) {
            return localStorage.getItem('jwt');
        }
        return null;
    }


}
