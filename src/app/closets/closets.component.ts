import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Closet } from '../model/closet';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-closets',
  templateUrl: './closets.component.html',
  styleUrls: ['./closets.component.css']
})
export class ClosetsComponent implements AfterViewInit {
  closets: Closet[];
  deleteId: number;

  constructor(
    private rest: RestService,
    private router: Router
  ) { }

  ngAfterViewInit() {
    this.rest.getClosets().subscribe(closets => {
      this.closets = closets;
    });
  }

  viewItems(closet: Closet): void {
    this.router.navigateByUrl('closets/items', {state: {data: {closet}}});
  }

  setDeleteId(closetId: number) {
    this.deleteId = closetId;
  }

  delete(): void {
    this.rest.deleteCloset(this.deleteId).subscribe(
      () => {},
      error => console.log(error),
      () => {
        this.rest.getClosets().subscribe(closets => {
          this.closets = closets;
        });
      });
  }

}
