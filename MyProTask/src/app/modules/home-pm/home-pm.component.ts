import { Component } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/servicios/project/project.service';

@Component({
  selector: 'app-home-pm',
  templateUrl: './home-pm.component.html',
  styleUrls: ['./home-pm.component.css']
})
export class HomePmComponent {

  activeMembers: number = 0;

  projects: Project[] = [];

  constructor(private projectService: ProjectService){}

  ngOnInit(): void {
    this.projectService.getProjectsByUserId().subscribe({
      next: (projects:any) => {
        this.projects = projects;
      },
      error: (error:any) => {
        console.error(error);
      }
    });
  }
}
