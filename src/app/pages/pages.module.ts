import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modulos
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

// RUTAS
import { PAGES_ROUTES } from './pages.routes';

import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// Temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';



@NgModule({
declarations: [
DashboardComponent,
ProgressComponent,
Graficas1Component,
PagesComponent,
IncrementadorComponent

  ],
  exports: [
DashboardComponent,
ProgressComponent,
Graficas1Component,
PagesComponent,


  ],
  imports: [
    CommonModule,
    SharedModule,
    PAGES_ROUTES,
    FormsModule,

  ]
})
export class PagesModule { }
