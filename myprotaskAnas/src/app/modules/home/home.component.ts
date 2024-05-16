import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  projects = [
    {name:"BBVA Bank App", description:"An app of BBVA", end_date:"19/07/2024", tasks:6},
    {name:"Santander Bank App", description:"An app of Santander", end_date:"22/05/2024", tasks:3},
    {name:"Eviden MyProTask", description:"An app of Grupo 2", end_date:"01/06/2024", tasks:15},
    {name:"Atos Bussines Management", description:"An app of Atos", end_date:"02/08/2024", tasks:8},
  ]

  dailies = [
    {name:"Make Login", status:"In progress"},
    {name:"Change header color", status:"Finished"},
    {name:"Add new button to aside", status:"In progress"},
    {name:"Delete * from users", status:"In progress"},
  ]

  tasks = [
    {name:"Make Login", end_date:6},
    {name:"Change header color", end_date:3},
    {name:"Add new button to aside", end_date:15},
    {name:"Delete * from users", end_date:8},
  ]

  constructor() { }

  ngOnInit(): void {

  }
}