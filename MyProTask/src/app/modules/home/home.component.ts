import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/servicios/project/project.service';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  projects: Project[] = [];

  dailies = [
    { name: "Make Login", status: "in progress" },
    { name: "Change header color", status: "finished" },
    { name: "Add new button to aside", status: "in progress" },
    { name: "Delete * from users", status: "created" },
  ]

  tasks = [
    { name: "Make Login", project: "Alsa bus", end_date: 6 },
    { name: "Change header color", project: "Airbus plane", end_date: 3 },
    { name: "Add new button to aside", project: "BBVA Bank", end_date: 15 },
    { name: "Delete * from users", project: "MyProTask", end_date: 8 },
  ]

  constructor(private projectService: ProjectService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn) {
      // Redirigir a la página de login si no está autenticado
      this.router.navigate(['/login']);
      console.error('User is not authenticated');
      return;
    }

    this.projectService.getData().subscribe({
      next: (projects: any) => {
        this.projects = projects;
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }
}
