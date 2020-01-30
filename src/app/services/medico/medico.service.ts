import swal from 'sweetalert';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from 'src/app/models/medico.model';

@Injectable()
export class MedicoService {
  totalMedicos: number = 0;


  constructor(
    public http: HttpClient,
    // tslint:disable-next-line: variable-name
    public _usuarioService: UsuarioService
  ) { }

  // ==============================================
  // Cargar Medicos
  // =============================================
 /* cargarMedicos() {
    let url = URL_SERVICIOS + '/medico';
    return this.http.get(url)
          .map((resp: any) => {
        this.totalMedicos = resp.total;
        return resp.medicos;
        });
  }

 */
  cargarMedicosPaginacion(desde: number = 0) {
    let url = URL_SERVICIOS + '/medico?desde=' + desde;
    return this.http.get(url);
  }



   // ==============================================
      // Cargar Medico
      // =============================================

      cargarMedico(id: string) {

        let url = URL_SERVICIOS + '/medico/' + id;
        return this.http.get(url)
          .map( (resp: any) => resp.medico);
      }


// ==============================================
// Buscar Medicos
// =============================================
  buscarMedicos( termino: string ) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    return this.http.get( url )
                .map( (resp: any) => resp.medicos );

  }

// ==============================================
// Borrar Medicos
// =============================================
  borrarMedico(id: string) {
    let url = URL_SERVICIOS + '/medico/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete(url)
          .map(resp => {
          swal('Médico Eliminado', 'El medico fue borrado correctamente', 'success');
          return resp;
            });
  }

  // ==============================================
  // Guardar Medico
  // =============================================

    guardarMedico(medico: Medico) {

      let url = URL_SERVICIOS + '/medico';

      if (medico._id) {
        // ACtualizando
        url += '/' + medico._id;
        url += '?token=' + this._usuarioService.token;
        return this.http.put(url, medico)
                .map((resp: any) => {

        swal('Médico Actualizado', medico.nombre, 'success');
        return resp.medico;
                });

      } else {
        // Creando Usuario

      url += '?token=' + this._usuarioService.token;
      return this.http.post(url, medico)
      .map( (resp: any ) => {

        swal('Médico Creado', medico.nombre, 'success');

        return resp.medico;
      });
      }




    }


}
