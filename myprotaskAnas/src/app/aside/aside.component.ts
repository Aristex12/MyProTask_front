import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {
  name:string = "Sergio Ramos";
  email:string = "sergio.ramos.external@eviden.com";
  rol:string = "pm";
  constructor() { }

  ngOnInit(): void {
  }

}
