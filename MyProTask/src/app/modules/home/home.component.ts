import { Component } from '@angular/core';
import { Project } from 'src/app/models/project';
import { Tasks } from 'src/app/models/tasks';
import { ProjectService } from 'src/app/servicios/project/project.service';
import { TasksService } from 'src/app/servicios/task/tasks.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  projects: Project[] = [];
  tasksList: Tasks[] = [];
   cont:number=0
   reload:number=1

  constructor(private projectService: ProjectService, private tasksService: TasksService) { }

  ngOnInit(): void {
    this.projectService.getProjectsByUserId().subscribe({
      next: (projects: any) => {
        this.projects = projects;
      },
      error: (error: any) => {
        console.error(error);
      }
    });
    this.getUserTasks();
    
    
  }


  getUserTasks() {
    this.tasksService.getTaskByUserId().subscribe({
      next: (tasks) => {
        this.tasksList = tasks;
      },
      error: (error: any) => {
        console.error(error);
      }
    });
    
  }
}
