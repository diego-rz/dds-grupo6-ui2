import { Component, OnInit } from '@angular/core';
import { EventDto } from '../model/event';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  address: Address = {
    street: '',
    number: 0,
    floor: 0,
    department: '',
    locality: '',
    province: '',
  };

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

  constructor() { }

  ngOnInit() {
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
