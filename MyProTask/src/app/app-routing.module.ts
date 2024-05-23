import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { HomeComponent } from './modules/home/home.component';
import { ProjectsComponent } from './modules/projects/projects.component';
import { AuthGuard } from './guard/auth-guard';
import { EditprofileComponent } from './modules/editprofile/editprofile.component';
import { CalendarComponent } from './modules/calendar/calendar.component';
import { UsersComponent } from './modules/users/users.component';
import { TasksComponent } from './modules/tasks/tasks.component';
import { HistoryComponent } from './modules/history/history.component';



const routes: Routes = [
  {path:"", component:LoginComponent},
  {path:"home", component:HomeComponent},
  {path:"projects", component:ProjectsComponent},
  {path:"edituser", component:EditprofileComponent},
  {path:"calendar", component:CalendarComponent},
  {path:"users", component:UsersComponent},
  {path:"tasks", component:TasksComponent},
  {path:"history", component:HistoryComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
