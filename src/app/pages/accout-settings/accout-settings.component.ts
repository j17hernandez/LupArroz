import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-accout-settings',
  templateUrl: './accout-settings.component.html',
  styles: []
})
export class AccoutSettingsComponent implements OnInit {

  // tslint:disable-next-line: variable-name
  constructor(@Inject(DOCUMENT) private  _document ) { }

  ngOnInit() {
  }

  cambiaColor( tema: string) {
    console.log(tema);


    let url = `assets/css/colors/${ tema }.css`;
    this._document.getElementById('tema').setAttribute('href', url );

  }
}
