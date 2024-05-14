import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { LoginRequest } from 'src/app/servicios/auth/loginRequest';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm=this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]], 
    password:['']
  })

  constructor(private formBuilder:FormBuilder, private router:Router, private authService:AuthService) {}

  ngOnInit(): void {
    this.authService.isLoggedIn = false;
  }

  login(){
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (user:any) => {
          if(user != null){
            this.router.navigateByUrl("/home")
            sessionStorage.setItem('userId', JSON.stringify(user));
          }else{
            console.log("Error de login")
          }
        },
        error: (error:any) =>{
          console.error(error);
        },
        complete: () => {
          console.info("Inicio de sesión completado")
        }
      });
      this.loginForm.reset();
    }else{
      this.loginForm.markAllAsTouched();
    }
  }
}
