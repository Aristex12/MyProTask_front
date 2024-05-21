import { Component } from '@angular/core';
import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';
import { History } from 'src/app/models/history';
import { HistoryService } from 'src/app/servicios/history/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  users: User[] = [];
  projects: Project[] = [];
  history: History[]=[];

  constructor(private miservicio:HistoryService){   
  }
  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.miservicio.getData().subscribe(
      (data: any[]) => {
        if (data && data.length > 0) {
          
          data.forEach((item: any) => {
            const user = item.user;
            this.users.push(user);
            const project = item.project;
            this.projects.push(project);
            // Crear un objeto History con user y project
            const history: History = {
              Project: project,
              User: user
            };
            this.history.push(history);
          });
        } else {
          console.log('No se encontraron usuarios.');
        }
      },
      error => {
        console.error('Error al cargar usuarios:', error);
      }
    );
  }
}

