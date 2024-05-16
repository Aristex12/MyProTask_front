import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { HomeComponent } from './modules/home/home.component';
import { ProjectsComponent } from './modules/projects/projects.component';
import { AuthGuard } from './guard/auth-guard';
import { EditprofileComponent } from './modules/editprofile/editprofile.component';
import { CalendarComponent } from './modules/calendar/calendar.component';
import { UsersComponent } from './modules/users/users.component';



const routes: Routes = [
  {path:"", component:LoginComponent},
  {path:"home", component:HomeComponent, canActivate:[AuthGuard]},
  {path:"projects", component:ProjectsComponent,canActivate:[AuthGuard]},
  {path:"edituser", component:EditprofileComponent, canActivate:[AuthGuard]},
  {path:"calendar", component:CalendarComponent, canActivate:[AuthGuard]},
  {path:"users", component:UsersComponent,canActivate:[AuthGuard]} 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
