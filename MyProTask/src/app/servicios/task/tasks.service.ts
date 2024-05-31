import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private role:string = "";
  private idUser:any;
  constructor(private http:HttpClient, private authService:AuthService) {
    this.idUser = this.authService.getUserId();

   }

  getActiveTaskByUserId(): Observable<any> {
    this.authService.getUserRole().subscribe({
      next: (role: any) => {
        this.role = role.name;

      },
      error: (error: any) => {
        console.error(error);
      }
    });
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    if(this.role=='manager'){
    return this.http.get(`http://localhost:8080/api/task/displayTasksByProjectsByIdUser?idUser=${this.idUser}`, {headers})
    }else if(this.authService.getUserRole()=='employee'){
      return this.http.get(`http://localhost:8080/api/task/displayActiveTasksByIdUser?idUser=${this.idUser}`, {headers})
    }
    else{
      return this.http.get(`http://localhost:8080/api/task/displayTasksByProjectsByIdUser?idUser=${this.idUser}`, {headers})
    }
  }

  getTaskByUserId(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(`http://localhost:8080/api/task/displayActiveTasksByIdUser?idUser=${this.idUser}`, { headers })
  }

  addTask(task: any, idProject: number, idUser: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    // Aquí hacemos la solicitud POST para añadir una tarea
    return this.http.post(`http://localhost:8080/api/task/addTask?idProject=${idProject}&idUser=${idUser}`, task, { headers, responseType:'text' });
  }

  updateTask(task: any, idTask: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    const options = {
      headers: headers,
      responseType: 'text' as 'json'
  };
    return this.http.put(`http://localhost:8080/api/task/updateTaskById?idTask=${idTask}`, task, options);
  }

  deleteTask(idTask: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    const options = {
      headers: headers,
      responseType: 'text' as 'json'
  };
    return this.http.put(`http://localhost:8080/api/task/updateActiveTask?idTask=${idTask}`, {},options)
  }
  


}