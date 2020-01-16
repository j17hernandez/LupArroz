import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-accout-settings',
  templateUrl: './accout-settings.component.html',
  styles: []
})
export class AccoutSettingsComponent implements OnInit {
// Con esto (@Inject(DOCUMENT) private  _document ) { }} podemos inyectar una parte del documento, para porteriormente
// Aplicar un cambio, el ejemplo que vamos hacer es, aplicar y remover una clase
  // tslint:disable-next-line: variable-name
  constructor(@Inject(DOCUMENT) private  _document ) { }

  ngOnInit() {
  }

  cambiarColor( tema: string, link: any) {
  this.aplicarCheck( link);

  const url: string = `assets/css/colors/${ tema }.css`;
  this._document.getElementById('tema').setAttribute('href', url );
  }
  //////////////////////////////////////////////////
aplicarCheck( link: any ) {

  const selectores: any = document.getElementsByClassName('selector');
  for ( const ref of selectores ) {
    ref.classList.remove('working'); { }
  }
  link.classList.add('working');
}

}
