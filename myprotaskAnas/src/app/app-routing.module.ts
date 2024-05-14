import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { HomeComponent } from './modules/home/home.component';
import { ProjectsComponent } from './modules/projects/projects.component';
import { AuthGuard } from './guard/auth-guard';
import { EditprofileComponent } from './modules/editprofile/editprofile.component';



const routes: Routes = [
  {path:"", component:LoginComponent},
  {path:"home", component:HomeComponent, /*canActivate:[AuthGuard]*/},
  {path:"projects", component:ProjectsComponent,/*canActivate:[AuthGuard]*/},
  {path:"edituser", component:EditprofileComponent, /*canActivate:[AuthGuard]*/}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
