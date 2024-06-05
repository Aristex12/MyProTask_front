//AUTHORS: Sergio Ramos , Anas Rami, Kevin Reyes, Hugo Crespo
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { UsersService } from 'src/app/servicios/Users/users.service';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {
  name:string = "";
  email:string = ""
  profile_pic="../../assets/img/user.png"
  role:any;
  user:any;
   iduser :any;

  constructor(private authService: AuthService, private router:Router,private storage:AngularFireStorage,private userservice:UsersService) {
    this.name = this.authService.getUserName();
    this.email = this.authService.getUserEmail();
    this.role = this.authService.getUserRole();
   }

  ngOnInit(): void {
    this.iduser = localStorage.getItem("idUser")
    this.authService.getUserRole().subscribe({
      next: (role: any) => {
        this.role = role.name;
      },
      error: (error: any) => {
        console.error(error);
      }
    });
    console.log(this.role);
    this.getUser()
  }
   borrarSessionStorage() {
    localStorage.clear();
  }
  public closeSession(){
    this.authService.logout();
  }
  getUser(){
   
    this.userservice.getUserById(this.iduser).subscribe(
      (data: User) => {
        this.user = data;
        console.log(this.profile_pic);
        const gsUrl = 'gs://myprotask.appspot.com/user-profiles/'+ this.iduser +'/pfp.png';
        console.log(gsUrl)
       
        this.storage.refFromURL(gsUrl).getDownloadURL().subscribe(url => {
          console.log(url)
          this.profile_pic = url;
        });
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }
}
