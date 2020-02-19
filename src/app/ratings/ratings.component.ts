import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Dressing } from '../model/dressing';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit {
  updated: number;
  dressings: Dressing[];

  constructor(
    private rest: RestService
  ) { }

  ngOnInit() {
    this.setRatingsFromServer();
  }

  async setRatingsFromServer() {
    this.dressings = await this.rest.getDressingRatings().toPromise();
  }

  setUpdated(dressingId: number) {
    this.updated = dressingId;
  }

}
