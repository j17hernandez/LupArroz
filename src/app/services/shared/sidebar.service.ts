import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard', icon: 'mdi mdi-view-dashboard'},
        { titulo: 'ProgressBar', url: '/progress', icon: 'mdi mdi-bike'},
        { titulo: 'Graficas', url: '/graficas1', icon: 'mdi mdi-chart-bar'},
        { titulo: 'promesas', url: '/promesas', icon: 'mdi mdi-book-open-page-variant'},
        { titulo: 'Rxjs', url: '/rxjs', icon: 'fa fa-address-book'},
      ]
    },
    {
      titulo: 'Mantenimientos',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        {titulo: 'Usuarios', url: '/usuarios', icon: 'fa fa-users'},
        {titulo: 'Hospitales', url: '/hospitales', icon: 'fa  fa-hospital-o'},
        {titulo: 'Medicos', url: '/medicos', icon: 'fa fa-user-md'}
      ]
    }
  ];

  constructor() { }
}
