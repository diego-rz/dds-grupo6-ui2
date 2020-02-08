import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit {
  updated: number;

  dressings = [
    {
      id: 1,
      nombre: 'Atuendo formal 1',
      evento: {
        nombre: 'Casamiento de pepe'
      },
      rate: 4
    },
    {
      id: 2,
      nombre: 'Atuendo casual 4',
      evento: {
        nombre: 'Cumpleaños de pepe'
      },
      rate: 3
    }
  ]


  constructor() { }

  ngOnInit() {
  }

  setUpdated(dressingId: number) {
    this.updated = dressingId;
  }

}
