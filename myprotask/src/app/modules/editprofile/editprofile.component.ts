import { Component } from '@angular/core';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent {
  name:string = "Sergio Ramos";
  email:string = "sergio.ramos.external@eviden.com";
  profile_pic="../../assets/img/user.png"
  rol:string = "developer";
}
