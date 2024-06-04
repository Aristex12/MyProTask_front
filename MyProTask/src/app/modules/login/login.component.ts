import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { LoginRequest } from 'src/app/servicios/auth/loginRequest';
import { jwtDecode } from 'jwt-decode';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  token: any;
  role: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    // if(this.authService.isLoggedIn){
    //   this.router.navigateByUrl('/home');
    // } else {
    //   this.authService.isLoggedIn = false;s
    // }
    this.authService.isLoggedIn = false;
  }
  getrole() {
    this.token = this.authService.getToken();
    this.token = jwtDecode(this.token);
    this.role = this.token.role;
  }
  login() {
    if (this.loginForm.valid) {
      const loginRequest: LoginRequest = this.loginForm.value as LoginRequest;
      this.authService.login(loginRequest).subscribe({
        next: (response: any) => {
          this.getrole();
          if (response && response.jwt) {
            if (this.role === 'admin') {
              this.router.navigateByUrl('/home-projects');
            } else if(this.authService.getUserRole() === 'employee') {
              this.router.navigateByUrl('/home');
            }else if(this.authService.getUserRole() === 'manager'){
              this.router.navigateByUrl('/home-pm');
            }
          } else {
            console.log('Error de login');
          }
        },
        error: (error: any) => {
          console.error(error);
        },
        complete: () => {
          console.info('Inicio de sesión completado');
        },
      });
      this.loginForm.reset();
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
