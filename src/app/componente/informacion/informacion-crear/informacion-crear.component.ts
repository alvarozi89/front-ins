import { Component, OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Usuario } from '../../models/usuario.models';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Informacion } from '../../models/informacion.models';
import { InformacionService } from 'src/app/servicios/informacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-informacion-crear',
  templateUrl: './informacion-crear.component.html',
  styleUrls: ['./informacion-crear.component.css']
})
export class informacionCrearComponent implements OnInit {

  public id_jefe:any;
  informacionModel:Informacion = new Informacion();
  formValue !:FormGroup

  public mensaje_ok:any;
  public mensaje_error:any;

  constructor
   (
    private formBuilder:FormBuilder,
    private jefeService:UsuarioService,
    private informacionervice:InformacionService,
    private router:Router

    ) {this.id_jefe= this.jefeService.obtenerIdentidad(); }

  ngOnInit(): void {
    this.obtenerCampos();
  }

  obtenerCampos(){
    this.formValue= this.formBuilder.group({
      country:[''],
      city:[''],
      address:[''],
      photoProfile:[''],
    })
  }


  Crearinformacion(){

    this.informacionModel.country= this.formValue.value.country;
    this.informacionModel.city= this.formValue.value.city;
    this.informacionModel.address= this.formValue.value.address;
    this.informacionModel.photoProfile= this.formValue.value.photoProfile;
    this.informacionModel.usuario= this.id_jefe;

    if(this.informacionModel.country==""){
      this.mensaje_error="El campo país no puede estar vacio"
    }

    else if(this.informacionModel.city==""){
      this.mensaje_error="El campo ciudad no puede estar vacio"
    }
    else if(this.informacionModel.address==""){
      this.mensaje_error="El campo dirección no puede estar vacio"
    }

    else if(this.informacionModel.photoProfile==""){
      this.mensaje_error="El campo foto no puede estar vacio"
    }


    else{
      //Cuando salta acá ya esta alimentada la información
      this.informacionervice.Crearinformacion(this.informacionModel)
      .subscribe(res=>{
      console.log(res);
          this.mensaje_ok="Se registro correctamente"
          this.formValue.reset();
          setTimeout(() => {
            this.router.navigate(['informacion-index']);
          }, 2000);
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
