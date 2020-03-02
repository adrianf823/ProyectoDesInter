import { Component, Output, EventEmitter, Input,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from "rxjs/operators";
import { ClientesService } from '../../services/clientes.service';
import { ClienteModel } from '../../models/cliente';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal-ap.component.html'
})
export class FormModalAPComponentCliente {
  @Input() public modif=false; 
  @Input() public clientem: ClienteModel;
  myForm: FormGroup;
  filePath;
  pelicula: ClienteModel
  Imgsrc='/assets/img/image-placeholder.jpg';
  Imgpreview:any = null;
  isSubmitted:boolean=false;
  constructor(
   public activeModal: NgbActiveModal,
   private formBuilder: FormBuilder,
   private storage: AngularFireStorage,
   private service: ClientesService
  ) {
    this.createForm();
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.modif)
    if(this.modif==true){
      this.idm.setValue(this.clientem.id, {
        onlySelf: true
      })
    this.nombrem.setValue(this.clientem.nombre, {
      onlySelf: true
    })
    this.telefm.setValue(this.clientem.telefono, {
      onlySelf: true
    })
    this.dirm.setValue(this.clientem.direccion, {
      onlySelf: true
    })
  }
  }
  private createForm() {
    this.myForm = this.formBuilder.group({
      id:'',
      nombre:['', [Validators.required]],
      telefono: ['', [Validators.required]],
      direccion:['', [Validators.required]]
    });
  }
 /* private submitForm(formValue) {
    this.isSubmitted=true
if(this.myForm.valid){
  console.log(this.Imgpreview)
  if(this.Imgpreview==null && this.modif == false){
    Swal.fire({
      text:'Tienes que añadir una portada',
      icon: 'warning'
    })
  }else{
    if(this.modif==false){
      Swal.fire({
        title: 'Espere',
        text: 'Subiendo película...',
        icon: 'info',
        allowOutsideClick: false
      });
      Swal.showLoading();
    this.filePath = `${formValue.genero}/${this.Imgpreview.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(this.filePath);
    this.storage.upload(this.filePath, this.Imgpreview).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          formValue['portada'] = url;
          this.pelicula=formValue;
  this.service.crearPelicula(this.pelicula).subscribe( resp => {
            this.resetForm();
            this.activeModal.close(this.myForm.value);
          })
  
        })
      })
    ).subscribe();
  }else{
    Swal.fire({
      title: 'Espere',
      text: 'Actualizando película...',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();
    if(this.Imgpreview==null){
      console.log(this.peliculam)
      this.service.actualizarPelicula(this.myForm.value).subscribe( resp => {
        this.resetForm();
        this.modif=false;
        this.activeModal.close(this.myForm.value);
      })
    }else{
    this.filePath = `${formValue.genero}/${this.Imgpreview.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(this.filePath);
    this.storage.upload(this.filePath, this.Imgpreview).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          formValue['portada'] = url;
          this.peliculam=formValue;
          console.log(this.peliculam)
          this.service.actualizarPelicula(this.myForm.value).subscribe( resp => {
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
  */
  get nombrem() {
    return this.myForm.get('nombre');
  }
  get dirm() {
    return this.myForm.get('direccion');
  }
  get telefm() {
    return this.myForm.get('telefono');
  }
  get idm() {
    return this.myForm.get('id');
  }
  /*cambiarGenero(e) {
    this.generon.setValue(e.target.value, {
      onlySelf: true
    })
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
      this.Imgsrc='/assets/img/image-placeholder.jpg'
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
  */
  get formControls(){
    return this.myForm['controls'];
  }
  resetForm() {
    this.myForm.reset();
    this.Imgsrc = '/assets/img/image_placeholder.jpg';
    this.Imgpreview = null;
    this.isSubmitted = false;
  }
  submitForm(formValue) {
this.isSubmitted=true;
if(this.myForm.valid){
  if(!this.modif){
this.service.crearCliente(formValue).subscribe(resp=>{
  this.isSubmitted=false;
  this.activeModal.close();
}
  )
}else{
  this.service.actualizarCliente(formValue).subscribe(resp=>{
    this.isSubmitted=false;
    this.activeModal.close();
  }
    )
}
}
  }
}