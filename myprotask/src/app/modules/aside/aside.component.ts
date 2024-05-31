import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { jwtDecode } from 'jwt-decode';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { UsersService } from 'src/app/servicios/Users/users.service';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css'],
})
export class AsideComponent implements OnInit {
  token:any
  userinfo:any
  name: string =''
  email: string =''
  profile_pic = '';
  role: string | null = null;
user:any
userpfp:string=''
  constructor(private authService: AuthService, private router: Router,private storage: AngularFireStorage,private userservice:UsersService) {}

  ngOnInit(): void {
    this.getUserInfo()
    console.log(this.userinfo.userId)
    this.getUser()
    this.setUser()
    
  }

  getUserInfo(){
    this.token = this.authService.getToken();
    this.userinfo=jwtDecode(this.token);
  }
  setUser() {
    this.name = this.userinfo.firstName + this.userinfo.lastName;
    this.email = this.userinfo.sub;
    this.role = this.userinfo.role;

   
  }
getUser(){
  this.userservice.getUserById(this.userinfo.userId).subscribe(
    (data: User) => {
      this.user = data;
      this.userpfp=this.user.profilePic
      console.log(this.userpfp);
      const gsUrl = 'gs://myprotask.appspot.com/user-profiles/'+ this.userinfo.userId +'/pfp.png';
      this.storage.refFromURL(gsUrl).getDownloadURL().subscribe(url => {
        this.profile_pic = url;
      });
    },
    (error) => {
      console.error('Error fetching user data:', error);
    }
  );
}
  borrarSessionStorage() {
    localStorage.clear();
  }
  public closeSession() {
    this.authService.logout();
  }
}
