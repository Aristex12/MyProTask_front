import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { Event } from '@angular/router';
import { Events } from 'src/app/models/events';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private idUser:any;
  
  constructor(private http:HttpClient, private authService:AuthService) {
    this.idUser = this.authService.getUserId();
   }

   getEventsByUserId(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(`http://localhost:8080/api/event/displayEventsByIdUser?idUser=${this.idUser}`, { headers });
  }

  addEvents(event: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post(`http://localhost:8080/api/event/addEvent?idUser=${this.idUser}`, event, { headers, responseType: 'text' });
  }

  
  deleteEvent(idEvent: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.delete(`http://localhost:8080/api/event/deleteEvent?idEvent=${idEvent}`, { headers, responseType: 'text' });
  }

  updateEvent(idEvent: number, event: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    const options = {
      headers: headers,
      responseType: 'text' as 'json'
    };
    return this.http.put(`http://localhost:8080/api/event/updateEvent?idEvent=${idEvent}`, event, options);
  }
  
}
