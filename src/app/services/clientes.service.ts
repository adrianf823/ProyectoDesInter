import { Injectable } from '@angular/core';
import {ClienteModel} from '../models/cliente'
import { HttpClient } from '@angular/common/http';
import { map, delay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private url = 'https://gestion-little.firebaseio.com/';
  user=localStorage.getItem('name');
cliente:ClienteModel;
  constructor( private http: HttpClient ) { }


  crearCliente( cliente: ClienteModel ) {
    return this.http.post(`${ this.url }/clientes.json`, cliente)
            .pipe(
              map( (resp: any) => {
                cliente.id = resp.name;
                return cliente;
              })
            );

  }

  actualizarCliente( cliente: ClienteModel ) {

    const clienteTemp = {
      ...cliente
    };

    delete clienteTemp.id;

    return this.http.put(`${ this.url }/clientes/${ cliente.id }.json`, clienteTemp);


  }

  borrarCliente( id: string ) {

    return this.http.delete(`${ this.url }/clientes/${ id }.json`);

  }

  getClientes() {
    return this.http.get(`${ this.url }/clientes.json`)
            .pipe(
              map( this.crearArreglo ),
              delay(0)
            );
  }

  private crearArreglo( clientesObj: object ) {

    const clientes: ClienteModel[] = [];
    if(clientesObj!=null){
    Object.keys( clientesObj ).forEach( key => {

      const cliente: ClienteModel = clientesObj[key];
      
      cliente.id = key;
      console.log(cliente.id)
      clientes.push( cliente );
    });
  }

    return clientes;

  }
}
