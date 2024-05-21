import { Component } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/servicios/project/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  terminoBusqueda: string = " ";
  projects: Project[] = [];
  projectsBackup: Project[] = [];

  filters:any = [
    {filter: "Python"},
    {filter: "Java"},
    {filter: "JavaScript"},
    {filter: "PHP"},
    {filter: "Laravel"},
    {filter: "C++"},
    {filter: "Html"},
    {filter: "Css"},

  ]
  constructor(private miservicio:ProjectService){
    
  }
  ngOnInit(): void {
    this.getData();
  }
  
  getData() {
    this.miservicio.getData().subscribe((data: Project[]) => {
      this.projects = data;
      this.projectsBackup = [...data];
    });
  }

  search(): void {
    const searchTerm = this.terminoBusqueda.trim().toLowerCase();

    if (!searchTerm) {
      this.projects = [...this.projectsBackup];
      return;
    }   
    this.projects = this.projectsBackup.filter(project =>
      project.name.toLowerCase().includes(searchTerm)
    );
  }
}