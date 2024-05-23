import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth/auth.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {
  name:string = "Sergio Ramos";
  email:string = "sergio.ramos.external@eviden.com";
  profile_pic="../../assets/img/user.png"
  rol:string = "developer";


  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit(): void {

  }
   borrarSessionStorage() {

    sessionStorage.clear();

  }

  public closeSession(){
    this.authService.logout();
    this.router.navigate(['']);
  }
}
