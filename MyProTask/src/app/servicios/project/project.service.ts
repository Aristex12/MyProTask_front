import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private idUser = localStorage.getItem("idUser");
  constructor(private http:HttpClient) { }

  getData():Observable<any> {
    return this.http.get(`http://localhost:8080/api/project/displayProjects`)
  }

  getProjectsByUserId():Observable<any> {
    return this.http.get(`http://localhost:8080/api/project/displayActiveProjectsByUserId?idUser=${this.idUser}`)
  }
}
