import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CalendarYvv } from './CalendarYvv';
import { RestService } from '../rest.service';
import { Event } from "../model/event";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements AfterViewInit {
  events: Event[];

  constructor(
    private rest: RestService
  ) { }

  ngAfterViewInit() {
    const calendar = new CalendarYvv('#calendar');
    calendar.funcPer = function(ev){
      console.log(ev)
    };
    calendar.diasResal = [4,15,26]
    calendar.createCalendar();

    this.rest.getEvents().subscribe(events => this.events = events);
  }

}
