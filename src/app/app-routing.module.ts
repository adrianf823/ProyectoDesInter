import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegistroComponent } from './Components/registro/registro.component';
import { UsuariosComponent } from './Components/usuarios/usuarios.component';
const routes: Routes = [
  { path: 'login'   , component: LoginComponent },
  { path: 'registro'   , component: RegistroComponent },
  { path: 'usuarios'   , component: UsuariosComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
