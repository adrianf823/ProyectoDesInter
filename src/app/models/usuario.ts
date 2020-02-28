export class UsuarioModel {
    id?: string;
    nombre: string;
    email: string;
    password?: string;
    foto: string;
    roles?;
    admin?:boolean=true;
}
