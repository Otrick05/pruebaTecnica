import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { Login } from './features/login/login';
import { Inventario } from './features/inventario/inventario';
import { SalidaProductos } from './features/salida-productos/salida-productos';
import { Layout } from './layout/layout';
import { Historial } from './features/historial/historial';

export const routes: Routes = [
    {
        path: 'login',
        component: Login
    },
    {
        path: '',
        component: Layout,
        canActivate: [authGuard],
        children: [
            {
                path: 'inventario',
                component: Inventario
            },
            {
                path: 'salidas',
                component: SalidaProductos
            },
            {
                path: 'historial',
                component: Historial
            },
            {
                path: '',
                redirectTo: 'inventario',
                pathMatch: 'full'
            }
        ]
    },
    {
        // Si no se encuentra ninguna ruta, redirige al inventario.
        path: '**',
        redirectTo: 'inventario'
    }
];
