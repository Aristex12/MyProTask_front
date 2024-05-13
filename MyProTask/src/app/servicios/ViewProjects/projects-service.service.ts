import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectsServiceService {

  constructor(private http:HttpClient) { }

  private apiUrl = 'http://localhost:8080'; // URL de tu API backend
  getData() {
    return this.http.get<any>(`${this.apiUrl}/api/project/displayProjects`);
  }
}
