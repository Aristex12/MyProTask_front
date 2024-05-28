import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { LoginRequest } from 'src/app/servicios/auth/loginRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    // if(this.authService.isLoggedIn){
    //   this.router.navigateByUrl('/home');
    // } else {
    //   this.authService.isLoggedIn = false;
    // }
    this.authService.isLoggedIn = false;
  }

  login() {
    if (this.loginForm.valid) {
      const loginRequest: LoginRequest = this.loginForm.value as LoginRequest;
      this.authService.login(loginRequest).subscribe({
        next: (response: any) => {
          if (response && response.jwt) {
            
            
            this.router.navigateByUrl('/home');
          } else {
            console.log('Error de login');
          }
        },
        error: (error: any) => {
          console.error(error);
        },
        complete: () => {
          console.info('Inicio de sesión completado');
        }
      });
      this.loginForm.reset();
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
