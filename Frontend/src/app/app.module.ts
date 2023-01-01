import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './core/home/home.component';
import { AboutComponent } from './core/about/about.component';
import { NavBarComponent } from './core/nav-bar/nav-bar.component';
import { ExibitionsComponent } from './exibitions/exibitions.component';
import { ExibitionItemComponent } from './exibitions/exibition-item/exibition-item.component';
import { ExibitionDetailsComponent } from './exibitions/exibition-details/exibition-details.component';
import { ArtworkDetailsComponent } from './exibitions/exibition-details/artwork-details/artwork-details.component';
import { ExibitionEditComponent } from './exibitions/exibition-edit/exibition-edit.component';
import { ArtworkItemComponent } from './exibitions/exibition-details/artwork-item/artwork-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ExibitionFormComponent } from './exibitions/exibition-form/exibition-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    NavBarComponent,
    ExibitionsComponent,
    ExibitionItemComponent,
    ExibitionDetailsComponent,
    ArtworkDetailsComponent,
    ExibitionEditComponent,
    ArtworkItemComponent,
    ExibitionFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
