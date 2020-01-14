import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

 @Input('nombre') Leyenda: string = 'Leyenda';
 @Input() progreso: number = 5;
 @Output('actualizaValor')  cambioValor: EventEmitter<number> = new EventEmitter ();

  constructor() {
 //     console.log('Leyenda', this.Leyenda);
//  console.log('progreso', this.progreso);
   }

  ngOnInit() {
 console.log('progreso', this.progreso);
 //  console.log('Leyenda', this.Leyenda);
  }

  onChanges( newValue: number) {
 const elemHTML: any = document.getElementsByName('progreso')[0];
 console.log( elemHTML.value );
 if ( newValue >= 100 ) {
      this.progreso = 100;
    } else if (newValue <= 0 ) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;

    }
 elemHTML.value = ( this.progreso );
 this.cambioValor.emit( this.progreso );
  }

  cambiarValor(valor: number) {
    if (this.progreso >= 100 && valor > 0 ) {
      this.progreso = 100;
      return;
    }
    if (this.progreso <= 0 && valor < 0) {
      this.progreso = 0;
      return;
    }


    this.progreso = this.progreso + valor;
    this.cambioValor.emit( this.progreso );
  }

}
