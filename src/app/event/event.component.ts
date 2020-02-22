import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Event } from '../model/event';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../rest.service';
import { Dressing } from '../model/dressing';
import { NotificationComponent } from '../notification/notification.component';
import { Closet } from '../model/closet';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  @ViewChild(NotificationComponent, {static: false})
  notification: NotificationComponent

  @Input() event: Event;
  dressingId: number;
  closets: Closet[];
  closetIdSelected: number;
  isGenerating = false;

  constructor(
    private route: ActivatedRoute,
    private rest: RestService,
    private router: Router
  ) { }

  ngOnInit() {
    this.setData();
  }

  async setData() {
    const eventId = +this.route.snapshot.paramMap.get('id');
    await this.setEventFromServer(eventId);
    await this.setClosetsFromServer();
    this.generateIfInNext4();
  }

  generateIfInNext4() {
    if (this.event.posiblesAtuendos.length > 0) {
      return;
    }
    let next4 = new Date();
    next4.setDate(next4.getDate() + 4);
    const eventDate = new Date(this.event.fecha);
    if (next4.getTime() > eventDate.getTime() && this.closets && this.closets.length > 0) {
      this.closetIdSelected = this.closets[0].id;
      this.generateSuggestions();
    }
  }

  async setClosetsFromServer() {
    try {
      this.closets = await this.rest.getClosets().toPromise();
    } catch (error) {
      console.log(error);
      this.notification.show();
    }
  }

  async setEventFromServer(eventId: number) {
    try {
      this.event = await this.rest.getEvent(eventId).toPromise();
    } catch(error) {
      console.log(error);
      this.notification.show();
    }
  }

  setDressingId(dressingId: number) {
    this.dressingId = dressingId;
  }

  setEventDressing(dressingId: number) {
    this.rest.setEventDressing(this.event.id, dressingId).subscribe(
      () => this.setEventFromServer(this.event.id),
      error => {console.log(error); this.notification.show()}
    )
  }

  async generateSuggestions() {
    this.isGenerating = true;
    try {
      this.deleteSuggestions();
      const suggestionsResponse = await this.rest.getEventSuggestions(this.closetIdSelected, this.event.id).toPromise();
      this.event.posiblesAtuendos = suggestionsResponse.posiblesAtuendos;
      this.event.temperatura = suggestionsResponse.temperatura;
    } catch (error) {
      console.log(error);
      this.notification.show();
    }
    this.isGenerating = false;
  }

  async deleteSuggestions() {
    try {
      const response = await this.rest.deleteEventSuggestions(this.event.id).toPromise();
      this.event = response;
    } catch (error) {
      console.log(error);
      this.notification.show();
    }
  }

  viewItems(dressing: Dressing) {
    this.router.navigateByUrl('closets/items', {state: {data: {dressing}}});
  }

}
