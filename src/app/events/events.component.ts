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

    calendar.funcNext = calendar.funcPrev = (ev) => {
      ev.diasResal = this.getDiasResal(ev);
      ev.createCalendar()
    };

    this.rest.getEvents().subscribe(events => {
      this.events = events;
      this.events.forEach(event => event.fecha = new Date(event.fecha));
      calendar.diasResal = this.getDiasResal(calendar);
      calendar.createCalendar();
    });
  }

  getDiasResal(ev: CalendarYvv): number[] {
    return this.events
    .filter(event => event.fecha.getMonth()+1 === ev.mesSeleccionado)
    .map(event => event.fecha.getDate());
  }

}
