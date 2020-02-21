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
  fecha: Date
}

export class EventDto {
  nombre: string;
  tipo: string;
  ciudad: number;
  fecha: string;
  hora: string;
}

