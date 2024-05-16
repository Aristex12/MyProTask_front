import { Component } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/servicios/project/project.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  name:string = "Don Alejandro Cuesta";
  email:string = "sergio.ramos.external@eviden.com";
  profile_pic="../../assets/img/user.png"
  rol:string = "developer master";
  projects: Project[] = [];
  constructor(private miservicio:ProjectService){
    
  }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.miservicio.getData().subscribe((data: Project[]) => { // Define el tipo de datos como Project[]
      this.projects = data; // Asigna los datos al arreglo projects
    });
  }

}
