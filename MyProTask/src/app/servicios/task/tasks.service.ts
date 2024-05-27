import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private idUser:any;
  constructor(private http:HttpClient, private authService:AuthService) {
    this.idUser = this.authService.getUserId();
   }

  getActiveTaskByUserId(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(`http://localhost:8080/api/task/displayActiveTasksByIdUser?idUser=${this.idUser}`, {headers})
  }
  /**
   * 
   * FIXME:
   */
  getTaskByUserId(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(`http://localhost:8080/api/task/displayActiveTasksByIdUser?idUser=${this.idUser}`, { headers })
  }
}
