import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/servicios/Users/users.service';
import { Project } from 'src/app/models/project';
import { UserView } from 'src/app/models/userView';
import { AuthService } from 'src/app/servicios/auth/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './usersadmin.component.html',
  styleUrls: ['./usersadmin.component.css']
})
export class UserAdminComponent implements OnInit {
    users: any = [];
    projects: Project[] = [];
  userView: UserView[] = [];
role:any
allusers: User[]=[]
  constructor(private userService: UsersService, private authService:AuthService) { }

  ngOnInit() {
    this.getAllUsers()
    
    
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (data: any[]) => {
        console.log('Datos recibidos del servidor:', data);
        

        if (data && data.length > 0) {
          data.forEach((item: any) => {
            this.allusers.push(item);
         
          });
          console.log('Usuarios:', this.allusers); 
        } else {
          console.log('No se encontraron usuarios.');
        }


      },
      error => {
        console.error('Error al cargar usuarios:', error);
      }
    );
}

  

getUserBorderStyle(name: string): string {
  switch (name.toUpperCase()) {
    case 'MANAGER':
      return '2px solid #FF6D43'; 
    default:
      return 'none'; 
  }
}


}
