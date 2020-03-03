import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegistroComponent } from './Components/registro/registro.component';
import { UsuariosComponent } from './Components/usuarios/usuarios.component';
import { AuthGuard} from './Components/guards/auth.guard'
import {ClientesComponent} from './Components/clientes/clientes.component'
import {ProveedoresComponent} from './Components/proveedores/proveedores.component'
import {ProductosComponent} from './Components/productos/productos.component'
import {PresupuestosComponent} from './Components/presupuestos/presupuestos.component'
import { FormpresupuestoComponent } from './Components/form-presupuesto/formpresupuesto.component';
const routes: Routes = [
  { path: 'login'   , component: LoginComponent },
  { path: 'registro'   , component: RegistroComponent },
  { path: 'usuarios'   , component: UsuariosComponent , canActivate: [ AuthGuard ]},
  { path: 'clientes'   , component: ClientesComponent , canActivate: [ AuthGuard ]},
  { path: 'proveedores'   , component: ProveedoresComponent , canActivate: [ AuthGuard ]},
  { path: 'productos'   , component: ProductosComponent , canActivate: [ AuthGuard ]},
  { path: 'presupuestos'   , component: PresupuestosComponent , canActivate: [ AuthGuard ]},
  { path: 'formpresupuestos/:id'   , component: FormpresupuestoComponent , canActivate: [ AuthGuard ]},
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
