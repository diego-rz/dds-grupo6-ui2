import { Component, OnInit } from '@angular/core';
import { EventDto } from '../model/event';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  date: Date = {
    day: 0,
    month: 0,
    year: 0,
    hour: 0,
    minute: 0
  }

  event: EventDto = {
    nombre: '',
    tipo: '',
    ciudad: 0,
    fecha: '',
    hora: '',
  }

  constructor(
    private rest: RestService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  send() {
    const day = this.date.day > 9 ? this.date.day.toString() : '0' + this.date.day;
    const month = this.date.month > 9 ? this.date.month.toString() : '0' + this.date.month;
    this.event.fecha = `${this.date.year}-${month}-${day}`;
    const hour = this.date.hour > 9 ? this.date.hour.toString() : '0' + this.date.hour;
    const minute = this.date.minute > 9 ? this.date.minute.toString() : '0' + this.date.minute;
    this.event.hora = `${hour}:${minute}`;
    this.rest.addEvent(this.event).subscribe(() => this.router.navigateByUrl('/events'));
  }

}

export class Address {
  street: string;
  number: number;
  floor: number;
  department: string;
  locality: string;
  province: string;
}

export class Date {
  day: number;
  month: number;
  year: number;
  hour: number;
  minute: number;
}
