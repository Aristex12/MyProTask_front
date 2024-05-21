import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../servicios/auth/auth.service';
 
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 
  constructor(private authService: AuthService, private router: Router) {}
 
  canActivate(): boolean {
    if (this.authService.isLoggedIn == true) {
      return true; // Permitir acceso si el usuario está autenticado
    } else {
      this.router.navigate(['']); // Redirigir al usuario al login si no está autenticado
      return false;
    }
  }
}