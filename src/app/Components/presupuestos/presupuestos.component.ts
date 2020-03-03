import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {UsuarioModel} from "../../models/usuario";
import { FormModalAPComponentUser } from 'src/app/Components/form-modal-Usuario/form-modal-ap.component';
import { PresupuestoModel } from 'src/app/models/presupuesto';
import { PresupuestosService } from 'src/app/services/presupuestos.service';
@Component({
  selector: 'app-presupuestos',
  templateUrl: './presupuestos.component.html',
  styleUrls: ['./presupuestos.component.scss']
})
export class PresupuestosComponent implements OnInit {

  Usuario:UsuarioModel=JSON.parse(localStorage.getItem("usuario"));
  foto1=localStorage.getItem("foto1")
  foto2=localStorage.getItem("foto2")
  fotoUser;
  menu:boolean=false;
cliente:PresupuestoModel;
clientesArray:PresupuestoModel[]=[]
  constructor(public router:Router,public service:PresupuestosService, public modalService:NgbModal) { }

  ngOnInit() {
    this.fotoUser=this.foto1+this.foto2
    this.service.getPresupuestos().subscribe(resp=>{
      this.clientesArray=resp;
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
    td = tr[i].getElementsByTagName("td")[0];
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

eliminarCliente( cliente: PresupuestoModel, i: number ){
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
      this.clientesArray.splice(i, 1);
      this.service.borrarPresupuesto(cliente.id).subscribe()
      //this.storageRef.storage.refFromURL(pelicula.portada).delete()
      Swal.fire({
        text:'Presupuesto eliminado con exito',
        icon: 'success',
        timer: 2000
      })
    }
    })
    this.service.getPresupuestos()
    .subscribe( resp => {
      this.clientesArray = resp;
    });
  }

  modificarCliente(cliente: PresupuestoModel,i:number){
        this.router.navigateByUrl(`formpresupuestos/${cliente.id}`)
    }
    anadirCliente() {
      var presup:PresupuestoModel={
nombre:''
      }
      this.service.crearPresupuesto(presup).subscribe(resp=>{
        this.router.navigateByUrl(`formpresupuestos/${resp.id}`)
      })
      
      
      
        /*Swal.fire({
          text:'Presupuesto añadido con exito',
          icon: 'success',
          timer: 2000
        })
        this.service.getPresupuestos()
        .subscribe( resp => {
          this.clientesArray = resp;
          
        });

    */
    }
 
    formUsuario(){
      const modalRef = this.modalService.open(FormModalAPComponentUser);
      modalRef.result.then((result) => {
        this.router.navigateByUrl("/usuarios")
    })
    }

    updateList(id: number, property: string, event: any) {
      const editField = event.target.textContent;
      this.clientesArray[id][property] = editField;
    }

}
