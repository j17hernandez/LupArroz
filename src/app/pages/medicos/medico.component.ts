import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { MedicoService } from '../../services/medico/medico.service';
import { HospitalService } from '../../services/service.index';
import { Medico } from '../../models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');
  constructor(
      // tslint:disable-next-line: variable-name
      public _medicoService: MedicoService,
      // tslint:disable-next-line: variable-name
      public _hospitalServices: HospitalService,
      public router: Router,
      public activatedRoute: ActivatedRoute,
        // tslint:disable-next-line: variable-name
      public _modalUploadService: ModalUploadService
  ) {

    activatedRoute.params.subscribe( params => {

      let id = params['id'];
      if (id !== 'nuevo') {

        this.cargarMedico( id );
      }
    });
  }

  ngOnInit() {

    this._hospitalServices.cargarHospitales()
        .subscribe( hospitales => this.hospitales = hospitales);

    this._modalUploadService.notificacion
       .subscribe(resp => {
         this.medico.img = resp.medico.img;

       });

      }

  // ==============================================
  // Cargar Medico
  // =============================================

  cargarMedico(id: string) {
    this._medicoService.cargarMedico(id)
        .subscribe (medico => {
          console.log( medico );
          this.medico = medico;
          this.medico.hospital = medico.hospital._id;
          this.cambioHospital(this.medico.hospital);
        });

  }



  // ==============================================
  // Guardar Medico
  // =============================================
  guardarMedico(f: NgForm) {
    console.log( f.valid );
    console.log( f.value );

    if (f.invalid) {
    return;
  }

    this._medicoService.guardarMedico(this.medico)
            .subscribe(medico => {
            this.medico._id = medico._id;
            this.router.navigate(['/medico', medico._id]);
            });
  }
// ==============================================
// Cambio Hospital
// =============================================
  cambioHospital(id: string) {

      this._hospitalServices.obtenerHospital(id)
          .subscribe(hospital =>   this.hospital = hospital);

  }

  // ==============================================
  // Cambiar Fotografía
  // =============================================

    cambiarFoto() {
      this._modalUploadService.mostrarModal('medicos', this.medico._id);

    }


}
