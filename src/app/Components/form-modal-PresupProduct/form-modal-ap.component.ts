import { Component, Output, EventEmitter, Input,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from "rxjs/operators";
import Swal from 'sweetalert2';
import { UsuarioModel } from 'src/app/models/usuario';
import { ProductoModel } from '../../models/producto';
import { PresupuestosService } from 'src/app/services/presupuestos.service';
import { ProveedorModel } from 'src/app/models/proveedor';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { ProductosService } from 'src/app/services/productos.service';
@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal-ap.component.html'
})
export class FormModalAPComponentPresupProduct {
  id=localStorage.getItem("idPresup")
  hayprod:boolean=false;
  Usuario:UsuarioModel=JSON.parse(localStorage.getItem("usuario"));
  @Input() public modif=false; 
  @Input() public peliculam: ProductoModel;
  provArray:ProveedorModel[]=[]
  prodArray:ProductoModel[]=[]
  producto:ProductoModel;
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
   private service: PresupuestosService,
  public servicep:ProveedoresService,
  public serviceprod:ProductosService
  ) {
    this.createForm();
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.serviceprod.getProductos().subscribe(resp=>{
      this.prodArray=resp;
    })
  this.servicep.getProveedores().subscribe(resp=>{
    this.provArray=resp;
  })
  }
  private createForm() {
    this.myForm = this.formBuilder.group({
      id:'',
      nombre:['', [Validators.required]],
      foto:'', 
      precio:['', [Validators.required]],
      proveedor:'',
      cantidad:['1', [Validators.required]],
      producto:['', [Validators.required]]
    });
  }
  submitForm(formValue) {
    


console.log(formValue)
    this.isSubmitted=true
    console.log(formValue.proveedor)
    if(formValue.producto=="Elije un producto"){
      this.hayprod=false;
      console.log("oushet")
    }else{
      this.hayprod=true;
    }
if(this.myForm.valid){
  console.log("aaaa")
  console.log(this.Imgpreview)
      Swal.fire({
        title: 'Espere',
        text: 'Subiendo producto...',
        icon: 'info',
        allowOutsideClick: false
      });
      Swal.showLoading();
      this.producto={
        id:this.producto.id,
            nombre:this.producto.nombre,
            foto:this.producto.foto,
            proveedor:this.producto.proveedor,
            precio:formValue.precio,
            cantidad:formValue.cantidad
      }
    this.service.anadirProducto(this.producto,this.id).subscribe(resp=>{
      Swal.close()
      this.activeModal.close()
    })
    
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
  get prod() {
    return this.myForm.get('producto');
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
  cambiarProducto(e) {
    this.hayprod=true;
    this.prodArray.forEach(element => {
      if(e.target.value==element.nombre){
        console.log(this.modif)
        this.port.setValue(element.foto, {
          onlySelf: true
        })
        setTimeout(() => {
          this.prov.setValue(element.proveedor, {
            onlySelf: true
          })
          console.log(element.proveedor)
          console.log(this.myForm.value.proveedor)
          this.producto={
            id:element.id,
            nombre:element.nombre,
            foto:element.foto,
            proveedor:element.proveedor,
            precio:element.precio,
            cantidad:element.cantidad
          }
        }, 500);
        this.Imgsrc=element.foto
        this.titul.setValue(element.nombre, {
          onlySelf: true
        })
        this.descrip.setValue(element.precio, {
          onlySelf: true
        })
      }
    });
  }
}