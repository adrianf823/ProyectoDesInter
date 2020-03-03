import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox'
import { AngularFireModule } from "@angular/fire";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireDatabaseModule, AngularFireDatabase } from "@angular/fire/database";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import { environment } from "../environments/environment";
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import { RegistroComponent } from './Components/registro/registro.component';
import { UsuariosComponent } from './Components/usuarios/usuarios.component';
import { FormModalAPComponentUser } from './Components/form-modal-Usuario/form-modal-ap.component';
import { FormModalAPComponentCliente } from './Components/form-modal-Cliente/form-modal-ap.component';
import { FormModalAPComponentProveedor } from './Components/form-modal-Proveedor/form-modal-ap.component';
import { FormModalAPComponentProducto } from './Components/form-modal-Producto/form-modal-ap.component';
import { ClientesComponent } from './Components/clientes/clientes.component';
import { ProveedoresComponent } from './Components/proveedores/proveedores.component';
import { ProductosComponent } from './Components/productos/productos.component';
import { PresupuestosComponent } from './Components/presupuestos/presupuestos.component';
import { FormpresupuestoComponent } from './Components/form-presupuesto/formpresupuesto.component';
import { FormModalAPComponentPresupProduct } from './Components/form-modal-PresupProduct/form-modal-ap.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    UsuariosComponent,
    FormModalAPComponentUser,
    FormModalAPComponentCliente,
    FormModalAPComponentProveedor,
    FormModalAPComponentProducto,
    FormModalAPComponentPresupProduct,
    ClientesComponent,
    ProveedoresComponent,
    ProductosComponent,
    PresupuestosComponent,
    FormpresupuestoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    MatTableModule,
    MatCheckboxModule,
    NgbModule,
    NgxPaginationModule,
    MatButtonToggleModule,
    MatButtonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    FormModalAPComponentUser,
    FormModalAPComponentCliente,
    FormModalAPComponentProveedor,
    FormModalAPComponentProducto,
    FormModalAPComponentPresupProduct
  ]
})
export class AppModule { }
