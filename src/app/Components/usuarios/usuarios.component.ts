import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormModalAPComponentUser } from 'src/app/Components/form-modal-Usuario/form-modal-ap.component';
import {AuthService} from '../../services/auth.service'
import { Router } from '@angular/router';
import { UsuarioModel } from '../../models/usuario';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
usuariosArray: UsuarioModel[]=[]
usuario:UsuarioModel;
menu:boolean=false;
rolModif:boolean
  constructor(public usuariosServ:UserService, public modalService:NgbModal, public authservice: AuthService,public router:Router) { }

  ngOnInit() {
      this.usuariosServ.getUsuarios().subscribe(resp => {
        this.usuariosArray=resp;
        console.log("ojo")
        this.obtenerUsuario()
        console.log(this.usuario.roles)
      })
      if(localStorage.getItem("logeado")=="1"){
        localStorage.setItem("logeado","0");
        location.reload();
      }
    }
    obtenerUsuario(){
      for (var indice in this.usuariosArray){
  
        var nombre = this.usuariosArray[indice].nombre;
    
        console.log(nombre)
        console.log(window.sessionStorage.getItem("AuthUserName"))
        if(nombre == window.sessionStorage.getItem("AuthUserName")){
          
          this.usuario= this.usuariosArray[indice];
          localStorage.setItem("usuario",JSON.stringify(this.usuario))
          console.log(this.usuario)
        }
      }
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
  EliminarUsuario(id){
    this.usuariosServ.deleteUsuario(id).subscribe(res =>{
      this.usuariosServ.getUsuarios().subscribe(resp => {
        this.usuariosArray=resp;
      })
    })
  }
  formUsuario(){
    const modalRef = this.modalService.open(FormModalAPComponentUser);
    modalRef.result.then((result) => {
      this.usuariosServ.getUsuarios().subscribe(resp => {
        this.usuariosArray=resp;
        location.reload()
      })
  })

  }

 

  }


