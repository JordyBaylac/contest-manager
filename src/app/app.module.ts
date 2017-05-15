import { CompetitorsComponent } from './competitors/competitors.component';
import { appRoutes } from './routes';
import { Error404Component } from './shared/error-404.component';
import { CompetitorService } from './competitors/competitor/competitor.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CreateCompetitorComponent } from './competitors/create-competitor/create-competitor.component';
import { AlertModule } from 'ng2-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';

import { RouterModule } from '@angular/router';
import { CompetitorListComponent } from './competitors/competitor-list/competitor-list.component';

@NgModule({
  declarations: [
    AppComponent,
    Error404Component,
    CreateCompetitorComponent,
    NavbarComponent,
    CompetitorListComponent,
    CompetitorsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AlertModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  providers: [CompetitorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
