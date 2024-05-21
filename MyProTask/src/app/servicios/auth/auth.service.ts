import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginRequest } from './loginRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;
  urlBase = "http://localhost:8080/api/user/"
  constructor(private http: HttpClient) { }

  login(credentials:LoginRequest):Observable<any> {
    return this.http.get(`${this.urlBase}searchUserByEmailPassword?email=${credentials.email}&password=${credentials.password}`)
      .pipe(
        map((user: any) => {
          if (user != null) {
            this.isLoggedIn = true;
          } else {
            console.log("Error de login");
          }
          return user;
        })
      );
  }
}
