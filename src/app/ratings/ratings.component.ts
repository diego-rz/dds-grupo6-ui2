import { Component, OnInit, ViewChild } from '@angular/core';
import { RestService } from '../rest.service';
import { Dressing } from '../model/dressing';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit {
  @ViewChild(NotificationComponent, {static: false})
  notification: NotificationComponent
  ready = false;

  updated: number;
  dressings: Dressing[];

  constructor(
    private rest: RestService
  ) { }

  ngOnInit() {
    this.setRatingsFromServer();
  }

  async setRatingsFromServer() {
    try {
      this.dressings = await this.rest.getDressingRatings().toPromise();
    } catch (error) {
      console.log(error);
      this.notification.show();
    }
    this.ready = true;
  }

  setUpdated(dressingId: number) {
    this.updated = dressingId;
  }

}
