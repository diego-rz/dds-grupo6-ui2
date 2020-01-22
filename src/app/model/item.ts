import { IdName, Material, Category } from './idName';
import { ItemType } from './itemType';

export class Item extends IdName{
  tipoPrenda?: ItemType;
  material?: Material;
  colorPrimario?: string;
  colorSecundario?: string;
  imagenPrenda?: string;
  categoria?: Category;
}

export class ItemDto {
  tipoPrendaID: number;
  colorPrincipal: string;
  guardarropaID: number;
  imagenUrl: string;
  nombrePrenda: string;
}
