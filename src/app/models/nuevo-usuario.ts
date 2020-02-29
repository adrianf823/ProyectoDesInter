export class NuevoUsuario {
    nombre: string;
    foto: string;
    fotocomp:String;
    email: string;
    roles: string[];
    password: string;

    constructor(nombre: string, email: string, password: string,foto: string,fotocomp:string) {
        this.nombre = nombre;
        this.foto = foto;
        this.fotocomp=fotocomp;
        this.email = email;
        this.password = password;
        this.roles = ['user'];
    }
}
