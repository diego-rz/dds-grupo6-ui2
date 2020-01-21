import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { RestService } from '../rest.service';
import { Item } from '../model/item';
import { Closet } from '../model/closet';
import { Dressing } from '../model/dressing';

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
      if (history.state.data) {
        if (history.state.data.closet) {
          this.items = (history.state.data.closet as Closet).prendas;
        } else if (history.state.data.dressing) {
          const dressing = (history.state.data.dressing as Dressing);
          this.items = [
            dressing.prendaSuperior,
            dressing.prendaInferior,
            dressing.prendaCalzado,
            dressing.prendaAccesorio,
            dressing.abrigoLigero,
            dressing.abrigoPesado,
          ].filter(item => item);
        }
      }
    }

  ngAfterViewInit() {
    if(!this.items) {
      this.rest.getItems().subscribe(items => this.items = items);
    }
  }

}
