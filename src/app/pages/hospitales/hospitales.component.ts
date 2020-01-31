import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {
    desde: number = 0;

    totalHospitales: number = 0;
  hospitales: Hospital [] = [];

  constructor(
    // tslint:disable-next-line: variable-name
    public _hospitalService: HospitalService,
      // tslint:disable-next-line: variable-name
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
     this.cargarHospitales();
     this.cargarHospitalPaginacion();
     this._modalUploadService.notificacion
     .subscribe(() => this.cargarHospitales() );

  }
// ==============================================
// Cargar Hospitales
// =============================================
cargarHospitales() {


  this._hospitalService.cargarHospitales()
              .subscribe( hospitales => this.hospitales = hospitales );

}

// ==============================================
// Paginación
// =============================================
cargarHospitalPaginacion() {


  this._hospitalService.cargarHospitalPaginacion(this.desde)
              .subscribe( (resp: any) => {
              this.totalHospitales = resp.total;
              this.hospitales = resp.hospitales;

      });

}

  // ==============================================
  //  Cambiar valor de Paginación
  // =============================================
  cambiarDesde(valor: number) {
    const desde = this.desde + valor;

    if (desde >= this.totalHospitales) {
      return;

  }

    if (desde < 0 ) {
       return;
        }

    this.desde += valor;
    this.cargarHospitalPaginacion();
  }


  // ==============================================
  // Buscar Hospital
  // =============================================

  buscarHospital( termino: string ) {

   if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }

   this._hospitalService.buscarHospital(termino)
          .subscribe( hospitales => this.hospitales = hospitales);
  }

  // ==============================================
  // Guardar Hospital
  // =============================================

  guardarHospital(hospital: Hospital) {

    this._hospitalService.actualizaHospital( hospital )
              .subscribe( () => this.cargarHospitales() );
  }

  // ==============================================
  // Borrar Hospital
  // =============================================

  borrarHospital(hospital: Hospital) {
    swal({
      title: '¿Estas seguro?',
      text: 'Esta a punto de borrar a ' + hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then(borrar => {


      if (borrar) {
        this._hospitalService.borrarHospital( hospital._id)
            .subscribe( borrado => {

              this.cargarHospitales();
          });
      }
    });

  }

  // ==============================================
  // Crear Hospital
  // =============================================
  crearHospital() {

  swal({
      title: 'Crear Hospital',
      text: 'Ingrese hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true,
  }).then((valor: string) => {
  if (!valor || valor.length === 0 ) {
    return;
  }

  this._hospitalService.crearHospital(valor)
            .subscribe( () => this.cargarHospitales() );

});

  }

// ==============================================
// Actualizar Foto
// =============================================

  actualizarImagen(hospital: Hospital) {

  this._modalUploadService.mostrarModal('hospitales', hospital._id);
  }

}
