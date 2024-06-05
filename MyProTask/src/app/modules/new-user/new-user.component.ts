import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/servicios/Users/users.service';
import { AuthService } from 'src/app/servicios/auth/auth.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent {
  userForm!: FormGroup;
  role:string = "";
  
  constructor(private fb: FormBuilder,private userService:UsersService,private authService: AuthService) { }

  
  ngOnInit(): void {
    this.initForm();
    this.authService.getUserRole().subscribe({
      next: (role: any) => {
        this.role = role.name;
      },
      error: (error: any) => {
        console.error(error);
      }
    });  
  }
  initForm(): void {
    this.userForm = this.fb.group({
      userName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }
  AddUser() {
    if (this.userForm.valid) {
      const username=this.userForm.value.userName;
      const lastname=this.userForm.value.lastName;
      console.log(username);
      console.log(lastname); 
      this.userService.addUser(username,lastname).subscribe({
        next: (response: any) => {
          // Manejar la respuesta según sea necesario
        },
        error: (error: any) => {
          
        },
        complete:()=>{
          window.location.reload()
          console.log('USUARIO AÑADIDO!')         
        }
      });
    } else {  
      console.error('Formulario inválido. Por favor, completa todos los campos.');
    }

    }
}
