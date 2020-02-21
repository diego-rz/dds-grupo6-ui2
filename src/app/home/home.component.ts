import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Event } from "../model/event";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  events: Event[];
  ready = false;

  constructor(
    private rest: RestService
  ) { }

  ngOnInit() {
    this.setData();
  }

  async setData() {
    const eventsData = await this.rest.getEvents().toPromise();
    this.events = eventsData;
    this.ready = true;
  }

  isValidDate(d: string): boolean {
    return Date.parse(d) !== null;
  }

}
