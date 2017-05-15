import { CompetitorsComponent } from './competitors/competitors.component';
import { CompetitorListComponent } from './competitors/competitor-list/competitor-list.component';
import { Error404Component } from './shared/error-404.component';
import { CreateCompetitorComponent } from './competitors/create-competitor/create-competitor.component';

import { Routes } from '@angular/router';

export const appRoutes:Routes = [
    { path: 'competitors/ranking', component: CompetitorListComponent},
    { path: 'competitors', component: CompetitorsComponent},
    
    { path: '404', component: Error404Component },
    { path: '', redirectTo: 'competitors/ranking', pathMatch: 'full'},
    { path: '**', redirectTo: 'competitors/ranking' }
    
];