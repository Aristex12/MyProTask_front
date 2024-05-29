import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginRequest } from './loginRequest';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;
  urlBase = "http://localhost:8080/auth/login";
  private tokenKey = 'token';
  public userData: any;

  constructor(private http: HttpClient) {
    this.loadToken();
  }

  login(credentials: LoginRequest): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(this.urlBase, credentials, { headers })
      .pipe(
        map((response: any) => {
          if (response && response.jwt) {
            this.saveToken(response.jwt);
            this.isLoggedIn = true;
          } else {
            console.log("Error de login");
          }
          return response;
        })
      );
  }

  private saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.decodeToken(token);
  }

  private loadToken(): void {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      this.isLoggedIn = true;
      this.decodeToken(token);
    }
  }

  decodeToken(token: string): void {
    try {
      this.userData = jwtDecode(token);
      console.log(this.userData);
    } catch (error) {
      console.error('Error decoding token', error);
    }
  }

  getUserId(): number | null {
    return this.userData?.userId || null;
  }

  getUserData(): any {
    return this.userData;
  }
  getUserEmail(): any {
    return this.userData.sub;
  }
  getUserName(): any {
    return `${this.userData.firstName} ${this.userData.lastName}`;
  }
  getUserRole(): any {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(`http://localhost:8080/api/role/displayRoleUserProjectByIdUser?idUser=${this.userData.userId}`, { headers })
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    console.log('Removing token from localStorage...');
    localStorage.removeItem(this.tokenKey);
    sessionStorage.clear();
    this.isLoggedIn = false;
    this.userData = null;
    console.log('Token removed. Current token:', localStorage.getItem(this.tokenKey));
  }
}
