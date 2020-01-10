import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CalendarYvv } from './CalendarYvv';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit() {
    const calendar = new CalendarYvv('#calendar');
    calendar.funcPer = function(ev){
      console.log(ev)
    };
    calendar.diasResal = [4,15,26]
    calendar.createCalendar();
  }

}
