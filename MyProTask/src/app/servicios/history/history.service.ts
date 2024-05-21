import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private idUser:any=localStorage.getItem('idUser');
  constructor(private http:HttpClient) { }
  //URL de tu API backend
  private apiUrl = 'http://localhost:8080';
  getData() {
    return this.http.get<any>(`${this.apiUrl}/api/userProject/displayUserProjectByUserId?idUser=${this.idUser}`);
  }
}