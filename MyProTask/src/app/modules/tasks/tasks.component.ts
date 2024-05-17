import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  selectedTask: any; 

  selectTask(task: any) {
    this.selectedTask = task;
  }

  constructor() { }

  ngOnInit(): void {
    this.selectedTask = this.tasks[0];
  }

  tasks = [
    {
      title: "Submit Documents",
      description: "Submit required documents for something important. Review the list of documents required for submission.",
      imageRoute: "../../../assets/img/books.jpg",
      projectName: "dfgdf",
      priority: "High",
      status: "In process",
      FinishDate: "18/08/24"
    },
    {
      title: "TASK_2",
      description: "Submit required documents for something important. Review the list of documents required for submission.",
      imageRoute: "../../../assets/img/books.jpg",
      projectName: "JOFPOFI",
      priority: "Moderated",
      status: "In process",
      FinishDate: "28/05/24"
    },
    {
      title: "TASK_3",
      description: "Submit required documents for something important. Review the list of documents required for submission.",
      imageRoute: "../../../assets/img/books.jpg",
      projectName: "PJFDUHFAI",
      priority: "Low",
      status: "In process",
      FinishDate: "28/05/24"
    },{
      title: "Submit Documents2",
      description: "Submit required documents for something important. Review the list of documents required for submission.",
      imageRoute: "../../../assets/img/books.jpg",
      projectName: "dfgdf",
      priority: "High",
      status: "In process",
      FinishDate: "18/08/24"
    },
  
  ]
  

  getColorByPriority(priority: string): string {
    switch(priority) {
      case 'High':
        return 'red';
      case 'Moderated':
        return 'blue';
      case 'Low':
        return 'orange';
      default:
        return 'black';
    }
  }
  getColorByPriorityBorder(priority: string): string {
    switch(priority) {
      case 'High':
        return '#F88379';
      case 'Moderated':
        return '#7BAFD4';
      case 'Low':
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
  
  
}
