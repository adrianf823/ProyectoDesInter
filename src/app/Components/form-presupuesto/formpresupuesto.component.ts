import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { FormModalAPComponentPresupProduct } from '../form-modal-PresupProduct/form-modal-ap.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {UsuarioModel} from "../../models/usuario";
import { ProductoModel } from 'src/app/models/producto';
import { ProductosService } from 'src/app/services/productos.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormModalAPComponentUser } from '../form-modal-Usuario/form-modal-ap.component';
import { PresupuestosService } from 'src/app/services/presupuestos.service';
import { PresupuestoModel } from 'src/app/models/presupuesto';
import { ClienteModel } from 'src/app/models/cliente';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-formpresupuesto',
  templateUrl: './formpresupuesto.component.html',
  styleUrls: ['./formpresupuesto.component.scss']
})
export class FormpresupuestoComponent implements OnInit {

  id=this.route.snapshot.paramMap.get("id")
  cambioPrecio;
  presup:PresupuestoModel;
  cambioCantidad;
  nombrePresup;
  clientee;
  clientesArray:ClienteModel[]=[]
  prodArray:ProductoModel[]=[]
  Usuario:UsuarioModel=JSON.parse(localStorage.getItem("usuario"));
  foto1=localStorage.getItem("foto1")
  foto2=localStorage.getItem("foto2")
  fotoUser;
  menu:boolean=false;
cliente:ProductoModel;
provArray:ProductoModel[]=[]
subtotal=0;
total=0;
  constructor(public router:Router,public service:PresupuestosService, public modalService:NgbModal,private storageRef:AngularFireStorage, public route:ActivatedRoute, public serv:ClientesService) { }

  ngOnInit() {
    localStorage.setItem("idPresup",this.route.snapshot.paramMap.get("id"))
    this.fotoUser=this.foto1+this.foto2
    this.service.getPresupuesto(this.id).subscribe(resp=>{
      this.presup=resp;
      this.clientee=this.presup.cliente
      this.nombrePresup=resp.nombre
      setTimeout(() => {
        if(this.presup.cliente==null || this.presup.cliente==undefined){
          console.log(this.clientesArray[0])
          this.clientee=this.clientesArray[0].nombre
          this.actualizarPresupuesto()
          }
      }, 500);
     
    })
    this.serv.getClientes().subscribe(resp=>{
      this.clientesArray=resp
    })
    this.service.getProductos(this.id).subscribe(resp=>{
      this.provArray=resp;
      this.calcularSubytotal()
      this.actualizarPresupuesto()
    })
  }

  updateList(id: number, property: string, event: any) {
    const editField = event.target.value
    console.log(this.provArray[id][property])
    this.provArray[id][property] = editField;
    this.provArray.forEach(element => {
      console.log("asssa"+element.precio)

      this.service.actProductos(element,this.id).subscribe(resp=>{
        console.log(resp)
        this.service.getProductos(this.id).subscribe(resp=>{
          console.log(resp)
          this.provArray=resp
          this.actualizarPresupuesto()
      this.calcularSubytotal()
        })
      })
    });
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
      this.service.borrarProducto(this.id,cliente.id).subscribe(resp=>{
        this.provArray.splice(i, 1);
        Swal.fire({
          text:'Producto eliminado con exito',
          icon: 'success',
          timer: 2000
        })
        this.service.getProductos(this.id)
      .subscribe( resp => {
        this.provArray = resp;
        console.log(resp)
        this.calcularSubytotal()
        this.actualizarPresupuesto()
      });
      })  
    }
    })
  }

    anadirProd() {
      const modalRef = this.modalService.open(FormModalAPComponentPresupProduct);
      
      modalRef.result.then((result) => {
        Swal.fire({
          text:'Producto añadido con exito',
          icon: 'success',
          timer: 2000
        })
        console.log(result)
        this.service.getProductos(this.id)
        .subscribe( resp => {
          this.provArray = resp;
          this.calcularSubytotal()
          this.actualizarPresupuesto()
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

    calcularSubytotal(){
      this.subtotal=0
      this.total=0
      this.provArray.forEach(element => {
        console.log("ppp")
        this.subtotal=this.subtotal+element.precio*element.cantidad
        var iva=(this.subtotal*21)/100
        this.total=this.subtotal+iva
      })
    }

    actualizarPresupuesto(){
      console.log(this.clientee)
      var presup:PresupuestoModel={
        id:this.id,
        nombre:this.nombrePresup,
        cliente:this.clientee,
        subtotal:this.subtotal,
        total:this.total
      }
      this.service.actualizarPresupuesto(presup).subscribe()
    }
    cambiarCliente(e){
      this.clientee=e.target.value;
      this.actualizarPresupuesto()
    }
    ngOnDestroy(): void {
      //Called once, before the instance is destroyed.
      //Add 'implements OnDestroy' to the class.
      this.actualizarPresupuesto()
    }
}
