import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import {HttpClient} from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import 'rxjs/add/operator/map';
import swal from 'sweetalert';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;


  constructor(
    public http: HttpClient,
    public router: Router
  ) {
        this.cargarStorage();
  }

  // ==============================================
  // Saber si el usuario está logueado con token
  // =============================================

  estaLogueado() {
    return (this.token.length > 5) ? true : false;

  }

// ==============================================
// Cargar del storage
// =============================================

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario') );
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

// ==============================================
// Guardar en el local Storage
// =============================================

  guardarStorage( id: string, token: string, usuario: Usuario ) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario) );

    this.usuario = usuario;
    this.token = token;
  }

// ==============================================
//  Servicio de cerrar sesión Logout
// =============================================

logout() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
}

// ==============================================
//   Servicio de login con google
// =============================================

  loginGoogle( token: string ) {
  const url = URL_SERVICIOS + '/login/google';
  return this.http.post( url, { token} )
            .map( (resp: any) => {

              this.guardarStorage( resp.id, resp.token, resp.usuario );
              return true;
            });

}

// ==============================================
// Servicio de login Normal
// =============================================

  login(usuario: Usuario, recordar: boolean = false ) {
  if (recordar) {
    localStorage.setItem('email', usuario.email);
  } else {
    localStorage.removeItem('email');
  }


  const url = URL_SERVICIOS + '/login';
  return this.http.post(url, usuario)
            .map((resp: any) => {

              this.guardarStorage( resp.id, resp.token, resp.usuario );

              return true;
          });

  }

  // ==============================================
  // Servicio para crear Usuario
  // =============================================

  crearUsuario(usuario: Usuario) {

    const url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario)
               .map( (resp: any) => {

              swal('Usuario Creado', usuario.email, 'success');
              return resp.usuario;

               });
  }

}
