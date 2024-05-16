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
    this.miservicio.getData().subscribe((data: Project[]) => { // Define el tipo de datos como Project[]
      this.projects = data; // Asigna los datos al arreglo projects
    });
  }
  
  search(): void {
    // Si no hay término de búsqueda, mostrar todos los proyectos
    if (!this.terminoBusqueda.trim()) {
      this.getData();
      return;
    }
    this.projects = this.projects.filter(project =>
      project.name.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
    );
  }
  
  
}
