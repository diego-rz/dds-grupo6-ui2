import { IdName } from './idName';
import { Dressing } from './dressing';
import { User } from './user';

export class Event extends IdName{
  ciudad: number;
  posiblesAtuendos: Dressing[];
  atuendoElegido: Dressing;
  notificadorEvento: IdName;
  temperatura: number;
  usuario: User;

  static citiesMap: Map<number, string> = new Map<number, string>([
    [10, 'Buenos Aires'],
    [14, 'Ezeiza']
  ]);

}

export class EventDto {
  nombre: string;
  tipo: string;
  ciudad: number;
  fecha: string;
  hora: string;
}

export class SimpleEvent extends Event {
  fecha: Date
}
