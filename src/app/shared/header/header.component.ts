import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [`

    .text-lg-right {
        color: #ffffff;
    }
  `]
})
export class HeaderComponent implements OnInit {
  fecha: string = new Date().toDateString();
  usuario: Usuario;

  constructor(
    // tslint:disable-next-line: variable-name
     public _usuarioService: UsuarioService,
     public router: Router
     ) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
  }

buscar(termino: string) {

  this.router.navigate(['/busqueda', termino]);

}


}
