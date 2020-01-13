import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modulos
import { SharedModule } from '../shared/shared.module';

// RUTAS
import { PAGES_ROUTES } from './pages.routes';

import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';




@NgModule({
declarations: [
DashboardComponent,
ProgressComponent,
Graficas1Component,
PagesComponent,
NopagefoundComponent
  ],
  exports: [
DashboardComponent,
ProgressComponent,
Graficas1Component,
PagesComponent,
NopagefoundComponent

  ],
  imports: [
    CommonModule,
    SharedModule,
    PAGES_ROUTES,
  ]
})
export class PagesModule { }
