import { Injectable } from '@angular/core';
import { Observable,map} from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
//import { Jefe } from '../componente/models/jefe.models';

const base_url= environment.url

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  //Variables auxiliares
  public user: any;
  public token: any;
  public identity: any;
  public nombres: any;
  public id: any;

  constructor(private http:HttpClient) { }

  //las rutas deben ser iguales a las de backend
  crear(data:any){
    return this.http.post<any>(base_url+'usuario/crearUsuario',data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  login(user: any,obtenerToken=null):Observable<any>{
    let json=user;
    if(obtenerToken!=null){
      user.token=true
    }
    let headers = new HttpHeaders().set('Content-Type','application/json')
    return this.http.post(base_url+'usuario/login',json,{headers:headers})
  }

  obtenerToken():Observable<any>{
    let tokenAuxiliar = localStorage.getItem('token')
    if(tokenAuxiliar){
      this.token=tokenAuxiliar
    }
    else {
      this.token=null
    }
    return this.token
  }

  obtenerIdentidad():Observable<any>{
    let identityAuxiliar = localStorage.getItem('id')
    if(identityAuxiliar){
      this.identity=identityAuxiliar
    }
    else{
      this.identity=null
    }
    return this.identity
  }

  obtenerNombre():Observable<any>{

    let nombresAuxiliar = localStorage.getItem('nombre')
    if(nombresAuxiliar){
      this.nombres=nombresAuxiliar
    }
    else{
      this.nombres=null
    }
    return this.nombres

  }

}
