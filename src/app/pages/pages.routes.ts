import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/RxjsComponent';

import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';


const pagesRoutes: Routes = [
  { path: '',
  component: PagesComponent,
  canActivate: [ LoginGuardGuard ],
  children: [
    { path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'} },
    { path: 'progress', component: ProgressComponent, data: {titulo: 'ProgressBar'} },
    { path: 'graficas1', component: Graficas1Component, data: {titulo: 'Gráficas'} },
    { path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'} },
    { path: 'account-settings', component: AccoutSettingsComponent, data: {titulo: 'Ajustes de Tema'} },
    { path: 'rxjs', component: RxjsComponent, data: {titulo: 'Rxjs'} },
    { path: 'perfil', component: ProfileComponent, data: {titulo: 'Perfíl de usuario'} },

   // ==============================================
   // Mantenimientos
   // =============================================

    { path: 'usuarios', component: UsuariosComponent, data: {titulo: 'Mantenimiento de Usuarios'} },
    { path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Mantenimiento de Hospitales'} },
    { path: 'medicos', component: MedicosComponent, data: {titulo: 'Mantenimiento de Medicos'} },


    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
  ]
}
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
