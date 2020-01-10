import { IdName, Category, Material } from './idName';

export class ItemType extends IdName{
  categoria: Category;
  nivelDeCalor: number;
  codigo: string;
  materialesPermitidos: Material[];
}
