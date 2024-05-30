import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Characteristic } from 'src/app/models/characteristic';
import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';
import { ProjectService } from 'src/app/servicios/project/project.service';
import { UsersService } from 'src/app/servicios/Users/users.service';

@Component({
  selector: 'app-project-users-pm',
  templateUrl: './project-users-pm.component.html',
  styleUrls: ['./project-users-pm.component.css'],
})
export class ProjectUsersPmComponent implements OnInit {
  project: any;
  userProjects: any = [];
  vacancy: any;
  activeMembers: any;
  
  terminoBusqueda: string = '';
  
  projects: Project[] = [];
  projectsBackup: Project[] = [];
  characteristics: Characteristic[] = [];
  selectedCharacteristicIds: number[] = [];
  expandedCategories: Set<number> = new Set<number>();

  categories = [
    { idCategory: 1, name: "Programming Language" },
    { idCategory: 2, name: "Technologies" },
    { idCategory: 3, name: "Languages" },
  ]
  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private userService: UsersService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const idProject = params['idProject'];
      this.loadProjectData(idProject);
      this.getUsersByIdProject(idProject);
      
      this.getData();
      this.getCharacteristics();
      

      this.projectService.getVacanciesCount(idProject).subscribe({
        next: (count) => {
          console.log(count);
          this.activeMembers = count;
        },
        error: (err) => {
          console.error('Error fetching vacancies count:', err);
        },
      });
    });

  }
  getData() {
    this.projectService.getData().subscribe((data: Project[]) => {
      this.projects = data;
      this.projectsBackup = [...data];
    });
  }
  loadProjectData(idProject: number) {
    this.projectService.getProjectById(idProject).subscribe(
      (data: Project) => {
        this.project = data;
        this.vacancy = data.vacancies;
        console.log(this.vacancy);
      },
      (error) => {
        console.error('Error', error);
      }
    );
  }

  getUsersByIdProject(idProject: number) {
   
    this.userService.getUsersByIdProject(idProject).subscribe({
      next: (user: any) => {
        this.userProjects = user;
        console.log(user)
        
        console.log( this.userProjects);
      },
      
    });
  }
  /**
   * !!! No hace el update 
   */
  updateActiveProjectById(idProject: number){
    this.projectService.updateActiveProjectById(idProject).subscribe({
      next: (response:any) => {
        console.log("response: " + response);
        this.router.navigate(['/home-pm']);
      },
      error: (err) => {
        
      },

    })
  }

  updateActiveUserById(idUser: number, idProject: number){
    console.log(idUser);
    this.userService.updateActiveUserById(idUser).subscribe({
      next: (response:any) => {
        console.log("response: " + response);
        this.router.navigate(['/home-pm', idProject]);
      },
      error: (err:any) => {

      },

    })
  }
  
  getUserBorderStyle(name: string): string {
    switch (name.toUpperCase()) {
      case 'MANAGER':
        return '2px solid #FF6D43';
      default:
        return 'none';
    }
  }

  openModal() {
    const modal = document.getElementById('modal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  openModal2(idUser: number) {
    const modal = document.getElementById(`modal2-${idUser}`);
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeModal2(idUser: number) {
    const modal = document.getElementById(`modal2-${idUser}`);
    if (modal) {
      modal.style.display = 'none';
    }
  }

  openModal3() {
    const modal = document.getElementById('modal3');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeModal3() {
    const modal = document.getElementById('modal3');
    if (modal) {
      modal.style.display = 'none';
    }
  }
  getCharacteristics() {
    this.projectService.getAllCharacteristics().subscribe((data: Characteristic[]) => {
      this.characteristics = data;
    });
  }

  getFilteredCharacteristics(catId: number): Characteristic[] {
    const filtered = this.characteristics.filter(c => c.category.idCategory === catId);
    if (this.isCategoryExpanded(catId)) {
      return filtered;
    }
    return filtered.slice(0, 3);
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

  isCategoryExpanded(categoryId: number): boolean {
    return this.expandedCategories.has(categoryId);
  }

  toggleCategoryExpansion(categoryId: number): void {
    if (this.expandedCategories.has(categoryId)) {
      this.expandedCategories.delete(categoryId);
    } else {
      this.expandedCategories.add(categoryId);
    }
  }

  @ViewChildren('checkbox') checkboxes: QueryList<ElementRef> = new QueryList<ElementRef>();

  deselectAllCheckboxes() {
    this.checkboxes.forEach((checkbox) => {
      checkbox.nativeElement.checked = false;
    });
    this.selectedCharacteristicIds = [];
    this.applySelectedCharacteristics();
  }
}