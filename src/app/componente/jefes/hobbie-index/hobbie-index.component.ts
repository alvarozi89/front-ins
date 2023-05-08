import { Component, OnInit } from '@angular/core';
import { Hobbie } from '../../models/hobbie.models';
import { HobbieService } from 'src/app/servicios/hobbie.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-hobbie-index',
  templateUrl: './hobbie-index.component.html',
  styleUrls: ['./hobbie-index.component.css']
})
export class HobbieIndexComponent implements OnInit {

//Variable auxiliares
formValue !:FormGroup
public datos_hobbie:any
public id: any;
public id_Usuario:any;
public filtro:any;
public filtroText:any;
public data_detalle:any;
public token:any;

hobbieModel:Hobbie = new Hobbie();



constructor(
  private formBuilder:FormBuilder,
  private UsuarioService:UsuarioService,
  private hobbieService:HobbieService,
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

    this.listarhobbiePorUsuario();
  }
  else{
    this.router.navigate(['no-autorizado'])
  }
}

listar(){
  this.hobbieService.listarHobbie()
  .subscribe(res=>{
    this.datos_hobbie=res
    console.log(this.datos_hobbie)
  })

}

listarhobbiePorUsuario(){
  this.hobbieService.obtenerHobbieDeUnUsuario(this.id_Usuario)
  .subscribe(res=>{
    this.datos_hobbie=res
    console.log(this.datos_hobbie)
  })

}

search(searchForm:any){

  if(this.filtroText==""){
    this.listarhobbiePorUsuario();
  }

  else {
    this.hobbieService.buscarFiltro(this.id_Usuario,searchForm.value.filtro)
    .subscribe(res=>{
      this.datos_hobbie=res
      console.log(this.datos_hobbie)
    })
  }

}


obtenerId(item:any){
  this.hobbieModel._id = item._id
}

eliminarHobbie(){
  this.hobbieService.eliminarhobbie(this.hobbieModel._id)
  .subscribe(res=>{
    Swal.fire(
      'hobbie eliminado!',
      'You clicked the button!',
      'error'
     )
    this.listarhobbiePorUsuario()
  })
}

obtenerCampos(){
  this.formValue= this.formBuilder.group({
    nombre:[''],
  })
}


editar(item:any){

  this.hobbieModel._id = item._id
  this.formValue.controls['nombre'].setValue(item.nombre)

}



actualizarHobbie(){

  this.hobbieModel.nombre= this.formValue.value.nombre;
  this.hobbieModel.usuario= this.id_Usuario;
  this.hobbieService.actualizarhobbie(this.hobbieModel._id,this.hobbieModel)
  .subscribe(res=>{

    Swal.fire(
      'Hobbie actualizado!',
      'You clicked the button!',
      'success'
     )
    this.listarhobbiePorUsuario()
  })


}

}
