import { IdName } from './idName';
import { Item } from './item';
import { User } from './user';

export class Closet extends IdName{
  prendas: Item[];
  propietario: User;
}
