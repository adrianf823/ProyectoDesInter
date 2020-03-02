import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, delay } from 'rxjs/operators';
import { ProveedorModel } from '../models/proveedor';
@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  private url = 'https://gestion-little.firebaseio.com/';
  user=localStorage.getItem('name');
prov:ProveedorModel;
  constructor( private http: HttpClient ) { }


  crearProveedor( prov: ProveedorModel ) {
    return this.http.post(`${ this.url }/proveedores.json`, prov)
            .pipe(
              map( (resp: any) => {
                prov.id = resp.name;
                return prov;
              })
            );

  }

  actualizarProveedor( prov: ProveedorModel ) {

    const provTemp = {
      ...prov
    };

    delete provTemp.id;

    return this.http.put(`${ this.url }/proveedores/${ prov.id }.json`, provTemp);


  }

  borrarProveedor( id: string ) {

    return this.http.delete(`${ this.url }/proveedores/${ id }.json`);

  }

  getProveedores() {
    return this.http.get(`${ this.url }/proveedores.json`)
            .pipe(
              map( this.crearArreglo ),
              delay(0)
            );
  }

  private crearArreglo( provObj: object ) {

    const provs: ProveedorModel[] = [];
    if(provObj!=null){
    Object.keys( provObj ).forEach( key => {

      const prov: ProveedorModel = provObj[key];
      
      prov.id = key;
      console.log(prov.id)
      provs.push( prov );
    });
  }

    return provs;

  }
}
