import { Component } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/servicios/project/project.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  projects:Project[] = [];

  dailies = [
    {name:"Make Login", status:"in progress"},
    {name:"Change header color", status:"finished"},
    {name:"Add new button to aside", status:"in progress"},
    {name:"Delete * from users", status:"created"},
  ]

  tasks = [
    {name:"Make Login",project: "Alsa bus", end_date:6},
    {name:"Change header color",project: "Airbus plane", end_date:3},
    {name:"Add new button to aside",project: "BBVA Bank", end_date:15},
    {name:"Delete * from users",project: "MyProTask", end_date:8},
  ]

  constructor(private projectService:ProjectService) { }

  ngOnInit(): void {
    this.projectService.getData().subscribe({
      next: (projects:any) => {
        this.projects = projects;
      },
      error: (error:any) =>{
        console.error(error);
      }
    });

  }
}