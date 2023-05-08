import { Component, OnInit } from '@angular/core';
import { Informacion } from '../../models/informacion.models';
import { InformacionService } from 'src/app/servicios/informacion.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-informacion-index',
  templateUrl: './informacion-index.component.html',
  styleUrls: ['./informacion-index.component.css']
})
export class informacionIndexComponent implements OnInit {

  //Variable auxiliares
  formValue !:FormGroup
  public datos_informacion:any
  public id: any;
  public id_Usuario:any;
  public filtro:any;
  public filtroText:any;
  public data_detalle:any;
  public token:any;

  informacionModel:Informacion = new Informacion();



  constructor(
    private formBuilder:FormBuilder,
    private UsuarioService:UsuarioService,
    private informacionervice:InformacionService,
    private router:Router

  )
  {
    this.id_Usuario= this.UsuarioService.obtenerIdentidad();
    this.token= this.UsuarioService.obtenerToken();
  }

  ngOnInit(): void {
    this.validar();
    this.obtenerCampos();
  }

  validar(){
    if(this.token){

      this.listarinformacionPorUsuario();
    }
    else{
      this.router.navigate(['no-autorizado'])
    }
  }

  listar(){
    this.informacionervice.listarinformacion()
    .subscribe(res=>{
      this.datos_informacion=res
      console.log(this.datos_informacion)
    })

  }

  listarinformacionPorUsuario(){
    this.informacionervice.obtenerinformacionDeUnUsuario(this.id_Usuario)
    .subscribe(res=>{
      this.datos_informacion=res
      console.log(this.datos_informacion)
    })

  }

  search(searchForm:any){

    if(this.filtroText==""){
      this.listarinformacionPorUsuario();
    }

    else {
      this.informacionervice.buscarFiltro(this.id_Usuario,searchForm.value.filtro)
      .subscribe(res=>{
        this.datos_informacion=res
        console.log(this.datos_informacion)
      })
    }

  }


  obtenerId(item:any){
    this.informacionModel._id = item._id
  }

  eliminarinformacion(){
    this.informacionervice.eliminarinformacion(this.informacionModel._id)
    .subscribe(res=>{
      Swal.fire(
        'informacion eliminado!',
        'You clicked the button!',
        'error'
       )
      this.listarinformacionPorUsuario()
    })
  }

  obtenerCampos(){
    this.formValue= this.formBuilder.group({
      country:[''],
      city:[''],
      address:[''],
      photoProfile:[''],
    })
  }
 

  editar(item:any){

    this.informacionModel._id = item._id
    this.formValue.controls['country'].setValue(item.country)
    this.formValue.controls['city'].setValue(item.city)
    this.formValue.controls['address'].setValue(item.address)
    this.formValue.controls['photoProfile'].setValue(item.photoProfile)


  }



  actualizarinformacion(){

    this.informacionModel.country= this.formValue.value.country;
    this.informacionModel.city= this.formValue.value.city;
    this.informacionModel.address= this.formValue.value.address;
    this.informacionModel.photoProfile= this.formValue.value.photoProfile;
    this.informacionModel.usuario= this.id_Usuario;

    this.informacionervice.actualizarinformacion(this.informacionModel._id,this.informacionModel)
    .subscribe(res=>{

      Swal.fire(
        'Persona actualizada!',
        'You clicked the button!',
        'success'
       )
      this.listarinformacionPorUsuario()
    })


  }


}
