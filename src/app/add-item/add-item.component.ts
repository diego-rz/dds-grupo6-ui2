import { Component, OnInit } from '@angular/core';
import { ItemType } from '../model/itemType';
import { Closet } from '../model/closet';
import { RestService } from '../rest.service';
import { ItemDto } from '../model/item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  itemTypes: ItemType[];
  closets: Closet[];
  itemDto: ItemDto;

  constructor(
    private rest: RestService,
    private router: Router
  ) { }

  ngOnInit() {
    this.rest.getClosets().subscribe(
      (closets) => this.closets = closets,
      (error) => console.log(error),
    );
    this.rest.getItemTypes().subscribe(
      (itemTypes) => this.itemTypes = itemTypes,
      (error) => console.log(error),
    );
  }

  addItem() {
    this.rest.addItem(this.itemDto).subscribe(
      () => {},
      (error) => console.log(error),
      () => this.router.navigateByUrl('items')
    )
  }

}
