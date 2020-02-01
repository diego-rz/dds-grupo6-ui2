import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';

enum translateMap {
  "closets" = "Guardarropas",
  "home" = "inicio"
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css',
    '../../css/sb-admin-2.min.css',
    '../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css',
  ]
})
export class SidebarComponent implements OnInit, AfterViewInit {
  translateMap: Map<string, string> = new Map();

  url: string[] = [];
  token: string = '';
  loginPage: boolean;

  constructor(
    private location: Location,
    private router: Router,
    private restService: RestService
  ) { }

  ngOnInit() {
    this.location.onUrlChange((url: string) => {
      this.loginPage = url === '/login';
    })
    if(!this.restService.token) {
      this.router.navigateByUrl('/login');
    }
    this.loadMap();
    this.location.onUrlChange(() => {
      this.url = this.location.path(false).split('/').splice(1);
    });
  }

  ngAfterViewInit() {
    this.token = this.restService.token;
  }

  loadMap(): void {
    this.translateMap.set('home', 'Inicio');
    this.translateMap.set('events', 'Eventos');
    this.translateMap.set('closets', 'Guardarropas');
    this.translateMap.set('add', 'Nuevo');
    this.translateMap.set('items', 'Prendas');
    this.translateMap.set('login', 'Ingresar');
    this.translateMap.set('ratings', 'Calificaciones');
  }

  breadcrumbStep(index: number): string {
    return Array.from(this.url).slice(0,index+1).join('/');
  }

  logout() {
    this.restService.token = null;
    this.router.navigateByUrl('/login');
  }
}
