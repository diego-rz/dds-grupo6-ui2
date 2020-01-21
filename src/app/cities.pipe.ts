import { Pipe, PipeTransform } from '@angular/core';
import { Event } from './model/event';

@Pipe({
  name: 'cities'
})
export class CitiesPipe implements PipeTransform {

  transform(value: number): string | number {
    return Event.citiesMap.has(value) ? Event.citiesMap.get(value) : value;
  }

}
