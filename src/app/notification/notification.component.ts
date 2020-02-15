import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  @Input() type: string = 'danger';
  @Input() text: string = 'Error, por favor vuelva a intentar.' ;

  visible = false ;

  constructor() { }

  ngOnInit() {
  }

  show() {
    this.visible = true;
    setTimeout(() => this.visible = false, 3000);
  }

}
