import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})

export class ProjectService {

  private idUser = localStorage.getItem("idUser");

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get(`http://localhost:8080/api/project/displayProjects`);
  }

  getProjectsByUserId(): Observable<any> {
    return this.http.get(`http://localhost:8080/api/project/displayActiveProjectsByUserId?idUser=${this.idUser}`);
  }

  getAllCharacteristics(): Observable<any> {
    return this.http.get(`http://localhost:8080/api/characteristic/displayCharacteristics`);
  }

 /* getProjectsByCharacteristics(characteristicsIds: number[]): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.request('GET', 'http://localhost:8080/api/project/searchProjectsByCharacteristics', {
      body: characteristicsIds,
      headers: headers
    });
  }*/

  getProjectsByCharacteristics(characteristicsIds: number[]): Observable<any> {
    return this.http.post(`http://localhost:8080/api/project/searchProjectsByCharacteristics` ,characteristicsIds);
  }
}

