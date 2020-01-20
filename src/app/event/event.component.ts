import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../model/event';
import { ActivatedRoute } from '@angular/router';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  @Input() event: Event;

  constructor(
    private route: ActivatedRoute,
    private rest: RestService
  ) { }

  ngOnInit() {
    const eventId = +this.route.snapshot.paramMap.get('id');
    this.rest.getEvent(eventId).subscribe(event => this.event = event);
  }

}
