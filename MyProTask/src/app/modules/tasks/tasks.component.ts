import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { TasksService } from 'src/app/servicios/task/tasks.service';
import { Tasks } from 'src/app/models/tasks';
import { ProjectService } from 'src/app/servicios/project/project.service';
import { Project } from 'src/app/models/project';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/servicios/Users/users.service';
import { UserView } from 'src/app/models/userView';



@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  selectedTask: any;
  selectedTaskId: any;
  tasksList: Tasks[] = [];
  projects: Project[] = [];
  Users: any[] = [];
  taskForm!: FormGroup;
  projectId: number | null = null;
  taskFormData: any = {}; // Cambio de nombre a taskFormData

  rol:string = "manager";
  
  selectTask(task: any) {
    this.selectedTask = task;
    
    this.selectedTaskId = task.idTask;
  }

  constructor(private tasksService: TasksService,private projectService: ProjectService,private fb: FormBuilder,private userService:UsersService) { }

  ngOnInit(): void {
    this.getData();
    this.getProjects();
    this.initForm();
    /*if (this.projectId !== null) {
      this.getUsers(this.projectId);
    }*/
  }
  initForm(): void {
    this.taskForm = this.fb.group({
      idProject: [''],
      taskName: ['', Validators.required],
      finishDate: ['', Validators.required],
      priority: ['', Validators.required],
      idUser: [''],
      taskDescription: ['', Validators.required]
    });
  }
//Dintinguish priority by color
  getColorByPriority(priority: string): string {
    switch (priority) {
      case 'HIGH':
        return 'red';
      case 'MID':
        return 'blue';
      case 'LOW':
        return 'orange';
      default:
        return 'black';
    }
  }
  getColorByPriorityBorder(priority: string): string {
    switch (priority) {
      case 'HIGH':
        return '#F88379';
      case 'MID':
        return '#7BAFD4';
      case 'LOW':
        return '#FFDB58';
      default:
        return 'black';
    }
  }
  //select priority
  selectedPriority: string = '.';
  filterTasksByPriority(priority: string) {
    this.selectedPriority = priority;
  }

  getData() {
    this.tasksService.getActiveTaskByUserId().subscribe({
      next: (tasks:any) => {
        this.tasksList = tasks;
        this.selectTask(this.tasksList[0]);
        console.log(this.tasksList)
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }
//GET PROJECTS NAME
getProjects() {
  this.projectService.getProjectsActiveByUserId().subscribe({
    next: (projects: Project[]) => {
      this.projects = projects;
    },
    error: (error: any) => {
      console.error(error);
    }
  });
}

//GET Users NAME
 getUsers(projectId:number) {
   if (projectId !== null) {
     this.userService.getActiveUserProject(projectId).subscribe({
       next: (users: UserView[]) => {
         this.Users = users;
         console.log(users)
         console.log(this.Users)
       },
      error: (error: any) => {
         console.error(error);
      }
     });
   }
}

getIdProject(){
  const selectProject: string | null = (document.getElementById("selectProjects") as HTMLSelectElement)?.value;
 
  const optionVal = parseInt(selectProject);
  console.log(optionVal)
  return optionVal
}

  //Insert TASK
  InsertTask(): void {
    if (this.taskForm.valid) {
      //const projectId = this.projects.find(project => project.name === this.taskForm.value.projectName)?.idProject;
      const task ={
        name:this.taskForm.value.taskName,
        description:this.taskForm.value.taskDescription,
        finishDate: this.taskForm.value.finishDate,
        priority: this.taskForm.value.priority,
        
      }
      const idProject=this.taskForm.value.idProject;
      const idUser=this.taskForm.value.idUser;
      console.log(idUser);
        this.tasksService.addTask(task, idProject, idUser).subscribe({
          next: (response: any) => {
            // Manejar la respuesta según sea necesario
          },
          error: (error: any) => {
            
          },
          complete:()=>{
            console.log('PEPE')
            this.getData();
          }
        });     
    } else {
      console.error("El formulario no es válido.");
    }
  }

  //EDIT TASK
  updateTask() {    
      if (this.taskForm.valid) {       
        const task ={
          name:this.taskForm.value.taskName,
          description:this.taskForm.value.taskDescription,
          finishDate: this.taskForm.value.finishDate,
          priority: this.taskForm.value.priority,
          
        }
        const idTask=this.selectedTaskId;
        console.log(idTask);
          this.tasksService.updateTask(task, idTask).subscribe({
            next: (response: any) => {
              // Manejar la respuesta según sea necesario
            },
            error: (error: any) => {
              
            },
            complete:()=>{
              console.log('Updated task!')
              this.getData();
            }
          });     
      } else {
        console.error("El formulario no es válido.");
      }

  }
  deleteTask() {
    const idTask=this.selectedTaskId;
      console.log(idTask);
      this.tasksService.deleteTask(idTask).subscribe({
        next: (response: any) => {
          // Manejar la respuesta según sea necesario
        },
        error: (error: any) => {
          console.log("NO SE BORRA")        
        },
        complete:()=>{
          console.log('Deleted task!')
          this.getData();
        }
      });     
  }
  

}