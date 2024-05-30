import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth/auth.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent {
  selectedCV: File | null = null;
  selectedProfilePicture: File | null = null;

  name:string = "";
  email:string = ""
  profile_pic="../../assets/img/user.png"
  role:string = "";


  constructor(private authService: AuthService, private router:Router) {
    this.name = this.authService.getUserName();
    this.email = this.authService.getUserEmail();
    this.role = this.authService.getUserRole();
   }

  onFileSelected(event: Event, type: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (type === 'cv') {
        this.selectedCV = file;
      } else if (type === 'profilePicture') {
        this.selectedProfilePicture = file;
        this.previewProfilePicture(file);
      }
    }
  }

  previewProfilePicture(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.profile_pic = e.target.result;
      // Guarda la imagen en LocalStorage para mantener la persistencia de la imagen en caso de recargar la página
      localStorage.setItem('profile_pic', e.target.result);
    };
    reader.readAsDataURL(file);
  }

  ngOnInit(): void {
    // Al inicializar el componente, cargar la imagen de perfil desde LocalStorage si existe
    const savedProfilePic = localStorage.getItem('profile_pic');
    if (savedProfilePic) {
      this.profile_pic = savedProfilePic;
    }
  }

  onSubmit(): void {
    if (this.selectedCV) {
      console.log('Selected CV:', this.selectedCV.name);
    }
    if (this.selectedProfilePicture) {
      console.log('Selected Profile Picture:', this.selectedProfilePicture.name);
    }
    // Aquí puedes añadir la lógica para procesar los archivos seleccionados
  }
}
