import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, delay } from 'rxjs/operators';
import { PresupuestoModel } from '../models/presupuesto';
import { ProductoModel } from '../models/producto';
@Injectable({
  providedIn: 'root'
})
export class PresupuestosService {

  private url = 'https://gestion-little.firebaseio.com/';
  user=localStorage.getItem('name');
cliente:PresupuestoModel;
  constructor( private http: HttpClient ) { }


  crearPresupuesto( cliente: PresupuestoModel ) {
    return this.http.post(`${ this.url }/presupuestos.json`, cliente)
            .pipe(
              map( (resp: any) => {
                cliente.id = resp.name;
                return cliente;
              })
            );

  }
  getPresupuesto( id: string ) {

    return this.http.get<PresupuestoModel>(`${ this.url }/presupuestos/${ id }.json`);

  }
  anadirProducto( cliente: ProductoModel,id ) {
    return this.http.post(`${ this.url }/presupuesto${id}.json`, cliente)
            .pipe(
              map( (resp: any) => {
                cliente.id = resp.name;
                return cliente;
              })
            );

  }

  actualizarPresupuesto( cliente: PresupuestoModel ) {

    const clienteTemp = {
      ...cliente
    };

    delete clienteTemp.id;

    return this.http.put(`${ this.url }/presupuestos/${ cliente.id }.json`, clienteTemp);


  }

  borrarPresupuesto( id: string ) {

    return this.http.delete(`${ this.url }/presupuestos/${ id }.json`);

  }

  borrarProducto( idpres: string,idprod:string ) {

    return this.http.delete(`${ this.url }/presupuesto${ idpres }/${ idprod }.json`);

  }

  getPresupuestos() {
    return this.http.get(`${ this.url }/presupuestos.json`)
            .pipe(
              map( this.crearArreglo ),
              delay(0)
            );
  }
  getProductos(id:string) {
    return this.http.get(`${ this.url }/presupuesto${id}.json`)
            .pipe(
              map( this.crearArreglo2 ),
              delay(0)
            );
  }
  actProductos( cliente: ProductoModel,id ) {

    const clienteTemp = {
      ...cliente
    };

    delete clienteTemp.id;

    return this.http.put(`${ this.url }/presupuesto${id}/${ cliente.id }.json`, clienteTemp);
  }

  private crearArreglo( clientesObj: object ) {

    const clientes: PresupuestoModel[] = [];
    if(clientesObj!=null){
    Object.keys( clientesObj ).forEach( key => {

      const cliente: PresupuestoModel = clientesObj[key];
      
      cliente.id = key;
      console.log(cliente.id)
      clientes.push( cliente );
    });
  }

    return clientes;

  }

  private crearArreglo2( clientesObj: object ) {

    const clientes: ProductoModel[] = [];
    if(clientesObj!=null){
    Object.keys( clientesObj ).forEach( key => {

      const cliente: ProductoModel = clientesObj[key];
      
      cliente.id = key;
      console.log(cliente.id)
      clientes.push( cliente );
    });
  }

    return clientes;

  }
}
