import { NgModule } from '@angular/core';
import { LoginComponent } from './modules/login/login.component';
import { HomeComponent } from './modules/home/home.component';
import { ProjectsComponent } from './modules/projects/projects.component';
import { AuthGuard } from './guard/auth-guard';
import { EditprofileComponent } from './modules/editprofile/editprofile.component';
import { CalendarComponent } from './modules/calendar/calendar.component';
import { UsersComponent } from './modules/users/users.component';
import { TasksComponent } from './modules/tasks/tasks.component';
import { HistoryComponent } from './modules/history/history.component';
import { UserComponent } from './modules/user/user.component';
import { NewUserComponent } from './modules/new-user/new-user.component';
import { RouterModule, Routes } from '@angular/router';
import { HomePmComponent } from './modules/home-pm/home-pm.component';
import { ProjectUsersPmComponent } from './modules/project-users-pm/project-users-pm.component';




const routes: Routes = [
  {path:"", component:LoginComponent, },
  {path:"home", component:HomeComponent, canActivate:[AuthGuard]},
  {path:"home-pm", component:HomePmComponent, canActivate:[AuthGuard]},
  {path:"projects", component:ProjectsComponent, canActivate:[AuthGuard]},
  {path:"edituser", component:EditprofileComponent, canActivate:[AuthGuard]},
  {path:"calendar", component:CalendarComponent, canActivate:[AuthGuard]},
  {path:"users", component:UsersComponent, canActivate:[AuthGuard]},
  {path:"tasks", component:TasksComponent, canActivate:[AuthGuard]},
  {path:"history", component:HistoryComponent, canActivate:[AuthGuard]},
  {path:"user/:idUser", component:UserComponent, canActivate:[AuthGuard]},
  {path:"newUser", component:NewUserComponent, canActivate:[AuthGuard]},
  {path:"home-pm/:idProject", component:ProjectUsersPmComponent, canActivate:[AuthGuard]}

];
// user/:userId
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
