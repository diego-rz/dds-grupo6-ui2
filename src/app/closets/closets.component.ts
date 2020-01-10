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

  delete(closetId: number): void {
    this.rest.deleteCloset(closetId).subscribe(() => {}, error => console.log(error), () => this.router.navigateByUrl(''));
  }

}
