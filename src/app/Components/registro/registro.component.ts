
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators,FormGroup, FormBuilder} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {AuthService} from '../../services/auth.service'
import {NuevoUsuario} from '../../models/nuevo-usuario'
import { Router } from '@angular/router';
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  isRegister = false;
  isRegisterFail = false;
  errorMsg = '';

  usuario: NuevoUsuario;
  myForm: FormGroup;

  constructor(public authService:AuthService, public router:Router, public formBuilder: FormBuilder) { 
    this.createForm();
  }

  ngOnInit() {
  }
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  private createForm() {
    this.myForm = this.formBuilder.group({
      Foto:'https://img.icons8.com/cotton/50/000000/name--v2.png',
      Nombre: ['', [Validators.required]],
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  onRegister(formValue): void {
    this.usuario = new NuevoUsuario(formValue.Nombre, formValue.email, formValue.password, formValue.Foto);
    this.usuario.roles.push("admin");
    this.authService.registro(this.usuario).subscribe(data => {
      this.isRegister = true;
      this.isRegisterFail = false;
      alert("Registrado correctamente")
      localStorage.setItem("logeado","1");
      this.router.navigateByUrl("/login")
    },
      (error: any) => {
        this.errorMsg = error.error.mensaje;
        this.isRegister = false;
        this.isRegisterFail = true;
        alert(this.errorMsg)
      }
    );
  }
  matcher = new MyErrorStateMatcher();
}
