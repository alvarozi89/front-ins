import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Usuario } from '../../models/usuario.models';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios-crear',
  templateUrl: './usuario-crear.component.html',
  styleUrls: ['./usuario-crear.component.css']
})
export class UsuarioCrearComponent implements OnInit {

  //Variables auxiliares

  formValue!: FormGroup;
  usuarioModel:Usuario= new Usuario();

  public mensaje_ok:any;
  public mensaje_error:any;


  constructor
  (
    private formBuilder:FormBuilder,
    private usuarioService:UsuarioService,
    private router:Router
  )
  { }

  ngOnInit(): void {

    this.obtenerCampos();
  }

  obtenerCampos(){
    this.formValue = this.formBuilder.group({
      email:[''],
      phoneNumber:[''],
      firstname:[''],
      lastname: [''],
      documentType: [''],
      documentNumber: [''],
      birthdate: [''],
    })
  }

  CrearUsuario(){

    this.usuarioModel.email = this.formValue.value.email;
    this.usuarioModel.phoneNumber = this.formValue.value.phoneNumber;
    this.usuarioModel.firstname = this.formValue.value.firstname;
    this.usuarioModel.lastname = this.formValue.value.lastname;
    this.usuarioModel.documentType = this.formValue.value.documentType;
    this.usuarioModel.documentNumber = this.formValue.value.documentNumber;
    this.usuarioModel.birthdate = this.formValue.value.birthdate;

    if(this.usuarioModel.firstname==""){
      this.mensaje_error="El campo nombre no puede estar vacio"
    }

    else if(this.usuarioModel.email==""){
      this.mensaje_error="El campo correo no puede estar vacio"
    }

    else if(this.usuarioModel.phoneNumber==""){
      this.mensaje_error="El campo teléfono no puede estar vacio"
    }

    else if(this.usuarioModel.lastname==""){
      this.mensaje_error="El campo apellido no puede estar vacio"
    }

    else if(this.usuarioModel.documentType==""){
      this.mensaje_error="El campo tipo de documento no puede estar vacio"
    }

    else if(this.usuarioModel.documentNumber==""){
      this.mensaje_error="El campo número de documento no puede estar vacio"
    }

    else if(this.usuarioModel.birthdate==""){
      this.mensaje_error="El campo fecha de nacimiento no puede estar vacio"
    }

    else{
      //Cuando salta acá ya esta alimentada la información
      this.usuarioService.crear(this.usuarioModel)
      .subscribe(res=>{
      console.log(res);
        if (res.mensaje=="El usuario ya existe") {
          this.mensaje_error=res.mensaje;
        }
        else{
          this.mensaje_ok="Se registro correctamente"
          setTimeout(() => {
            this.router.navigate(['']);
          }, 2000);
        }
      },
      err=>{
        console.log(err)
      })
    }
  }
  cerrarAlerta(){
    this.mensaje_error=""
  }
}
