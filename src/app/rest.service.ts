import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Closet } from './model/closet';
import { Item } from './model/item';

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
    return this.httpRequest<Closet[]>('GET', "guardarropas");
  }
  addCloset(guardarropa: Closet) {
    return of();
    // return this.httpRequest('POST', "guardarropas", null, guardarropa);
  }
  deleteCloset(guardarropaId) {
    return of();
    // return this.httpRequest('DELETE', "guardarropas/"+guardarropaId);
  }
  /*

  // EVENTOS
  apiGetEvents() {
    return httpRequest('GET', "eventos", null, null);
  }
  apiAddEvent(event) {
    return httpRequest('POST', "eventos", null, event);
  }
  apiGetEvent(eventId) {
    return httpRequest('GET', "eventos/"+eventId, null, null);
  }
  apiModEvent(eventFull) {
    return httpRequest('PUT', "eventos/"+eventFull.id, null, eventFull);
  }
  apiDeleteEvent(eventId) {
    httpRequest('DELETE', "eventos/"+eventId, null, null);
  }
  apiSetAtuendo(eventId, atuendo) {
    return httpRequest('POST', "eventos/"+eventId+"/atuendos", null, atuendo);
  }
*/
  //PRENDAS
  getItems() {
    return this.httpRequest<Item[]>('GET', "prendas");
  }
  /*
  apiAddPrenda(prenda) {
    return httpRequest('POST', "prendas", null, prenda);
  }
  apiModPrenda(prenda) {
    return httpRequest('PUT', "prendas/"+prenda.id, null, prenda);
  }
  apiDeletePrenda(prendaId) {
    httpRequest('DELETE', "prendas/"+prendaId, null, null);
  }
*/
}
