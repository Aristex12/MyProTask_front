import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Tasks } from 'src/app/models/tasks';
import { Events } from 'src/app/models/events';
import { EventService } from 'src/app/servicios/event/event.service';
import { TasksService } from 'src/app/servicios/task/tasks.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { startWith } from 'rxjs';

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
    events: [],
    eventContent: this.customEventContent
  };

  eventoForm!: FormGroup;
  eventsList: any[] = []; 
  onlyEventList:any[] = [];
  selectedEvent = {
    idEvent: 0,
    title: '',
    finishDate: new Date(),
    description: ''
  };

  constructor(private taskService: TasksService, private eventService: EventService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.eventoForm = this.formBuilder.group({
      title: ['', Validators.required],
      finishDate: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.updateEvents();
    console.log(this.onlyEventList);
  }


  updateEvents():void{
    this.calendarOptions.events = [];
    this.getTasksByUserId();
    this.getEventsByUserId();
  }

  getTasksByUserId():void{
    this.taskService.getActiveTaskByUserId().subscribe({
      next: (tasks: Tasks[]) => {
        const newEvents = tasks.map(task => ({
          idEvent: task.idTask,
          title: task.name,
          start: task.finishDate,
          description: task.description,
          classNames: ['calendar-tasks']
        }));
        this.calendarOptions.events = (this.calendarOptions.events as any[]).concat(newEvents);
        this.updateEventsList();
      },
      error: (error: any) => {
        console.error('Error fetching tasks:', error);
      }
    });
  }
  getEventsByUserId(): void {
    this.eventService.getEventsByUserId().subscribe({
      next: (events: Events[]) => {
        const newEvents = events.map(event => ({
          idEvent: event.idEvent,
          title: event.title,
          start: event.finishDate,
          description: event.description,
          className: ['calendar-events']
        }));

        this.onlyEventList = events;
        this.calendarOptions.events = (this.calendarOptions.events as any[]).concat(newEvents);
        this.updateEventsList();
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }


  addEvent(): void {
    const event = {
      title: this.eventoForm.value.title,
      finishDate: new Date(this.eventoForm.value.finishDate),
      description: this.eventoForm.value.description
    };
    
    this.eventService.addEvents(event).subscribe({
      next: (response: any) => {
        console.log(response);
        this.updateEvents();
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }
  
  
  updateEventsList(): void {
    if (Array.isArray(this.calendarOptions.events)) {
      this.eventsList = this.calendarOptions.events;
    } else {
      this.eventsList = [];
    }
  }

  

  customEventContent(info: any) {
    const eventTitle = info.event.title;
    const eventElement = document.createElement('div');
    eventElement.innerText = eventTitle;
    return { domNodes: [eventElement] };
  }

  formatTimestamp(timestamp: number): string {
    const date = new Date(timestamp);
    const dateString = `${date.getFullYear()}-${this.padZero(date.getMonth() + 1)}-${this.padZero(date.getDate())}`;
    const timeString = `Time: ${this.padZero(date.getHours())}:${this.padZero(date.getMinutes())}`;
    return `${dateString} ${timeString}`;
  }
  
  padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  selectEvent(event:any){
    console.log(event)
    this.selectedEvent.idEvent = event.idEvent;
    this.selectedEvent.title = event.title;
    this.selectedEvent.finishDate = event.start;
    this.selectedEvent.description = event.description;
    console.log(this.selectedEvent)
  }

  deleteEvent(idEvent: number){
    this.eventService.deleteEvent(idEvent).subscribe({
      next: (response: any) => {
        console.log(response);
        this.updateEvents();
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  updateEvent(){
    const event = {
      title: this.eventoForm.value.title,
      finishDate: new Date(this.eventoForm.value.finishDate),
      description: this.eventoForm.value.description
    };

    this.eventService.updateEvent(this.selectedEvent.idEvent, event ).subscribe({
      next: (response: any) => {
        console.log(response);
        this.updateEvents();
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }
}
