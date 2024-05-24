import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/servicios/Users/users.service';
import { Project } from 'src/app/models/project';
import { UserView } from 'src/app/models/userView';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
    users: any = [];
    projects: Project[] = [];
  userView: UserView[] = [];

  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.userService.getData().subscribe(
      (data: any[]) => {
        console.log('Datos recibidos del servidor:', data);


        if (data && data.length > 0) {
          data.forEach((item: any) => {
            const user = item;
            this.users.push(item);
            const project: Project = item.project;
            const existingProject = this.projects.find(p => p.idProject === project.idProject);
            if (existingProject) {
              console.log('El proyecto ya existe:', existingProject);
            } else {
              this.projects.push(project);
            }
            const users_view: UserView = {
              idUserProject: item.idUserProject,
              Project: project,
              User: user,
              // Declarar como opcional o asignar un valor válido
              joinDate: undefined,
              exitDate: undefined,
              role: undefined,
              active:true
            };

            this.userView.push(users_view);
          });
          console.log('Usuarios:', this.users);
          console.log('Proyectos:', this.projects);
          console.log('Vista de usuarios:', this.userView);
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
