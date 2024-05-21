import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http:HttpClient) { }

  private apiUrl = 'http://localhost:8080'; // URL de tu API backend
  getData() {
    return this.http.get<any>(`${this.apiUrl}/api/project/displayProjects`);
  }
}
