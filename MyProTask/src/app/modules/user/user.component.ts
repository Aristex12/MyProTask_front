
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Characteristic } from 'src/app/models/characteristic';
import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';
import { UserView } from 'src/app/models/userView'; // Importa el modelo UserView
import { UsersService } from 'src/app/servicios/Users/users.service';
import { EvaluationService } from 'src/app/servicios/evaluation/evaluation.service';
import { ProjectService } from 'src/app/servicios/project/project.service';
 
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User | undefined;
  userView: UserView []=[];
  users: any = [];
  projects: Project[] = [];
  contador: number = 0;
  characteristic: Characteristic | undefined;
  categories: any[] = [];
  listUserCharacteristic: any[] = [];
  project: any;
  evaluations: any = [];
 
  constructor(
    private route: ActivatedRoute,
    private userService: UsersService,
    private projectService: ProjectService,  
    private evaluationService: EvaluationService
  ) {}
 
  ngOnInit() {
    this.route.params.subscribe(params => {
      const idUser = params['idUser'];
      this.loadUserData(idUser);
      this.loadUserHistory(idUser);
      this.loadUserEvaluations(idUser);
      this.getUserCharacteristicsByIdUser(idUser);
      this.getCategories();
    });
  }
 
  getCharacteristicById(idCharacteristic: number) {
    this.projectService.getCharacteristicById(idCharacteristic).subscribe(
      (data: any) => {
        this.characteristic = data;
      },
      error => {
        console.error('Error al cargar ', error);
      }
    );
  }
 
  getUserCharacteristicsByIdUser(idUser: number) {
    console.log("ENTRADA FUNCION getUserCharacteristicsByIdUser")
    this.userService.getCharacteristicsByIdUser(idUser).subscribe(
      (data: any[]) => {
        this.listUserCharacteristic = data;
        console.log('Characteristics:', data);
      },
      error => {
        console.error('Error loading characteristics for user:', error);
      }
    );
  }
 
  sumarContador() {
    this.contador++;
    console.log(this.contador);
  }
 
  reiniciarContador() {
    this.contador = 0;
  }
 
  getCategories() {
    this.userService.getCategories().subscribe(
      (data: any) => {
        this.categories = data;
        console.log("Categorias: ", this.categories);
      }
    );
  }
 
  getProject(idProject: number) {
    this.project = this.projectService.getProjectById(idProject);
  }
 
  loadUserEvaluations(idUser: number) {
    console.log("id del usuario: " + idUser);
    this.evaluationService.getUserEvaluation(idUser).subscribe(
      (data: any[]) => {
        console.log("datos del usuario: " + data);
        this.evaluations = data;
        console.log('Evaluaciones:', this.evaluations);
      },
      error => {
        console.error('Error al cargar las evaluaciones del usuario:', error);
      }
    );
  }
 
  loadUserData(idUser: number) {
    this.userService.getUserById(idUser).subscribe(
      (data: User) => {
        this.user = data;
      },
      error => {
        console.error('Error al cargar el usuario:', error);
      }
    );
  }
 
  loadUserHistory(idUser: number) {
    this.userService.getHistoryById(idUser).subscribe(
      (data: any[]) => { // Espera un objeto de tipo UserView
        if (data && data.length > 0) {
          data.forEach((item: any) => {
            const user = item;
            this.users.push(item);
            const project: Project = item.project;
            const existingProject = this.projects.find(p => p.idProject === project.idProject);
            if (existingProject) {
              console.log('El proyecto ya existe:', existingProject);
            } else {
              this.projects.push(project);
            }
            const users_view: UserView = {
              idUserProject: item.idUserProject,
              Project: project,
              User: user,
              joinDate: undefined,
              exitDate: undefined,
              role: undefined,
              active: true
            };
 
            this.userView.push(users_view);
          });
          console.log('Usuarios:', this.users);
          console.log('Proyectos:', this.projects);
          console.log('Vista de usuarios:', this.userView);
        } else {
          console.log('No se encontraron usuarios.');
        }
      },
      error => {
        console.error('Error al cargar el historial del usuario:', error);
      }
    );
  }
 
  getFilteredCharacteristics(categoryName: string): any[] {
    return this.listUserCharacteristic.filter(characteristic =>
      characteristic.characteristic.category.name === categoryName
    );
  }
}
 