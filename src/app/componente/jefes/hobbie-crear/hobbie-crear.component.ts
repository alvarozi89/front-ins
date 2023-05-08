import { Component, OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Usuario } from '../../models/usuario.models';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Hobbie } from '../../models/hobbie.models';
import { HobbieService } from 'src/app/servicios/hobbie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hobbie-crear',
  templateUrl: './hobbie-crear.component.html',
  styleUrls: ['./hobbie-crear.component.css']
})
export class HobbieCrearComponent implements OnInit {

  public id_jefe:any;
  hobbieModel:Hobbie = new Hobbie();
  formValue !:FormGroup

  public mensaje_ok:any;
  public mensaje_error:any;

  constructor
   (
    private formBuilder:FormBuilder,
    private jefeService:UsuarioService,
    private hobbieService:HobbieService,
    private router:Router

    ) {this.id_jefe= this.jefeService.obtenerIdentidad(); }

  ngOnInit(): void {
    this.obtenerCampos();
  }

  obtenerCampos(){
    this.formValue= this.formBuilder.group({
      nombre:[''],
    })
  }


  CrearHobbie(){

    this.hobbieModel.nombre= this.formValue.value.nombre;
    this.hobbieModel.usuario= this.id_jefe;

    if(this.hobbieModel.nombre==""){
      this.mensaje_error="El campo descripción no puede estar vacio"
    }


    else{
      //Cuando salta acá ya esta alimentada la información
      this.hobbieService
.CrearHobbie(this.hobbieModel)
      .subscribe(res=>{
      console.log(res);
          this.mensaje_ok="Se registro correctamente"
          this.formValue.reset();
          setTimeout(() => {
            this.router.navigate(['hobbie-index']);
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
