import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { RestService } from '../rest.service';
import { Item } from '../model/item';
import { Router } from '@angular/router';
import { Closet } from '../model/closet';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit, AfterViewInit {

  @Input() items: Item[];

  constructor(
    private rest: RestService
  ) { }

    ngOnInit() {
      if(history.state.data) {
        this.items = (history.state.data.closet as Closet).prendas;
      }
    }

  ngAfterViewInit() {
    if(!this.items) {
      this.rest.getItems().subscribe(items => this.items = items);
    }
  }

}
