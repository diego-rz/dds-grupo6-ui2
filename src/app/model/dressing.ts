import { IdName } from './idName';
import { Item } from './item';

export class Dressing extends IdName{
  prendaCalzado?: Item;
  prendaInferior?: Item;
  prendaSuperior?: Item;
  abrigoLigero?: Item;
  abrigoPesado?: Item;
  prendaAccesorio?: Item;
  calificacion?: number;
  nivelDeCalor?: number;
}

export class DressingRatingDto {
  atuendoID: number;
  calificacion: number
}
