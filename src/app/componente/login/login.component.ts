import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //son variables auxiliares
  public user: any;
  public token: any;
  public identity:any;
  public nombre: any;
  public mensaje_ok:any;
  public mensaje_error:any;

  formValue !: FormGroup;


  constructor
  (
  private formBuilder:FormBuilder,
  private userService:UsuarioService,
  private router:Router
  ) { }

  ngOnInit(): void {
    this.camposLogin();
  }

  camposLogin(){
    this.formValue= this.formBuilder.group({
      email:[''],
      phoneNumber:['']
    })
  }

  login(){

    if(this.formValue.value.email==""){
      //alert("Debe diligenciar su email")
      this.mensaje_error="Debe diligenciar su email"
    }

    else if(this.formValue.value.phoneNumber==""){
      //alert("Debe diligenciar su contraseña")
      this.mensaje_error="Debe diligenciar su contraseña"
    }
    else{
      this.userService.login(this.formValue.value).subscribe(
        response=>{
          console.log(response)
          if(response.mensaje=="email incorrecto"){

            this.mensaje_error="El email incorrecto"
          }
          else if(response.mensaje=="Contraseña incorrecta"){

            this.mensaje_error="La contraseña no es correcta"
          }
          else{

            Swal.fire(
              'Inicio de sesión correcto!',
              'You clicked the button!',
              'success'
             )
                //estas variables auxiliares contiene los datos de la bd
                this.token=response.token
                this.nombre=response.nombre
                this.identity=response.id
                localStorage.setItem('token',this.token);
                localStorage.setItem('nombre',this.nombre);
                localStorage.setItem('id',this.identity);
            this.userService.login(this.formValue.value).subscribe(
              response=>{
                console.log(response)
                this.router.navigate(['inicio'])
              },
              error=>{
                console.log(error)
                alert(error)
              }
            )
          }
        },
        error=>{
          console.log(error)
          alert(error)
        }
      )
    }
  }

  cerrarAlerta(){
    this.mensaje_error=""
  }

}
