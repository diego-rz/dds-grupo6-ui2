import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { RestService } from '../rest.service';
import { Closet } from '../model/closet';
import { Router, NavigationEnd } from '@angular/router';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-closets',
  templateUrl: './closets.component.html',
  styleUrls: ['./closets.component.css']
})
export class ClosetsComponent implements AfterViewInit {
  @ViewChild(NotificationComponent, {static: false})
  notification: NotificationComponent

  closets: Closet[];
  deleteId: number;

  constructor(
    private rest: RestService,
    private router: Router
  ) { }

  ngAfterViewInit() {
    this.rest.getClosets().subscribe(closets => this.closets = closets,
      error => {console.log(error); this.notification.show()}
    );
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
      error => {console.log(error); this.notification.show()},
      () => {
        this.rest.getClosets().subscribe(closets => {
          this.closets = closets;
        });
      });
  }

}
