import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormModalAPComponentProveedor } from '../form-modal-Proveedor/form-modal-ap.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {UsuarioModel} from "../../models/usuario";
import { FormModalAPComponentProducto } from 'src/app/Components/form-modal-Producto/form-modal-ap.component';
import { ProductoModel } from 'src/app/models/producto';
import { ProductosService } from 'src/app/services/productos.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormModalAPComponentUser } from '../form-modal-Usuario/form-modal-ap.component';
 

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})

export class ProductosComponent implements OnInit {

  Usuario:UsuarioModel=JSON.parse(localStorage.getItem("usuario"));
  foto1=localStorage.getItem("foto1")
  foto2=localStorage.getItem("foto2")
  fotoUser;
  menu:boolean=false;
cliente:ProductoModel;
provArray:ProductoModel[]=[]
  constructor(public router:Router,public service:ProductosService, public modalService:NgbModal,private storageRef:AngularFireStorage) { }

  ngOnInit() {
    this.fotoUser=this.foto1+this.foto2
    this.service.getProductos().subscribe(resp=>{
      this.provArray=resp;
    })
  }

  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    this.menu=true;
  }
  
  /* Set the width of the side navigation to 0 */
  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    this.menu=false;
  }
logOut(){
  window.sessionStorage.clear();
  this.router.navigateByUrl("/login")
}
buscarHospital() {
  console.log("joe")
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      } 
  }
}
}

eliminarProveedor( cliente: ProductoModel, i: number ){
  Swal.fire({
    title: `¿Estás seguro? ${ cliente.nombre }`,
    text: 'No podrás volver atrás!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Eliminar',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.value) {
      this.provArray.splice(i, 1);
      this.service.borrarProducto(cliente.id).subscribe()
      this.storageRef.storage.refFromURL(cliente.foto).delete()
      Swal.fire({
        text:'Producto eliminado con exito',
        icon: 'success',
        timer: 2000
      })
    }
    })
    this.service.getProductos()
    .subscribe( resp => {
      this.provArray = resp;
    });
  }

  modificarProveedor(cliente: ProductoModel,i:number){
    const modalRef = this.modalService.open(FormModalAPComponentProducto);
      modalRef.componentInstance.modif = true;
      modalRef.componentInstance.peliculam=cliente
      modalRef.result.then((result) => {
        Swal.fire({
          text:'Producto modificado con exito',
          icon: 'success',
          timer: 2000
        })
        this.service.getProductos()
        .subscribe( resp => {
          this.provArray = resp;
        });
      }).catch((error) => {
        console.log(error);
      });
    }
    anadirProveedor() {
      const modalRef = this.modalService.open(FormModalAPComponentProducto);
      
      modalRef.result.then((result) => {
        Swal.fire({
          text:'Producto añadido con exito',
          icon: 'success',
          timer: 2000
        })
        console.log(result)
        this.service.getProductos()
        .subscribe( resp => {
          this.provArray = resp;
          
        });
      }).catch((error) => {
        console.log(error);
      });
    
    }
 
    formUsuario(){
      const modalRef = this.modalService.open(FormModalAPComponentUser);
      modalRef.result.then((result) => {
        this.router.navigateByUrl("/usuarios")
    })
    }


}