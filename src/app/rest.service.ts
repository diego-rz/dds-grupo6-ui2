import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Closet } from './model/closet';
import { Item, ItemDto } from './model/item';
import { Event, EventDto } from './model/event';
import { Dressing } from './model/dressing';

class LoginResponse {
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class RestService {
  host = 'http://localhost:5000/';
  token: string = '';
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(username: string, password: string): void {
    this.http
      .post<LoginResponse>(this.host+'login', {username: username, password: password})
      .subscribe(
        response => this.token = response.token,
        error => this.token = error,
        () => this.router.navigateByUrl('')
        );
  }

  httpRequest<T>(method: string, path: string, queryParms?: string, bodyParams?: T): Observable<T> {
    const requestHeaders = new HttpHeaders().set('Authorization', this.token);
    switch (method) {
      case 'GET':
        return this.http.get<T>(this.host + path, {headers: requestHeaders});
      case 'POST':
        return this.http.post<T>(this.host + path, bodyParams, {headers: requestHeaders});
      case 'DELETE':
        return this.http.delete<T>(this.host + path, {headers: requestHeaders});
      default:
        break;
    }
  }

  // GUARDARROPAS
  getClosets(): Observable<Closet[]> {
    return this.httpRequest<Closet[]>('GET', 'guardarropas');
  }
  addCloset(closet: Closet) {
    // return of();
    return this.httpRequest('POST', 'guardarropas', null, closet);
  }
  deleteCloset(closetId) {
    // return of();
    return this.httpRequest('DELETE', 'guardarropas/'+closetId);
  }

  // EVENTOS
  getEvents(): Observable<Event[]> {
    return this.httpRequest('GET', 'eventos');
  }
  getEvent(eventId: number): Observable<Event> {
    return this.httpRequest('GET', 'eventos/'+eventId);
  }
  addEvent(eventDto: EventDto) {
    return this.httpRequest<EventDto>('POST', 'eventos', null, eventDto);
  }
  modEvent(event: Event) {
    return this.httpRequest<Event>('PUT', 'eventos', null, event);
  }
  deleteEvent(eventId: number) {
    this.httpRequest('DELETE', 'eventos/'+eventId);
  }
  setEventDressing(eventId: number, atuendo: Dressing) {
    return this.httpRequest('POST', 'eventos/'+eventId+'/atuendos', null, atuendo);
  }

  //PRENDAS
  getItems() {
    return this.httpRequest<Item[]>('GET', 'prendas');
  }
  getItem(itemId: number) {
    return this.httpRequest<Item>('GET', 'prendas/'+itemId);
  }
  addItem(item: ItemDto) {
    return this.httpRequest('POST', 'prendas', null, item);
  }
  modItem(item: Item) {
    return this.httpRequest('PUT', 'prendas', null, item);
  }
  deletePrenda(itemId: number) {
    this.httpRequest('DELETE', 'prendas/'+itemId);
  }
}
