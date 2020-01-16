import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-accout-settings',
  templateUrl: './accout-settings.component.html',
  styles: []
})
export class AccoutSettingsComponent implements OnInit {
// Con esto (@Inject(DOCUMENT) private  _document ) { }} podemos inyectar una parte del documento, para porteriormente
// Aplicar un cambio, el ejemplo que vamos hacer es, aplicar y remover una clase

  // tslint:disable-next-line: variable-name
  constructor( public _ajustes: SettingsService) { }

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColor( tema: string, link: any) {
  this.aplicarCheck( link);
  this._ajustes.aplicarTema( tema);


  }
  //////////////////////////////////////////////////
aplicarCheck( link: any ) {

  const selectores: any = document.getElementsByClassName('selector');
  for ( const ref of selectores ) {
    ref.classList.remove('working'); { }
  }
  link.classList.add('working');
}

colocarCheck() {
  const selectores: any = document.getElementsByClassName('selector');
  const tema = this._ajustes.ajustes.tema;

  for ( const ref of selectores ) {
  if ( ref.getAttribute('data-theme') === tema ) {
    ref.classList.add('working');
    break;
  }
  }
}

}
