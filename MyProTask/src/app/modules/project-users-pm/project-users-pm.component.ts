import { isNgTemplate } from '@angular/compiler';
import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Characteristic } from 'src/app/models/characteristic';
import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';
import { EvaluationService } from 'src/app/servicios/evaluation/evaluation.service';
import { ProjectService } from 'src/app/servicios/project/project.service';
import { UsersService } from 'src/app/servicios/Users/users.service';

@Component({
  selector: 'app-project-users-pm',
  templateUrl: './project-users-pm.component.html',
  styleUrls: ['./project-users-pm.component.css'],
})
export class ProjectUsersPmComponent implements OnInit {
  infoProject:any;
  project: any;
  userProjects: any[] = [];
  vacancy: any;
  activeMembers: any;
  addUserProjectsBackup: any[] = [];
  addUserProjects:any;
  idCharacteristicsProject: any[] = [];
  terminoBusqueda: string = '';

  projects: Project[] = [];
  projectsBackup: Project[] = [];
  characteristics: Characteristic[] = [];
  selectedCharacteristicIds: number[] = [];

  evaluationComment: string = '';

  user:User | undefined;

  expandedCategories: Set<number> = new Set<number>();

  categories = [
    { idCategory: 1, name: "Programming Language" },
    { idCategory: 2, name: "Technologies" },
    { idCategory: 3, name: "Languages" },
  ];
  idProject:any;
  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private userService: UsersService,
    private router: Router,
    private evaluationService:EvaluationService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
       this.idProject = params['idProject'];
      this.loadProjectData(  this.idProject);
      this.getUsersByIdProject(  this.idProject);
      this.getData();
      this.getCharacteristics();
      this.projectService.getVacanciesCount(  this.idProject).subscribe({
        next: (count) => {
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
      },
      (error:any) => {
        console.error('Error', error);
      }
    );
  }

  getUsersByIdProject(idProject: number) {
    this.userService.getUsersByIdProject(idProject).subscribe({
      next: (user: any) => {
        if (Array.isArray(user)) {
          this.userProjects = user;
        } else {
          console.error('Expected array but got', user);
        }
      },
      error: (err: any) => {
        console.error('Error fetching users by project:', err);
      },
    });
  }

  updateActiveProjectById(idProject: number) {
    this.projectService.updateActiveProjectById(idProject).subscribe({
      next: (response: any) => {
        this.router.navigate(['/home-pm']);
      },
      error: (error:any) => {
        console.error('Error updating project:', error);
      },
    });
  }

  updateActiveUserById(idUser: number, idProject: number) {
    this.evaluationService.getUserProjectId(idUser, idProject).subscribe({
      next: (response: any) => {
        console.log("Respuesta del servidor: " + response);

        this.userService.updateActiveUserProjectById(response).subscribe({
          next: (response: any) => {
            window.location.reload();
          },
          error: (err: any) => {
            console.error('Error updating user:', err);
          },
        });

      },
      error: (err: any) => {
        console.error('Error getting userProject id', err);
      }
    });
  }

  getUserBorderStyle(name: string): string {
    switch (name.toUpperCase()) {
      case 'MANAGER':
        return '2px solid #FF6D43';
      default:
        return 'none';
    }
  }

  getUsersByCharacteristics(characteristicsIds: number[], idProject: number) {
    this.userService.getUsersByCharacteristics(characteristicsIds, idProject).subscribe({
      next: (users: User[]) => {
        this.addUserProjects = users;
        this.addUserProjectsBackup=users;
        
      },
      error: (err: any) => {
        console.error('Error fetching users by characteristics:', err);
      },
    });
  }

  addMember(idUser: number, idProject: number){
    this.userService.addMember(idUser, idProject).subscribe({
      next: (response: any) => {

      },
      error: (err: any) => {
        console.error('Error :', err);

      },
      complete:()=>{
        console.log("User added")
        window.location.reload();
      }
    });
  }

  openModal() {
    const modal = document.getElementById('modal');
    if (modal) {
      modal.style.display = 'block';
      this.project.projectCharacteristics.forEach((characteristic: { idCharacteristic: any; }) => {
        this.idCharacteristicsProject.push(characteristic.idCharacteristic);
      });
      this.getUsersByCharacteristics(this.idCharacteristicsProject, this.project.idProject);
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
      modal.style.display = 'flex';
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

  openModal4(idUser: number) {
    const modal = document.getElementById(`modal4-${idUser}`);
    if (modal) {
      modal.style.display = 'flex';
    }
  }

  closeModal4(idUser: number) {
    const modal = document.getElementById(`modal4-${idUser}`);
    if (modal) {
      modal.style.display = 'none';
    }
  }

  getCharacteristics() {
    this.projectService.getProjectById(this.idProject).subscribe((data: any) => {
      this.infoProject=data
      this.characteristics = data.projectCharacteristics;
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
      this.addUserProjects = [...this.addUserProjectsBackup];
      return;
    }
    this.addUserProjects = this.addUserProjectsBackup.filter(project =>
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
      this.userService.getUserCharacteristics(this.selectedCharacteristicIds)
        .subscribe(
          (data: any) => {
            this.addUserProjects = data;
            console.log(data);
          },
          (error: any) => {
            if (error.status === 404) {
              this.addUserProjects = []; 
              console.error("No se encontraron usuarios")
            } else {
              // Maneja otros errores aquí si es necesario
            }
          }
        );
    } else {
      this.addUserProjects = [...this.addUserProjectsBackup];
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

  addEvaluationData(idUser:number, idProject:number){
    const individualWorkValue = this.getSelectedValue('individual_work');
    const initiativeValue = this.getSelectedValue('initiative');
    const problemResolutionValue = this.getSelectedValue('problem_resolution');
    const teamWorkValue = this.getSelectedValue('team_work');

    // Crea un objeto de evaluación con los datos del formulario
    const evaluationData: any = {
      teamWork: teamWorkValue,
      individualWork: individualWorkValue,
      initiative: initiativeValue,
      problemResolution: problemResolutionValue,
      observation: this.evaluationComment
    };

    this.evaluationService.getUserProjectId(idUser, idProject).subscribe({
      next: (response: any) => {
        console.log("Respuesta del servidor: " + response);

        this.evaluationService.addUserEvaluation(evaluationData, response).subscribe({
          next: (response: any) => {
            console.log('Evaluation added successfully:', response);
          },
          error: (err: any) => {
            console.error('Error adding evaluation:', err);
          }
        });

      },
      error: (err: any) => {
        console.error('Error getting userProject id', err);
      }
    });

  }

  getSelectedValue(name: string): string | null {
    const radios = document.getElementsByName(name);
    for (let i = 0; i < radios.length; i++) {
      const radio = radios[i] as HTMLInputElement;
      if (radio.checked) {
        return radio.value;
      }
    }
    return null;
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
