import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  name:string = "Don Alejandro Cuesta";
  email:string = "sergio.ramos.external@eviden.com";
  profile_pic="../../assets/img/user.png"
  rol:string = "developer master";
  projects = [
    {name:"BBVA Bank App", description:"Proyecto del Gestión de Proyectos para el curso de Ingeniería de Software.", startDate:"19/07/2024", finishDate:"22/05/2024", rol:"Proyect Manager"},
    {name:"Santander Bank App", description:"Proyecto del Gestión de Proyectos para el curso de Ingeniería de Software.", startDate:"22/05/2024", finishDate:"01/06/2024", rol:"Developer"},
    {name:"Eviden MyProTask", description:"Proyecto del Gestión de Proyectos para el curso de Ingeniería de Software.", startDate:"01/06/2024", finishDate:"02/08/2024", rol:"Developer"},
    {name:"Eviden MyProTask", description:"Proyecto del Gestión de Proyectos para el curso de Ingeniería de Software.", startDate:"01/06/2024", finishDate:"02/08/2024", rol:"Developer"},
    {name:"Eviden MyProTask", description:"Proyecto del Gestión de Proyectos para el curso de Ingeniería de Software.", startDate:"01/06/2024", finishDate:"02/08/2024", rol:"Developer"},
    {name:"Eviden MyProTask", description:"Proyecto del Gestión de Proyectos para el curso de Ingeniería de Software.", startDate:"01/06/2024", finishDate:"02/08/2024", rol:"Developer"},
    {name:"Eviden MyProTask", description:"Proyecto del Gestión de Proyectos para el curso de Ingeniería de Software.", startDate:"01/06/2024", finishDate:"02/08/2024", rol:"Developer"},
    {name:"Eviden MyProTask", description:"Proyecto del Gestión de Proyectos para el curso de Ingeniería de Software.", startDate:"01/06/2024", finishDate:"02/08/2024", rol:"Developer"},
    {name:"Eviden MyProTask", description:"Proyecto del Gestión de Proyectos para el curso de Ingeniería de Software.", startDate:"01/06/2024", finishDate:"02/08/2024", rol:"Developer"},
    {name:"Eviden MyProTask", description:"Proyecto del Gestión de Proyectos para el curso de Ingeniería de Software.", startDate:"01/06/2024", finishDate:"02/08/2024", rol:"Developer"},
    {name:"Atos Bussines Management", description:"Proyecto del Gestión de Proyectos para el curso de Ingeniería de Software.", startDate:"02/08/2024", finishDate:"30/07/2024", rol:"Proyect Manager"},
  ]
}
