import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { TasksService } from 'src/app/servicios/task/tasks.service';
import { Tasks } from 'src/app/models/tasks';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
 
tasksList: Tasks[] = [];

calendarOptions: CalendarOptions = {
  plugins: [dayGridPlugin],
  initialView: 'dayGridMonth',
  weekends: true,
  events: [] as any[] 
};

constructor(private tasksService: TasksService) { }

ngOnInit() {
  this.getData();
}

getData() {
  this.tasksService.getActiveTaskByUserId().subscribe({
    next: (tasks) => {
      this.tasksList = tasks || []; 
      this.generateEvents();
    },
    error: (error: any) => {
      console.error(error);
    }
  });
}

generateEvents() {
  const events: any[] = []; 

  this.tasksList.forEach(task => {
    if (task && task.name && task.startDate) {
      const event = {
        title: task.name,
        start: task.startDate,
        end: task.finishDate
      };
      events.push(event);
    }
  });

  this.calendarOptions.events = events;
}



}
