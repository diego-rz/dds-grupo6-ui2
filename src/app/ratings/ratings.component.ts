import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit {

  dressings = [
    {
      nombre: 'Atuendo formal 1',
      evento: {
        nombre: 'Casamiento de pepe'
      },
      rate: 4
    },
    {
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

}
