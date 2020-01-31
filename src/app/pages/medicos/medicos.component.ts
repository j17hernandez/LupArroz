import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/service.index';

declare var swal: any;

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {
  desde: number = 0;
  totalMedicos: number = 0;

  medicos: Medico[] = [];
  constructor(
      // tslint:disable-next-line: variable-name
      public _medicoService: MedicoService
  ) { }

  ngOnInit() {

   // this.cargarMedicos();
    this.cargarMedicoPaginacion();
  }







// ==============================================
// Cargar Medicos
// =============================================
  /*    cargarMedicos() {
        this._medicoService.cargarMedicos()
          .subscribe(medicos => this.medicos = medicos);
        }
*/
// ==============================================
// Cargar Medico por páginación
// =============================================
 cargarMedicoPaginacion() {


  this._medicoService.cargarMedicosPaginacion(this.desde)
              .subscribe( (resp: any) => {
              this.totalMedicos = resp.total;
              this.medicos = resp.medicos;

      });

}

// ==============================================
  //  Cambiar valor de Paginación
  // =============================================
  cambiarDesde(valor: number) {
    const desde = this.desde + valor;

    if (desde >= this.totalMedicos) {
      return;
  }

    if (desde < 0 ) {
       return;
        }

    this.desde += valor;
    this.cargarMedicoPaginacion();
  }


// ==============================================
// Buscar Medicos
// =============================================

        buscarMedico(termino: string) {


          if (termino.length <= 0) {
            this.cargarMedicoPaginacion();
            return;
          }


          this._medicoService.buscarMedicos(termino)
                  .subscribe(medicos => this.medicos = medicos );
        }
// ==============================================
// Borrar Medico
// =============================================
        borrarMedico(medico: Medico) {
          swal({
            title: '¿Estas seguro?',
            text: 'Esta a punto de borrar a ' + medico.nombre,
            icon: 'warning',
            buttons: true,
            dangerMode: true,
          })
          .then(borrar => {


            if (borrar) {
              this._medicoService.borrarMedico(medico._id)
                  .subscribe( () =>  this.cargarMedicoPaginacion() );
            }
          });
         }

}
