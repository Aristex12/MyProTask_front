import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './modules/header/header.component';
import { AsideComponent } from './modules/aside/aside.component';
import { LoginComponent } from './modules/login/login.component';
import { HomeComponent } from './modules/home/home.component';
import { ProjectsComponent } from './modules/projects/projects.component';
import { HttpClientModule } from '@angular/common/http';
import { CalendarComponent } from './modules/calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { EditprofileComponent } from './modules/editprofile/editprofile.component';
import { UsersComponent } from './modules/users/users.component';
import { TasksComponent } from './modules/tasks/tasks.component';
import { HistoryComponent } from './modules/history/history.component';
import { UserComponent } from './modules/user/user.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AsideComponent,
    LoginComponent,
    HomeComponent,
    ProjectsComponent,
    CalendarComponent,
    EditprofileComponent,
    UsersComponent,
    TasksComponent,
    HistoryComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,FullCalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
