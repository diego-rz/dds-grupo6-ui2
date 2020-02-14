import { IdName } from './idName';

export class RatingDto {
  prendaid: number;
  puntaje: number;
}

export class ItemRating extends IdName {
  prenda: {
      id: number
  };
  puntaje: number
}
