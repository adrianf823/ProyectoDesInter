export class NuevoUsuario {
    nombre: string;
    foto: string;
    email: string;
    roles: string[];
    password: string;

    constructor(nombre: string, email: string, password: string,foto: string) {
        this.nombre = nombre;
        this.foto = foto;
        this.email = email;
        this.password = password;
        this.roles = ['user'];
    }
}
