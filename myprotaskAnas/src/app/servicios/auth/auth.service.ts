import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest } from './loginRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userId:any;
  isLoggedIn:boolean = false;
  constructor(private http:HttpClient) { }

  login(credentials: LoginRequest): any {
    this.userId = this.http.get(`http://localhost:8080/api/user/searchUserByEmailPassword?email=${credentials.email}&password=${credentials.password}`);
  
    if (this.userId != null) {
      this.isLoggedIn = true;
      console.log(this.userId);
      return this.userId;
    } else {
      console.log("nulo");
      return 0;
    }
  }
  
}
