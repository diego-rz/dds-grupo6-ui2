import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-rate-modal',
  templateUrl: './rate-modal.component.html',
  styleUrls: ['./rate-modal.component.css']
})
export class RateModalComponent implements OnInit {
  @Input() type: string;
  @Input() id: number;
  @Output() finish = new EventEmitter<string>();

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
          () => {this.finish.emit('ITEM')}
          )
          break;
          case 'DRESSING':
            this.rest.addDressingRating({atuendoID: this.id, calificacion: rating}).subscribe(
              () => {},
              error => console.log(error),
              () => {this.finish.emit('DRESSING')}
            )
        break;
      default:
        break;
    }

  }

}
