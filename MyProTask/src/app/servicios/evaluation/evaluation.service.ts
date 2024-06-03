import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  private idUser:any;
  constructor(private http:HttpClient, private authService:AuthService) {
    this.idUser = this.authService.getUserId();
  }


  private apiUrl = 'http://localhost:8080';

  addUserEvaluation(evaluationData: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    //No hay que pillar el idUser. Hay que pillar le idUserProject
    return this.http.post<any>(`${this.apiUrl}/api/evaluation/addEvaluation?idUserProject=${this.idUser}`, evaluationData , {headers});
  }



  getUserEvaluation(idUser: number){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<any>(`${this.apiUrl}/api/evaluation/displayEvaluationsByIdUser?idUser=${this.idUser}`, {headers});
  }

}
