import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-left-side',
  imports: [RouterModule],
  templateUrl: './left-side.html',
  styleUrl: './left-side.scss',
})
export class LeftSide {

  private authService = inject(AuthService);
  private router = inject(Router);
  public currentUser = this.authService.currentUser;

  logout() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }

}
