import { Component, OnInit, ViewChild } from '@angular/core';
import { RestService } from '../rest.service';
import { Closet } from '../model/closet';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-add-closet',
  templateUrl: './add-closet.component.html',
  styleUrls: ['./add-closet.component.css']
})
export class AddClosetComponent implements OnInit {
  @ViewChild(NotificationComponent, {static: false})
  notification: NotificationComponent

  nameRequired = false;

  constructor(
    private rest: RestService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  add(closetName: string): void {
    if (!closetName || closetName.length == 0) {
      this.nameRequired = true;
    } else {
      this.rest.addCloset(closetName).subscribe(
        () => {},
        error => {console.log(error); this.notification.show()},
        () => this.router.navigateByUrl('/closets'));
    }
  }

}
