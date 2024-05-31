import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private idUser: any;
  
  constructor(private http: HttpClient, private authService: AuthService) {
    this.idUser = this.authService.getUserId();
  }
  
  getRequestByIdUser(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(`http://localhost:8080/api/request/displayRequestsByProjectsIdUser?idUser=${this.idUser}`, { headers });
  }

  makeRequest(request:any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    const options = {
      headers: headers,
      responseType: 'text' as 'json'
    };
    return this.http.post(`http://localhost:8080/api/request/addRequest?idUser=${this.idUser}&idProject=${request.idProject}&message=${request.message}`, {}, options);
  }

  deleteRequest(idRequest:number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    const options = {
      headers: headers,
      responseType: 'text' as 'json'
    };
    return this.http.delete(`http://localhost:8080/api/request/deleteRequestById?idRequest=${idRequest}`, options);
  }
}
