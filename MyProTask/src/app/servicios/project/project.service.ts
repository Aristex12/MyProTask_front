import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Project } from 'src/app/models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private idUser:any;

  constructor(private http:HttpClient, private authService:AuthService) {
    this.idUser = this.authService.getUserId();
   }

  getData():Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(`http://localhost:8080/api/project/displayProjects`, { headers })
  }

  getProjectsByUserId(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(`http://localhost:8080/api/project/displayProjectsByActiveUserProjectsByIdUser?idUser=${this.idUser}`, { headers });
  }

  getProjectsActiveByUserId(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(`http://localhost:8080/api/project/displayActiveProjectsByIdUser?idUser=${this.idUser}`, { headers });
  }

  getProjectsByCharacteristics(characteristicsIds: number[]): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post(`http://localhost:8080/api/project/searchProjectsByCharacteristics` ,characteristicsIds, { headers });
  }
  getAllCharacteristics(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(`http://localhost:8080/api/characteristic/displayCharacteristics`, { headers });
  }

  getVacanciesCount(idProject:number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(`http://localhost:8080/api/userProject/countActiveUserProjectByIdProject?idProject=${idProject}`, { headers });
  }

  updateActiveProjectById(idProject: number): Observable<any> {
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    const options = {
        headers: headers,
        responseType: 'text' as 'json'
    };
    return this.http.put(`http://localhost:8080/api/project/updateActiveProjectById?idProject=${idProject}`, {}, options);
  }
    getProjectById(idProject: number): Observable<Project> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      });
      return this.http.get<Project>(`http://localhost:8080/api/project/displayProjectById?idProject=${idProject}`, { headers });
    }

    getCharacteristicsByIdUser(idUser:number){
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      });
      return this.http.get(`http://localhost:8080/api/characteristic/dispalyCharacteristicsByIdUser?idUser=${idUser}`, { headers })
    }

}
