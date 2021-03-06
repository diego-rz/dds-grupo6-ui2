import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Closet } from './model/closet';
import { Item, ItemDto } from './model/item';
import { Event, EventDto } from './model/event';
import { RatingDto, ItemRating } from './model/rating';
import { ItemType } from './model/itemType';
import { Dressing, DressingRatingDto } from './model/dressing';

export const host = 'https://dds-2019-db.herokuapp.com/';
// export const host = 'http://localhost:5000/';

class LoginResponse {
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class RestService {
  token: string = '';
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(host + 'login', { username: username, password: password });
  }

  setToken(token: string): void {
    this.token = token;
  }

  httpRequest<T>(method: string, path: string, queryParms?: QueryParam[], bodyParams?: any): Observable<T> {
    if (!this.token) {
      this.handleError<T>(method);
      return null;
    };
    const requestHeaders = new HttpHeaders().set('Authorization', this.token);
    const queryParamsString = this.joinQueryParams(queryParms);
    switch (method) {
      case 'GET':
        return this.http.get<T>(host + path + queryParamsString, { headers: requestHeaders });
      case 'POST':
        return this.http.post<T>(host + path + queryParamsString, bodyParams, { headers: requestHeaders });
      case 'PUT':
        return this.http.put<T>(host + path + queryParamsString, bodyParams, { headers: requestHeaders });
      case 'DELETE':
        return this.http.delete<T>(host + path + queryParamsString, { headers: requestHeaders });
      default:
        break;
    }
  }

  joinQueryParams(queryParams: QueryParam[]): string {
    let params = '';
    if (queryParams && queryParams.length > 0) {
      params = '?' + queryParams
        .map(element => element.key + "=" + element.value)
        .join('&');
    }
    return params;
  }

  // GUARDARROPAS
  getClosets(): Observable<Closet[]> {
    return this.httpRequest<Closet[]>('GET', 'guardarropas');
  }
  addCloset(closetName: string) {
    return this.httpRequest('POST', 'guardarropas', null, {nombre: closetName});
  }
  deleteCloset(closetId) {
    // return of();
    return this.httpRequest('DELETE', 'guardarropas/' + closetId);
  }

  // EVENTOS
  getEvents(): Observable<Event[]> {
    return this.httpRequest('GET', 'eventos');
  }
  getEvent(eventId: number): Observable<Event> {
    return this.httpRequest('GET', 'eventos/' + eventId);
  }
  addEvent(eventDto: EventDto) {
    return this.httpRequest<EventDto>('POST', 'eventos', null, eventDto);
  }
  modEvent(event: Event) {
    return this.httpRequest<Event>('PUT', 'eventos', null, event);
  }
  deleteEvent(eventId: number) {
    return this.httpRequest('DELETE', 'eventos/' + eventId);
  }
  setEventDressing(eventId: number, atuendoId: number): Observable<Event> {
    const body = {eventoid: eventId, atuendoid: atuendoId};
    return this.httpRequest<Event>('POST', 'elegir', null, body);
  }
  getEventSuggestions(closetId: number, eventId: number): Observable<Event> {
    const closetIdParam = {key: 'guardarropa', value: closetId.toString()} as QueryParam;
    const eventIdParam = {key: 'evento', value: eventId.toString()} as QueryParam;
    return this.httpRequest<Event>('GET', 'atuendos', [closetIdParam, eventIdParam]);
  }
  deleteEventSuggestions(eventId: number): Observable<Event> {
    const eventIdParam = {key: 'evento', value: eventId.toString()} as QueryParam;
    return this.httpRequest<Event>('DELETE', 'atuendos', [eventIdParam]);
  }

  //PRENDAS
  getItems() {
    return this.httpRequest<Item[]>('GET', 'prendas');
  }
  getItem(itemId: number) {
    return this.httpRequest<Item>('GET', 'prendas/' + itemId);
  }
  addItem(item: ItemDto): Observable<Item> {
    return this.httpRequest<Item>('POST', 'prendas', null, item);
  }
  modItem(item: Item) {
    return this.httpRequest('PUT', 'prendas', null, item);
  }
  deleteItem(itemId: number): Observable<any> {
    return this.httpRequest<any>('DELETE', 'prendas/' + itemId);
  }

  //PUNTAJES
  getItemRatings(): Observable<ItemRating[]> {
    return this.httpRequest<ItemRating[]>('GET', 'puntajes');
  }
  getItemRating(ratingId: number) {
    return this.httpRequest('GET', 'puntajes/' + ratingId);
  }
  addItemRating(rating: RatingDto) {
    return this.httpRequest('POST', 'puntajes', null, rating);
  }
  getDressingRatings(): Observable<Dressing[]> {
    return this.httpRequest<Dressing[]>('GET', 'calificaciones');
  }
  getDressingRating(ratingId: number) {
    // return this.httpRequest('GET', 'puntajes/' + ratingId);
    return of({});
  }
  addDressingRating(dressingDto: DressingRatingDto): Observable<Dressing> {
    return this.httpRequest<Dressing>('POST', 'calificaciones', null, dressingDto);
  }

  // TIPO PRENDA
  getItemTypes(): Observable<ItemType[]> {
    return this.httpRequest<ItemType[]>('GET', 'tiposPrenda');
  }

  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);
      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}

export class QueryParam {
  key: string;
  value: string;
}
