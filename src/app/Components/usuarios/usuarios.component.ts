import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormModalAPComponentUser } from 'src/app/Components/form-modal-Usuario/form-modal-ap.component';
import {AuthService} from '../../services/auth.service'
import { Router } from '@angular/router';
import { UsuarioModel } from '../../models/usuario';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { error } from 'util';
import Swal from 'sweetalert2'
const cabecera = {headers: new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer '+window.sessionStorage.getItem("AuthToken")})};
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  base64Data: any;
  retrieveResonse: any;
usuariosArray: UsuarioModel[]=[]
usuario:UsuarioModel;
menu:boolean=false;
rolModif:boolean
  constructor(public usuariosServ:UserService, public modalService:NgbModal, public authservice: AuthService,public router:Router,public http:HttpClient) { }

  ngOnInit() {
      this.usuariosServ.getUsuarios().subscribe(resp => {
        this.usuariosArray=resp;
        this.obtenerImagenes().subscribe(resp=>{
          this.obtenerUsuario()
        })
        console.log("ojo")
        console.log(this.usuario.roles)
      },error=>this.logOut())
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
          console.log(this.usuariosArray[indice])
          setTimeout(() => {
            var fotolenght = this.usuario.fotocomp.length;
          var mitadfoto = fotolenght/2;
          var foto1 = this.usuario.fotocomp.substr(0,mitadfoto);
          var foto2 = this.usuario.fotocomp.substr(mitadfoto,fotolenght);
          console.log(foto1)
          localStorage.setItem("foto1",foto1)
          localStorage.setItem("foto2",foto2)
          }, 200);
          
          console.log(this.usuariosArray[indice])
          localStorage.setItem("usuario",JSON.stringify(this.usuario))
          console.log(this.usuario)
          console.log("aaaaaaaaaa")
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
    Swal.fire({
      title: `¿Estás seguro?`,
      text: 'No podrás volver atrás!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
    this.usuariosServ.deleteUsuario(id).subscribe(res =>{
      this.usuariosServ.getUsuarios().subscribe(resp => {
        this.usuariosArray=resp;
        Swal.fire({
          text:'Usuario eliminado con exito',
          icon: 'success',
          timer: 2000
        }).then((r)=>{
          location.reload()
        })
      })
    })
  }
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
    //Gets called when the user clicks on retieve image button to get the image from back end
    getImage(user:UsuarioModel) {
      //Make a call to Sprinf Boot to get the Image Bytes.
      this.http.get('http://localhost:8080/image/get/' + user.foto,cabecera)
        .subscribe(
          res => {
            this.retrieveResonse = res;
            this.base64Data = this.retrieveResonse.picByte;
            user.fotocomp = 'data:image/jpeg;base64,' + this.base64Data;
          }
        );
    }
obtenerImagenes():Observable<any>{
  var odiosmio;
    this.usuariosArray.forEach(element => {
      this.getImage(element)
      odiosmio=this.usuariosServ.getUsuarios()
    });
    return odiosmio;
  }
  }


