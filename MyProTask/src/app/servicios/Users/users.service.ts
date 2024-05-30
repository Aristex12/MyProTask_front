import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private idUser:any;
  constructor(private http:HttpClient, private authService:AuthService) { 
    this.idUser = this.authService.getUserId();
  }


  private apiUrl = 'http://localhost:8080';
  getData() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<any>(`${this.apiUrl}/api/userProject/displayUserProjectByActiveProjectByIdUser?idUser=${this.idUser}`, {headers});
  }

  getUserById(idUser: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<any>(`${this.apiUrl}/api/user/displayUserById?idUser=${idUser}`, {headers});
  }

  /**
   * *Arreglado
   */
  getHistoryById(idUser: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<any>(`${this.apiUrl}/api/userProject/displayUserProjectByIdUser?idUser=${idUser}`, { headers });
  }

  getUsersByIdProject(idProject: number){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<any>(`${this.apiUrl}/api/userProject/displayActiveUserProjectByIdProject?idProject=${idProject}`, { headers });
  }

  updateActiveUserById(idUser: number): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    const options = {
      headers: headers,
      responseType: 'text' as 'json'
  };
    return this.http.put(`http://localhost:8080/api/user/updateActiveUser?idUser=${idUser}`, {}, options);

  }

  
}

