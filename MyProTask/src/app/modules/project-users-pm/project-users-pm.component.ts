import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
        
        console.log( this.userProjects);
      },
      
    });
  }
  /**
   * !!! No hace el update 
   */
  updateActiveProjectById(idProject: number){
    this.projectService.updateActiveProjectById(idProject);
    this.router.navigate(['/home-pm']);
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

  openModal2() {
    const modal = document.getElementById('modal2');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeModal2() {
    const modal = document.getElementById('modal2');
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
}
