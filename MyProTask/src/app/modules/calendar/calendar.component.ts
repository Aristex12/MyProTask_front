import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    weekends: true,
    events: [
      { title: 'Reunion proyecto', start: '2024-05-12' },
      { title: 'Reunion proyecto', start: '2024-05-15' },
      { title: 'Gestion proyecto', start: '2024-05-18' },
      {title: 'Long Event',start: '2024-05-25' ,end:'2024-05-29'}
    ]
  };
  


}
