import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { LoginRequest } from '../../core/models/login-request.models';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginCard: FormGroup;
  showPassword = false;
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    this.loginCard = this.fb.group({
      identifier: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    if (this.loginCard.invalid) {
      alert('Por favor completa todos los campos requeridos.');
      return;
    }

    const { identifier, password } = this.loginCard.value;
    const request: LoginRequest = { password };

    // Validar si es correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Validar si es número de empleado (hasta 8 dígitos numéricos)
    const idRegex = /^\d{1,8}$/;

    if (emailRegex.test(identifier)) {
      request.correo = identifier;
    } else if (idRegex.test(identifier)) {
      request.numeroEmpleado = identifier;
    } else {
      alert('El formato de ingreso es incorrecto. Debe ser un correo electrónico válido o un número de empleado de máximo 8 dígitos.');
      return;
    }

    this.authService.login(request).subscribe({
      next: (success) => {
        if (success) {
          this.router.navigate(['/']);
        } else {
          alert('Credenciales incorrectas o error en el inicio de sesión.');
        }
      },
      error: () => alert('Ocurrió un error al intentar conectar con el servidor.')
    });
  }
}
