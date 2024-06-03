import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private idUser:any;
  constructor(private http:HttpClient, private authService:AuthService) {
    this.idUser = this.authService.getUserId();
  }


  private apiUrl = 'http://localhost:8080';

  getData() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<any>(`${this.apiUrl}/api/userProject/displayUserProjectByActiveProjectByIdUser?idUser=${this.idUser}`, {headers});
  }

  getUserById(idUser: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<any>(`${this.apiUrl}/api/user/displayUserById?idUser=${idUser}`, {headers});
  }

  /**
   * !Arreglado
   */
  getHistoryById(idUser: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<any>(`${this.apiUrl}/api/userProject/displayUserProjectByIdUser?idUser=${idUser}`, { headers });
  }

  getActiveUserProject(idProject: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<any>(`${this.apiUrl}/api/userProject/displayActiveUserProjectByIdProject?idProject=${idProject}`, { headers });
  }
  getUsersByIdProject(idProject: number){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<any>(`${this.apiUrl}/api/userProject/displayActiveUserProjectByIdProject?idProject=${idProject}`, { headers });
  }

  getUsersByCharacteristics(characteristicsIds: number[], idProject: number): Observable<User[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    const options = {
      headers: headers
  };
    return this.http.post<User[]>(`http://localhost:8080/api/user/displayUsersByCharacteristics?idProject=${idProject}`, characteristicsIds, options);


  }

  addMember(idUser: number, idProject: number){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    const options = {
      headers: headers,
      responseType: 'text' as 'json'
  };
    return this.http.post(`http://localhost:8080/api/userProject/addMember?idUser=${idUser}&idProject=${idProject}`, {}, options);
  }


  updateActiveUserProjectById(idUserProject: number): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    const options = {
      headers: headers,
      responseType: 'text' as 'json'
  };
    return this.http.put(`http://localhost:8080/api/userProject/updateActiveUserProjectById?idUserProject=${idUserProject}`, {}, options);

  }

}
