
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {
  imagenSubir: File;
  imagenTemp: string;


  constructor(
  // tslint:disable-next-line: variable-name
  public _subirArchivoService: SubirArchivoService,
   // tslint:disable-next-line: variable-name
  public _modalUploadService: ModalUploadService

  ) {}


  ngOnInit() {
  }
  // ==============================================
  // Subir imagen
  // =============================================

subirImagen() {
 this._subirArchivoService.subirArchivo(this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
         .then(resp => {


        this._modalUploadService.notificacion.emit(resp);
        this.cerrarModal();

         })

         .catch(err => {
          console.log( 'Error en la carga...' );
         });
}

// ==============================================
// Cerrar Modal
// =============================================
cerrarModal() {
  this.imagenTemp = null;
  this.imagenSubir = null;
  this._modalUploadService.ocultaModal();

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


  reader.onloadend = () =>  this.imagenTemp = reader.result as string;
}


}
