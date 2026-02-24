import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    // Llama al método currentUser() para verificar si hay una sesión activa.
    if (authService.currentUser()) {
        return true;
    } else {
        // No hay sesión: abortamos la navegación y lo enviamos al login
        router.navigate(['/login']);
        return false;
    }
};