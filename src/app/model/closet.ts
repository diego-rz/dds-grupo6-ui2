import { IdName } from './idName';
import { Item } from './item';
import { Owner } from './owner';

export class Closet extends IdName{
  prendas: Item[];
  propietario: Owner;
}
