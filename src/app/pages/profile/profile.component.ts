import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: any;


  constructor(
// tslint:disable-next-line: variable-name
public _usuarioService: UsuarioService

  ) {
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {


  }


 // ==============================================
 // Guardar actualización
 // =============================================

  guardar( usuario: Usuario ) {
    this.usuario.nombre = usuario.nombre;
    if (!this.usuario.google) {
      this.usuario.email = usuario.email;
    }


    this._usuarioService.actualizarUsuario(this.usuario)
    .subscribe();



  }



// ==============================================
// Selección de imagenes
// =============================================

seleccionImage( archivo: File) {
  if (!archivo) {
    this.imagenSubir = null;
    return;
  }

  if ( archivo.type.indexOf('image') < 0 ) {
  swal('Advertencia', 'El archivo seleccionado no es de tipo imagen', 'error');
  this.imagenSubir = null;
  return;
}

  this.imagenSubir = archivo;

  const reader = new FileReader();
  const urlImagenTemp = reader.readAsDataURL(archivo);


  reader.onloadend = () => this.imagenTemp = reader.result;
}





// ==============================================
// Cambiar Imagen
// =============================================

cambiarImagen() {
  this._usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);
 // console.log(this.usuario.img);
 // this._usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);
}

}
