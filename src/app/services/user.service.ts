import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario';

const cabecera = {headers: new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer '+window.sessionStorage.getItem("AuthToken")})};
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private authURL = 'http://localhost:8080/api/Usuarios/';
token = window.sessionStorage.getItem("AuthToken")
  constructor(private http: HttpClient) { }

  getUsuarios() {
    return this.http.get<[]>(this.authURL+'lista',cabecera);
  }
  putUsuario(id,usuarios: UsuarioModel) {
    const usuarioTemp = {
      ...usuarios
    };

    delete usuarioTemp.id;
    return this.http.put(this.authURL + `actualizar/${id}`, usuarioTemp,cabecera);
  }
  deleteUsuario(id: string) {
    return this.http.delete(this.authURL + `borrar/${id}`,cabecera);
  }
}
