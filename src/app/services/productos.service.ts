import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, delay } from 'rxjs/operators';
import { ProductoModel } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private url = 'https://gestion-little.firebaseio.com/';
  user=localStorage.getItem('name');
cliente:ProductoModel;
  constructor( private http: HttpClient ) { }


  crearProducto( cliente: ProductoModel ) {
    return this.http.post(`${ this.url }/productos.json`, cliente)
            .pipe(
              map( (resp: any) => {
                cliente.id = resp.name;
                return cliente;
              })
            );

  }

  actualizarProducto( cliente: ProductoModel ) {

    const clienteTemp = {
      ...cliente
    };

    delete clienteTemp.id;

    return this.http.put(`${ this.url }/productos/${ cliente.id }.json`, clienteTemp);


  }

  borrarProducto( id: string ) {

    return this.http.delete(`${ this.url }/productos/${ id }.json`);

  }

  getProductos() {
    return this.http.get(`${ this.url }/productos.json`)
            .pipe(
              map( this.crearArreglo ),
              delay(0)
            );
  }

  private crearArreglo( clientesObj: object ) {

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

