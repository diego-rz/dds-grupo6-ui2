import { Pipe, PipeTransform } from '@angular/core';
import { Event } from './model/event';
import { CityFactory } from 'src/ciudades';

@Pipe({
  name: 'cities'
})
export class CitiesPipe implements PipeTransform {

  transform(value: number): string | number {
    const city = CityFactory.getData().find(city => city.id === value);
    return city ? city.name : value;
  }

}
