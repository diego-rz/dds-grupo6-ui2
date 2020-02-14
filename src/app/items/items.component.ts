import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { RestService } from '../rest.service';
import { Item } from '../model/item';
import { Closet } from '../model/closet';
import { Dressing } from '../model/dressing';
import { RatingDto, ItemRating } from '../model/rating';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit, AfterViewInit {
  @Input() items: Item[];
  itemRatings: ItemRating[];

  ratingItemId: number;

  itemsWithRatings: {
    item: Item,
    rating: number
  }[];

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
    this.getDataFromServer();
  }

  async getDataFromServer() {
    await this.setItems();
    await this.setItemRatings();
    this.setItemsWithRatings();
  }

  async setItems() {
    if(!this.items) {
      this.items = await this.rest.getItems().toPromise();
    }
  }

  async setItemRatings() {
    this.itemRatings = await this.rest.getItemRatings().toPromise();
  }

  setItemsWithRatings() {
    this.itemsWithRatings = this.items.map(item => {
      const itemRating = this.itemRatings.find(rating => rating.prenda.id === item.id);
      return {item: item, rating: itemRating ? itemRating.puntaje : undefined}
    });
  }

  setRatingItem(itemId: number): void {
    this.ratingItemId = itemId;
  }

  onRating(): void {
    this.getDataFromServer();
  }

  async deleteItem(itemId: number) {
    await this.rest.deleteItem(itemId).toPromise();
    this.getDataFromServer();
  }
}
