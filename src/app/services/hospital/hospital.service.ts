import swal from 'sweetalert';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Hospital } from '../../models/hospital.model';

@Injectable()
export class HospitalService {
  totalHospitales: number = 0;

  constructor(
    public http: HttpClient,
    // tslint:disable-next-line: variable-name
    public _usuarioService: UsuarioService
  ) { }


// ==============================================
// Cargar los Hospitales
// =============================================

cargarHospitales() {
  // tslint:disable-next-line: no-shadowed-variable
  const url = URL_SERVICIOS + '/hospital';
  return this.http.get(url)
          .map((resp: any) => {
          this.totalHospitales = resp.total;
          return resp.hospitales;

          });
}


// ==============================================
// Paginación
// =============================================


cargarHospitalPaginacion(desde: number = 0) {
  // tslint:disable-next-line: no-shadowed-variable
  const url = URL_SERVICIOS + '/hospital?desde=' + desde;
  return this.http.get(url);
          //  .map((resp: any) => {
          //  this.totalHospitales = resp.total;
         //   return resp.hospitales;

        //    });
}


// ==============================================
// Obtener Hospitales
// =============================================
    obtenerHospital(id: string) {
  // tslint:disable-next-line: no-shadowed-variable
  const url = URL_SERVICIOS + '/hospital/' + id;
  return this.http.get(url)
        .map((resp: any) => resp.hospital);

}

// ==============================================
// Borrar Hospitales
// =============================================
  borrarHospital(id: string) {
  // tslint:disable-next-line: no-shadowed-variable
  let url = URL_SERVICIOS + '/hospital/' + id;
  url += '?token=' + this._usuarioService.token;

  return this.http.delete(url)
        .map( resp => swal('El Hospital ', 'Fue eliminado Correctamente', 'success') );
}

// ==============================================
// Crear Hospital
// =============================================
  crearHospital(nombre: string) {

  // tslint:disable-next-line: no-shadowed-variable
  let url = URL_SERVICIOS + '/hospital/';
  url += '?token=' + this._usuarioService.token;

  return this.http.post(url, {nombre})
      .map((resp: any) => resp.hospital);
  }

  // ==============================================
  // Buscar Hospital
  // =============================================

    buscarHospital( termino: string) {

      // tslint:disable-next-line: no-shadowed-variable
      const url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
      return this.http.get(url)
          .map((resp: any) => resp.hospitales  );
    }

    // ==============================================
    // Actualizar Hospital
    // =============================================

    actualizaHospital(hospital: Hospital) {

      let url = URL_SERVICIOS + '/hospital/' + hospital._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put(url, hospital)
            .map((resp: any) => {
            swal('Hospital Actualizado', hospital.nombre, 'success');
            return resp.hospital;
    });

    }

}
