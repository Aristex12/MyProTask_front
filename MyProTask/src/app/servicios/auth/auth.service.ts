import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginRequest } from './loginRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;
  urlBase = "http://localhost:8080/auth/login"; // Asegúrate de que la ruta es "/auth/login"

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(this.urlBase, credentials, { headers })
      .pipe(
        map((response: any) => {
          if (response && response.jwt) {
            localStorage.setItem('loginToken', response.jwt);
            this.isLoggedIn = true;
          } else {
            console.log("Error de login");
          }
          return response;
        })
      );
  }
}
