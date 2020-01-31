import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import {HttpClient} from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { throwError, concat, of } from 'rxjs';
import { Observable } from 'rxjs/Observable';


import swal from 'sweetalert';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable()

export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any [] = [];


  constructor(
    public http: HttpClient,
    public router: Router,
    // tslint:disable-next-line: variable-name
    public _subirArchivoService: SubirArchivoService
  ) {
        this.cargarStorage();
  }
// ==============================================
// Renovar Token
// =============================================

renuevaToken() {
  let url = URL_SERVICIOS + '/login/renueva';
  url += '?token=' + this.token;

  return this.http.get(url)
        .map((resp: any) => {

        this.token = resp.token;
        localStorage.setItem('token', this.token);
        return true;
        })
        .catch( err => {

          this.router.navigate(['/login']);
          swal('No se pudo renovar Token', 'El token no pudo ser renovado' , 'error');
          return Observable.throwError(err);
          });
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
      this.menu = JSON.parse(localStorage.getItem('menu') );
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

// ==============================================
// Guardar en el local Storage
// =============================================

  guardarStorage( id: string, token: string, usuario: Usuario, menu: any ) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario) );
    localStorage.setItem('menu', JSON.stringify(menu) );

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

// ==============================================
//  Servicio de cerrar sesión Logout
// =============================================

logout() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
}

// ==============================================
//   Servicio de login con google
// =============================================

  loginGoogle( token: string ) {
  const url = URL_SERVICIOS + '/login/google';
  return this.http.post( url, { token} )
            .map( (resp: any) => {
              this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu );

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
              this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu);
              return true;
          })
            .catch( err => {
            swal('Error en el Login', err.error.mensaje , 'error');
            return Observable.throwError(err);
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
               })
              .catch( err => {
              swal(err.error.mensaje, err.error.errors.message , 'error');
              return Observable.throwError(err);
                });
  }

  // ==============================================
  // Función para actualizar usuario
  // =============================================
  actualizarUsuario(usuario: Usuario) {

    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put(url, usuario)
             .map((resp: any) => {

            if (usuario._id === this.usuario._id ) {
              const usuarioDB: Usuario = resp.usuario;
              this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu);
            }

            swal('Usuario Actualizado Correctamente', usuario.nombre, 'success');
            return true;
          })

          .catch( err => {
            swal(err.error.mensaje, err.error.errors.message , 'error');
            return Observable.throwError(err);
              });
  }

// ==============================================
// Cambiar Imagen de Usuario
// =============================================

cambiarImagen(archivo: File, id: string ) {

this._subirArchivoService.subirArchivo( archivo, 'usuarios', id)

  .then( (resp: any) => {
    this.usuario.img = resp.usuario.img;
    swal('Imagen Actualizada', this.usuario.nombre, 'success' );
    this.guardarStorage(id, this.token, this.usuario, this.menu);
  })

  .catch(resp => {
    console.log( resp );

    });
  }
  // ==============================================
  // Cargar usuarios con paginación
  // =============================================
  cargarUsuarios(desde: number = 1) {
    const url = URL_SERVICIOS + '/usuario?desde=' + desde;

    return this.http.get(url);
  }
// ==============================================
// Buscar Usuarios
// =============================================
  buscarUsuarios(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get(url)
        .map((resp: any) =>  resp.usuarios);
  }

  // ==============================================
  // Borrar Usuarios
  // =============================================

    borrarUsuario(id: string) {
      let url = URL_SERVICIOS + '/usuario/' + id;
      url += '?token=' + this.token;
      return this.http.delete(url)
          .map( resp => {
          return true;
        });
    }
}
