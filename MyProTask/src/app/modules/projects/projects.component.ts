import { Component } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/servicios/project/project.service';
import { Characteristic } from 'src/app/models/characteristic';
import {QueryList, ViewChildren } from '@angular/core';
import { ElementRef } from '@angular/core';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent  {
  terminoBusqueda: string = "";
  projects: Project[] = [];
  projectsBackup: Project[] = [];
  characteristics: Characteristic[] = [];
  filters: { id: number, name: string }[] = [];
  selectedCharacteristicIds: number[] = [];

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.getData();
    this.getCharacteristics();
  }

  getData() {
    this.projectService.getData().subscribe((data: Project[]) => {
      this.projects = data;
      this.projectsBackup = [...data];
    });
  }

  getCharacteristics() {
    this.projectService.getAllCharacteristics().subscribe((data: Characteristic[]) => {
      this.characteristics = data;
      this.createFilters();
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

  createFilters() {
    this.filters = this.characteristics.map(characteristic => ({
      id: characteristic.idCharacteristic,
      name: characteristic.name
    }));
  }

  onChangeCharacteristic(characteristicId: number, event: any) {
    if (event.target.checked) {
      this.selectedCharacteristicIds.push(characteristicId);
    } else {
      const index = this.selectedCharacteristicIds.indexOf(characteristicId);
      if (index !== -1) {
        this.selectedCharacteristicIds.splice(index, 1);
      }
    }
  }

  applySelectedCharacteristics() {
    if (this.selectedCharacteristicIds.length > 0) {
      this.projectService.getProjectsByCharacteristics(this.selectedCharacteristicIds)
        .subscribe((data: Project[]) => {
          this.projects = data;
        });
    } else {
      this.projects = [...this.projectsBackup];
    }
  }

  @ViewChildren('checkbox') checkboxes: QueryList<ElementRef> = new QueryList<ElementRef>();

  deselectAllCheckboxes() {
    this.checkboxes.forEach((checkbox) => {
      checkbox.nativeElement.checked = false;
    });
  }
}
