import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TasksService } from 'src/app/servicios/task/tasks.service';
import { Tasks } from 'src/app/models/tasks';



@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  selectedTask: any;
  tasksList: Tasks[] = [];
  rol:string = "developer";
  
  selectTask(task: any) {
    this.selectedTask = task;

  }

  constructor(private tasksService: TasksService) { }

  ngOnInit(): void {
    this.getData();

  }



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
      next: (tasks) => {
        this.tasksList = tasks;
        this.selectTask(this.tasksList[0]);
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

}
