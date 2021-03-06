import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CalendarYvv } from './CalendarYvv';
import { RestService } from '../rest.service';
import { Event } from "../model/event";
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements AfterViewInit {
  @ViewChild(NotificationComponent, {static: false})
  notification: NotificationComponent
  ready = false;

  events: Event[];
  deleteId: number;

  constructor(
    private rest: RestService
  ) { }

  ngAfterViewInit() {
    const calendar = new CalendarYvv('#calendar');
    calendar.createCalendar();

    calendar.funcNext = calendar.funcPrev = (ev) => {
      ev.diasResal = this.getDiasResal(ev);
      ev.createCalendar()
    };

    this.rest.getEvents().subscribe(events => {
      this.events = events;
      this.events.forEach(event => event.fecha = new Date(event.fecha));
      calendar.diasResal = this.getDiasResal(calendar);
      calendar.createCalendar();
    },
    error => {console.log(error); this.notification.show()},
    () => this.ready = true);
  }

  getDiasResal(ev: CalendarYvv): number[] {
    return this.events
    .filter(event => event.fecha.getMonth()+1 === ev.mesSeleccionado)
    .map(event => event.fecha.getDate());
  }

  setDeleteId(eventId: number) {
    this.deleteId = eventId;
  }

  delete() {
    this.rest.deleteEvent(this.deleteId).subscribe(
      () => {},
      error => {console.log(error); this.notification.show()},
      () => {
        this.rest.getEvents().subscribe(events => {
          const calendar = new CalendarYvv('#calendar');
          calendar.funcPer = function(ev){
            console.log(ev)
          };
          this.events = events;
          this.events.forEach(event => event.fecha = new Date(event.fecha));
          calendar.diasResal = this.getDiasResal(calendar);
          calendar.createCalendar();
        });
      }
    );
  }

  isValidDate(d: Date): boolean {
    return d instanceof Date && !isNaN(d.getTime());
  }

}
