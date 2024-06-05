//AUTHORS: Anas Rami
import { Component } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/servicios/project/project.service';
import { Characteristic } from 'src/app/models/characteristic';
import { QueryList, ViewChildren } from '@angular/core';
import { ElementRef } from '@angular/core';
@Component({
  selector: 'app-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.css'],
})
export class AllProjectsComponent {
  terminoBusqueda: string = '';
  projects: Project[] = [];
  projectsBackup: Project[] = [];
  characteristics: Characteristic[] = [];
  filters: { id: number; name: string }[] = [];
  selectedCharacteristicIds: number[] = [];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.getData();
    this.getCharacteristics();
    this.search();
  }

  getData() {
    this.projectService.getData().subscribe((data: Project[]) => {
      this.projects = data;
      console.log(this.projects);
      this.projectsBackup = [...data];
    });
  }

  getCharacteristics() {
    this.projectService
      .getAllCharacteristics()
      .subscribe((data: Characteristic[]) => {
        this.characteristics = data;
      });
  }

  search(): void {
    const searchTerm = this.terminoBusqueda.trim().toLowerCase();

    if (!searchTerm) {
      this.projects = [...this.projectsBackup];
      return;
    }

    this.projects = this.projectsBackup.filter((project) =>
      project.name.toLowerCase().includes(searchTerm)
    );
  }

  isDialogOpen = false;
  currentCharacteristics: any = [];

  openDialog(characteristics: any[]): void {
    this.currentCharacteristics = characteristics;
    this.isDialogOpen = true;
  }

  closeDialog(): void {
    this.isDialogOpen = false;
  }

  deleteProject(idProject: number) {
    this.projectService.updateActiveProjectById(idProject).subscribe({
      next: (response: any) => {
        console.log(response);
        this.getData();
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }
}
