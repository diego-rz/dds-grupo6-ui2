import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../model/event';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../rest.service';
import { Dressing } from '../model/dressing';
import { ItemType } from '../model/itemType';
import { Item } from '../model/item';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  @Input() event: Event;

  constructor(
    private route: ActivatedRoute,
    private rest: RestService,
    private router: Router
  ) { }

  ngOnInit() {
    const eventId = +this.route.snapshot.paramMap.get('id');
    this.rest.getEvent(eventId).subscribe(event => {
      this.event = event;
      event.posiblesAtuendos = [this.getAtuendo()];
    });
  }

  viewItems(dressing: Dressing): void {
    this.router.navigateByUrl(`events/${dressing.id}/items`, {state: {data: {dressing}}});
  }


  private getAtuendo(): Dressing {
    const tipoRemera: ItemType = {
      id: 1,
      nombre: 'Remera corta',
      categoria: {id:1, nombre: 'Superior'},
      nivelDeCalor: 10,
      codigo: 'asdf',
      materialesPermitidos:[]
    }
    const remera: Item = {
      id: 1,
      nombre: 'Remera negra',
      tipoPrenda: tipoRemera,
      material: {id: 1, nombre: 'Algodon'},
      colorPrimario: 'Black',
      categoria: {id: 2, nombre: 'Superior'}
    }

    const tipoBermuda: ItemType = {
      id: 2,
      nombre: 'Bermuda',
      categoria: {id:1, nombre: 'Inferior'},
      nivelDeCalor: 15,
      codigo: 'asdf',
      materialesPermitidos:[]
    }
    const bermuda: Item = {
      id: 2,
      nombre: 'Bermuda gris',
      tipoPrenda: tipoBermuda,
      material: {id: 1, nombre: 'Algodon'},
      colorPrimario: 'Gray',
      categoria: {id: 2, nombre: 'Inferior'}
    }

    const tipoZapatilla: ItemType = {
      id: 3,
      nombre: 'Zapatilla',
      categoria: {id:1, nombre: 'Calzado'},
      nivelDeCalor: 20,
      codigo: 'asdf',
      materialesPermitidos:[]
    }
    const zapatillas: Item = {
      id: 3,
      nombre: 'Zapatillas negras',
      tipoPrenda: tipoZapatilla,
      material: {id: 1, nombre: 'Lona'},
      colorPrimario: 'Black',
      categoria: {id: 2, nombre: 'Calzado'}
    }

    const atuendo: Dressing = {
      id: 1,
      nombre: 'Casual',
      prendaSuperior: remera,
      prendaInferior: bermuda,
      prendaCalzado: zapatillas
    }
    return atuendo;
  }

}
