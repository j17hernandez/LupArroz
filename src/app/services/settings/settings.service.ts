import { Injectable,  Inject} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  // crear un objeto   ajustes: Ajustes = { temaUrl: 'assets/css/colors/default.css', tema: 'default' };

  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  };


  // tslint:disable-next-line: variable-name
  constructor(@Inject(DOCUMENT) private  _document, ) {
    this.cargarAjustes();
   }

  guardarAjustes() {
// Convertir un objeto en String se utiliza, JSON.stringify( this.ajustes );
// para Guardar ajustes se hace con localStorage.setItem y le agregamos el nombre del objeto ajustes
//   localStorage.setItem('ajustes', JSON.stringify( this.ajustes ) );

  //  console.log('Guardado en el localStorage');
    localStorage.setItem('ajustes', JSON.stringify( this.ajustes ) );
  }

// recorvertir un string en objeto de nuevo JSON.parse( localStorage.getItem('ajustes'));

  cargarAjustes() {

    if ( localStorage.getItem('ajustes') ) {
      this.ajustes = JSON.parse( localStorage.getItem('ajustes'));
    //  console.log('Cargando del localstorage');
      this.aplicarTema( this.ajustes.tema);
    } else {
    //  console.log('Usando valores por defecto');
      this.aplicarTema( this.ajustes.tema);
    }
  }

  aplicarTema( tema: string) {

    const url: string = `assets/css/colors/${ tema }.css`;
    this._document.getElementById('tema').setAttribute('href', url );
    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;

    this.guardarAjustes();



  }

}

interface Ajustes {
  temaUrl: string;
  tema: string;
}
