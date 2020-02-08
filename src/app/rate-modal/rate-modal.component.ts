import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-rate-modal',
  templateUrl: './rate-modal.component.html',
  styleUrls: ['./rate-modal.component.css']
})
export class RateModalComponent implements OnInit {
  @Input() type: string;
  @Input() id: number;

  constructor(
    private rest: RestService
  ) { }

  ngOnInit() {
  }

  setRating(rating: number) {
    switch (this.type) {
      case 'ITEM':
        this.rest.addItemRating({prendaid: this.id, puntaje: rating}).subscribe(
          () => {},
          error => console.log(error),
          () => {}
        )
        break;
        case 'DRESSING':
            this.rest.addDressingRating({prendaid: this.id, puntaje: rating}).subscribe(
              () => {},
              error => console.log(error),
              () => {}
            )
        break;
      default:
        break;
    }

  }

}
