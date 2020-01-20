import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { HomeComponent } from './home/home.component';
import { EventsComponent } from './events/events.component';
import { ItemsComponent } from './items/items.component';
import { ClosetsComponent } from './closets/closets.component';
import { AddClosetComponent } from './add-closet/add-closet.component';
import { AddEventComponent } from './add-event/add-event.component';
import { AddItemComponent } from './add-item/add-item.component';
import { LoginComponent } from './login/login.component';
import { EventComponent } from './event/event.component';

const routes = [
  // {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '', component: HomeComponent},
  {path: 'events', component: EventsComponent},
  {path: 'events/:id', component: EventComponent},
  {path: 'events/add', component: AddEventComponent},
  {path: 'items', component: ItemsComponent},
  {path: 'items/add', component: AddItemComponent},
  {path: 'closets', component: ClosetsComponent},
  {path: 'closets/items', component: ItemsComponent},
  {path: 'closets/add', component: AddClosetComponent},
  {path: 'login', component: LoginComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
