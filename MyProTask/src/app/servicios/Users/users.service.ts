import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { Characteristic } from 'src/app/models/characteristic';
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
  
  getCharacteristicsByIdUser(idUser:number) : Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(`http://localhost:8080/api/userCharacteristic/displayUserCharacteristicsByIdUser?idUser=${idUser}`, { headers })
  }
  
  getCategories() : Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(`http://localhost:8080/api/category/displayCategories `, { headers })
  }

  getUserCharacteristics(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<Characteristic[]>(`${this.apiUrl}/api/characteristic/displayCharacteristicsByIdUser?idUser=${this.idUser}`, { headers });
  }
  getUserCharacteristic(characteristicsIds: number[]): Observable<User[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    const options = {
      headers: headers
  };
    return this.http.post<User[]>(`http://localhost:8080/api/user/searchUsersByCharacteristics`, characteristicsIds, options);


  }
addUser(username: string, lastname: string){
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });
  const options = {
    headers: headers,
    responseType: 'text' as 'json'
};
  // Aquí hacemos la solicitud POST para añadir una tarea
  return this.http.post(`http://localhost:8080/api/user/addUser?name=${username}&lastName=${lastname}`, {}, options);
}
addUserCharacteristics(idcharacteristic: number,exp: number){
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });
  const options = {
    headers: headers,
    responseType: 'text' as 'json'
  };
  return this.http.post<Characteristic[]>(`${this.apiUrl}/api/userCharacteristic/addUserCharacteristicByIdUser?idUser=${this.idUser}&idCharacteristic=${idcharacteristic}&experience=${exp}`,{}, options);
}

updateCV(cv: any) {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });
  const options = {
    headers: headers,
    responseType: 'text' as 'json'
  };
  return this.http.put(`${this.apiUrl}/api/user/updateCvProfilePicDescriptionUserById?idUser=${this.idUser}&cv=${cv}`, {}, options);
}

updateProfilePic(pfp: any) {
   const headers = new HttpHeaders({
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});
const options = {
  headers: headers,
  responseType: 'text' as 'json'
};
return this.http.put(`${this.apiUrl}/api/user/updateCvProfilePicDescriptionUserById?idUser=${this.idUser}&profilePic=${pfp}`, {}, options);
}
  
updateDescription(desc: any) {
  const headers = new HttpHeaders({
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});
const options = {
  headers: headers,
  responseType: 'text' as 'json'
};
return this.http.put(`${this.apiUrl}/api/user/updateCvProfilePicDescriptionUserById?idUser=${this.idUser}&description=${desc}`, {}, options);
}

}
