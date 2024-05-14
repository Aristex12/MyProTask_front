import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  dateToday:Date = new Date();
  dayName: string='';
  //home
  showLoader: boolean = true;
  //

  constructor() { }

  ngOnInit(): void {
    this.dateToday = new Date();
    this.dayName = this.getdayName(this.dateToday.getDay());
    //home
    setTimeout(() => {
      this.showLoader = false;
    }, 500);
    //
  }

  getdayName(day: number): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[day];
  }

 



 
}
