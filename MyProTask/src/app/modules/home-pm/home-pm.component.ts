import { Component, ElementRef, ViewChild } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/servicios/project/project.service';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-home-pm',
  templateUrl: './home-pm.component.html',
  styleUrls: ['./home-pm.component.css'],
})
export class HomePmComponent {
  projects: Project[] = [];
  vacanciesList: any[] = [];
  activeMembers: any;
  @ViewChild('projectsContainer', { static: true })
  projectsContainer!: ElementRef;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.getProjectsByUserId().subscribe({
      next: (projects: any) => {
        this.projects = projects;
        console.log(projects);
        this.projects.forEach((element) => {
          this.projectService.getVacanciesCount(element.idProject).subscribe({
            next: (count) => {
              console.log(count)
              this.activeMembers = { idProject: element.idProject, vacancies: count };
              this.vacanciesList.push(this.activeMembers);
            },
            error: (err) => {
              console.error('Error fetching vacancies count:', err);
            },
          });
        });
        console.log(this.vacanciesList);
      },
      error: (error: any) => {
        console.error(error);
      },
    });
   
  }

  scrollLeft(): void {
    this.projectsContainer.nativeElement.scrollBy({
      left: -380,
      behavior: 'smooth',
    });
  }

  scrollRight(): void {
    this.projectsContainer.nativeElement.scrollBy({
      left: 380,
      behavior: 'smooth',
    });
  }
}
