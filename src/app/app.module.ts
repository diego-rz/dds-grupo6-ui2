import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { EventsComponent } from './events/events.component';
import { ItemsComponent } from './items/items.component';
import { ClosetsComponent } from './closets/closets.component';
import { AddClosetComponent } from './add-closet/add-closet.component';
import { AddEventComponent } from './add-event/add-event.component';
import { AddItemComponent } from './add-item/add-item.component';
import { LoginComponent } from './login/login.component';
import { EventComponent } from './event/event.component';
import { CitiesPipe } from './cities.pipe';
import { RatingsComponent } from './ratings/ratings.component';
import { RateModalComponent } from './rate-modal/rate-modal.component';
import { FileSelectDirective } from "ng2-file-upload";
import { FileUploaderComponent } from './file-uploader/file-uploader.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeComponent,
    EventsComponent,
    ItemsComponent,
    ClosetsComponent,
    AddClosetComponent,
    AddEventComponent,
    AddItemComponent,
    LoginComponent,
    EventComponent,
    CitiesPipe,
    RatingsComponent,
    RateModalComponent,
    FileSelectDirective,
    FileUploaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
