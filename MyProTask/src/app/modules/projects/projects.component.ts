import { Component } from '@angular/core';
import { Project } from 'src/app/projects.model';
import { ProjectsServiceService } from 'src/app/servicios/ViewProjects/projects-service.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  terminoBusqueda: string = '';
  projects: Project[] = [];
  projectsBackup: Project[] = []; // Copia de respaldo del arreglo original de proyectos

  constructor(private miservicio:ProjectsServiceService) { }
  
  ngOnInit(): void {
    this.getData();
  }
  
  getData() {
    this.miservicio.getData().subscribe((data: Project[]) => {
      this.projects = data;
      // Guardar una copia de respaldo del arreglo original
      this.projectsBackup = [...data];
    });
  }
  /** 
  *!INFO: intentar mantener una copia de respaldo del arreglo original de proyectos y simplemente restaurarla cuando sea necesario. 
  **/
  search(): void {
    const searchTerm = this.terminoBusqueda.trim().toLowerCase();

    if (!searchTerm) {
      this.projects = [...this.projectsBackup];
      return;
    }   
    // Filtrar los proyectos según el término de búsqueda
    this.projects = this.projectsBackup.filter(project =>
      project.name.toLowerCase().includes(searchTerm)
    );
  }
}
