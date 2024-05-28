import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth/auth.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {
  name:string = "";
  email:string = ""
  profile_pic="../../assets/img/user.png"
  role:string = "";


  constructor(private authService: AuthService, private router:Router) {
    this.name = this.authService.getUserName();
    this.email = this.authService.getUserEmail();
    this.role = this.authService.getUserRole();
   }

  ngOnInit(): void {
    this.authService.getUserRole().subscribe({
      next: (role: any) => {
        this.role = role.name;
      },
      error: (error: any) => {
        console.error(error);
      }
    });
    console.log(this.role);
  }
   borrarSessionStorage() {
    localStorage.clear();
  }
  public closeSession(){
    this.authService.logout();
  }
}
