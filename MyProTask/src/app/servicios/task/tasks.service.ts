import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private idUser:any = localStorage.getItem("idUser");
  constructor(private http:HttpClient) { }

  getActiveTaskByUserId(): Observable<any> {
    return this.http.get(`http://localhost:8080/api/task/displayActiveTasksByUserId?idUser=${this.idUser}`)
  }

  getTaskByUserId(): Observable<any> {
    return this.http.get(`http://localhost:8080/api/task/displayActiveTasksByUserId?idUser=${this.idUser}`)
  }
}
