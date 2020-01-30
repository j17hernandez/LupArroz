import { Injectable } from '@angular/core';
import { resolve } from 'url';
import { URL_SERVICIOS } from '../../config/config';

@Injectable()
export class SubirArchivoService {


  constructor() { }

  subirArchivo( archivo: File, tipo: string, id: string ) {


    // tslint:disable-next-line: no-shadowed-variable
    return new Promise(  (resolve, reject ) => {

      const formData = new FormData();
      const xhr = new XMLHttpRequest();


      formData.append( 'imagen', archivo, archivo.name);


      xhr.onreadystatechange = () => {

        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('Imagen Subida');
            resolve(JSON.parse(xhr.response) );

          }  else {
            console.log('Fallo la subida');
            reject(xhr.response);
          }
        }
      };

      const url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;
      xhr.open('PUT', url, true);
      xhr.send( formData );


    });

}

}
