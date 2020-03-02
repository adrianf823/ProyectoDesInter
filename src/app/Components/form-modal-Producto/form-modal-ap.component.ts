import { Component, Output, EventEmitter, Input,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from "rxjs/operators";
import Swal from 'sweetalert2';
import { ProductosService } from 'src/app/services/productos.service';
import { UsuarioModel } from 'src/app/models/usuario';
import { ProductoModel } from '../../models/producto';
import { ProveedorModel } from 'src/app/models/proveedor';
import { ProveedoresService } from 'src/app/services/proveedores.service';
@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal-ap.component.html'
})
export class FormModalAPComponentProducto {
  Usuario:UsuarioModel=JSON.parse(localStorage.getItem("usuario"));
  @Input() public modif=false; 
  @Input() public peliculam: ProductoModel;
  provArray:ProveedorModel[]=[]
  myForm: FormGroup;
  filePath;
  pelicula: ProductoModel = new ProductoModel();
  Imgsrc='../../../assets/image-placeholder.jpg';
  Imgpreview:any = null;
  isSubmitted:boolean=false;
  provbn:boolean=false
  constructor(
   public activeModal: NgbActiveModal,
   private formBuilder: FormBuilder,
   private storage: AngularFireStorage,
   private service: ProductosService,
  public servicep:ProveedoresService
  ) {
    this.createForm();
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  this.servicep.getProveedores().subscribe(resp=>{
    this.provArray=resp;
  })
    console.log(this.modif)
    if(this.modif==true){
      this.idm.setValue(this.peliculam.id, {
        onlySelf: true
      })
    this.port.setValue(this.peliculam.foto, {
      onlySelf: true
    })
    setTimeout(() => {
      this.prov.setValue(this.peliculam.proveedor, {
        onlySelf: true
      })
    }, 500);
    
    if(this.peliculam.foto!=null){
    this.Imgsrc=this.peliculam.foto
    }
    console.log(this.port)
    this.titul.setValue(this.peliculam.nombre, {
      onlySelf: true
    })
    this.descrip.setValue(this.peliculam.precio, {
      onlySelf: true
    })
  }
  }
  private createForm() {
    this.myForm = this.formBuilder.group({
      id:'',
      nombre:['', [Validators.required]],
      foto:'', 
      precio:['', [Validators.required]],
      proveedor:''
    });
  }
  submitForm(formValue) {
    
    this.isSubmitted=true
    if(this.modif){
      this.provbn=true;
    }
    console.log(formValue.proveedor)
    if(formValue.proveedor=="Elije un proveedor" || this.peliculam.proveedor=="Elije un proveedor"){
      this.provbn=false;
      console.log("oushet")
    }else{
      this.provbn=true;
    }
if(this.myForm.valid && this.provbn){
  console.log("aaaa")
  console.log(this.Imgpreview)
  if(this.Imgpreview==null && this.modif == false){
    Swal.fire({
      text:'Tienes que añadir una foto',
      icon: 'warning'
    })
  }else{
    if(this.modif==false){
      Swal.fire({
        title: 'Espere',
        text: 'Subiendo producto...',
        icon: 'info',
        allowOutsideClick: false
      });
      Swal.showLoading();
    this.filePath = `${this.Usuario.nombre}/${this.Imgpreview.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(this.filePath);
    this.storage.upload(this.filePath, this.Imgpreview).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          formValue['foto'] = url;
          this.pelicula=formValue;
  this.service.crearProducto(this.pelicula).subscribe( resp => {
            this.resetForm();
            this.activeModal.close(this.myForm.value);
          })
  
        })
      })
    ).subscribe();
  }else{
    
    Swal.fire({
      title: 'Espere',
      text: 'Actualizando producto...',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();
    if(this.Imgpreview==null){
      console.log(this.peliculam)
      if(formValue.proveedor=="" ||formValue.proveedor==null ||formValue.proveedor==undefined)
      {var pp:ProductoModel={
        id:formValue.id,
        nombre:formValue.nombre,
        foto:formValue.foto,
        precio:formValue.precio,
        proveedor:this.peliculam.proveedor
      }
      this.service.actualizarProducto(pp).subscribe( resp => {
        this.resetForm();
        this.modif=false;
        this.activeModal.close(this.myForm.value);
      })
    }else
      {this.service.actualizarProducto(this.myForm.value).subscribe( resp => {
        this.resetForm();
        this.modif=false;
        this.provbn=false;
        this.activeModal.close(this.myForm.value);
      })
    }
    }else{
    this.filePath = `${this.Usuario.nombre}/${this.Imgpreview.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(this.filePath);
    this.storage.upload(this.filePath, this.Imgpreview).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          formValue['foto'] = url;
          if(formValue.proveedor=="" ||formValue.proveedor==null ||formValue.proveedor==undefined)
      {var pp:ProductoModel={
        id:formValue.id,
        nombre:formValue.nombre,
        foto:formValue.foto,
        precio:formValue.precio,
        proveedor:this.peliculam.proveedor
      }
      this.service.actualizarProducto(pp).subscribe( resp => {
        this.resetForm();
        this.modif=false;
        this.provbn=false;
        this.activeModal.close(this.myForm.value);
      })
    }else
      {this.service.actualizarProducto(this.myForm.value).subscribe( resp => {
        this.resetForm();
        this.modif=false;
        this.activeModal.close(this.myForm.value);
      })
    }
          this.service.actualizarProducto(this.myForm.value).subscribe( resp => {
            this.resetForm();
            this.modif=false;
            this.activeModal.close(this.myForm.value);
          })
  
        })
      })
    ).subscribe();
    }
  }
}
}else{
    
}
  }
  get port() {
    return this.myForm.get('foto');
  }
  get prov() {
    return this.myForm.get('proveedor');
  }
  get descrip() {
    return this.myForm.get('precio');
  }
  get titul() {
    return this.myForm.get('nombre');
  }
  get idm() {
    return this.myForm.get('id');
  }

  cambiaPreview(event:any){
    if(event.target.files && event.target.files[0]){
      const reader = new FileReader;
      reader.onload = (e:any) => {
        this.Imgsrc=e.target.result
      }
      reader.readAsDataURL(event.target.files[0])
      this.Imgpreview=event.target.files[0]
    }else{
      this.Imgsrc='/assets/image-placeholder.jpg'
      this.Imgpreview=null;
      this.port.setValue(this.Imgsrc, {
        onlySelf: true
      })
    }
  }
  cambiarPortada(e){
    console.log(e.target.value)
    this.port.setValue(e.target.value, {
      onlySelf: true
    })
  }
  get formControls(){
    return this.myForm['controls'];
  }
  resetForm() {
    this.myForm.reset();
    this.Imgsrc = '/assets/image_placeholder.jpg';
    this.Imgpreview = null;
    this.isSubmitted = false;
  }
  cambiarHospital(e) {
    this.provbn=true;
    this.prov.setValue(e.target.value, {
      onlySelf: true
    })
    this.peliculam.proveedor=e.target.value
  }
}