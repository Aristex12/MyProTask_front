import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Tasks } from 'src/app/models/tasks';
import { TasksService } from 'src/app/servicios/task/tasks.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    weekends: true,
    events: [] // Inicialmente vacío, se llenará con las tareas
  };

  constructor(private taskService: TasksService) { }

  ngOnInit(): void {
    this.taskService.getActiveTaskByUserId().subscribe({
      next: (tasks: Tasks[]) => {
        const events = tasks.map(task => ({
          title: task.name,
          start: task.finishDate
        }));
          this.calendarOptions.events =  events;
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }
}
