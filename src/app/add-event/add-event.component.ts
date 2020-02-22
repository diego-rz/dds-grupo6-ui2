import { Component, OnInit, ViewChild } from '@angular/core';
import { EventDto } from '../model/event';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';
import { NotificationComponent } from '../notification/notification.component';
import { City, CityFactory } from 'src/ciudades';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  @ViewChild(NotificationComponent, {static: false})
  notification: NotificationComponent;
  cities: City[];

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
    this.cities = CityFactory.getData();
  }

  send() {
    const day = this.fillWith0(this.date.day.toString());
    const month = this.fillWith0(this.date.month.toString());
    this.event.fecha = `${this.date.year}-${month}-${day}`;

    const hour = this.fillWith0(this.date.hour.toString());
    const minute = this.fillWith0(this.date.minute.toString());
    this.event.hora = `${hour}:${minute}`;
    this.rest.addEvent(this.event).subscribe(
      () => this.router.navigateByUrl('/events'),
      error => {console.log(error); this.notification.show()});
  }

  fillWith0(value: string): string {
    switch (value.length) {
      case 0:
        return '00';
      case 1:
        return '0'+value;
      case 2:
        return value;
      default:
        return '00';
    }
  }

  isValid() {
    return this.event.nombre && this.event.tipo && this.event.ciudad &&
            this.date.year && this.date.month && this.date.day
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
