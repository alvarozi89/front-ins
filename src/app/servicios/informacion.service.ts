import { Injectable } from '@angular/core';
import { Observable,map} from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UsuarioService } from './usuario.service';

const base_url= environment.url
@Injectable({
  providedIn: 'root'
})
export class InformacionService {
   //Variables auxiliares
   public user: any;
   public token: any;
   public identity: any;
   public nombres: any;
   public id: any;

  constructor(private http:HttpClient,private UsuarioService:UsuarioService) {this.token= this.UsuarioService.obtenerToken(); }

    //las rutas deben ser iguales a las de backend
    listarinformacion(){
      return this.http.get<any>(base_url+'informacion/listarInformacion')
      .pipe(map((res:any)=>{
        return res;
      }))
    }

    obtenerinformacionDeUnUsuario(id:any){
      let headers = new HttpHeaders().set('autorizacion',this.token)
      return this.http.get<any>(base_url+'informacion/listarInformacionPorusuario/'+id,{headers:headers})
      .pipe(map((res:any)=>{
        return res;
      }))
    }

    obtenerIdinformacion(id:any){
      return this.http.get<any>(base_url+'informacion/listarInformacionId/'+id)
      .pipe(map((res:any)=>{
        return res;
      }))
    }


    buscarFiltro(id:any,country:any){
      return this.http.get<any>(base_url+'informacion/listarInformacionPorUsuarioFiltro/'+id +'/' + country)
      .pipe(map((res:any)=>{
        return res;
      }))
    }

    Crearinformacion(data:any){
      return this.http.post<any>(base_url+'informacion/crearInformacion',data)
      .pipe(map((res:any)=>{
        return res;
      }))
    }

    eliminarinformacion(id:any){

      return this.http.delete<any>(base_url+'informacion/eliminarInformacion/'+id)
    }

    actualizarinformacion(id:any, data:any){
      return this.http.put<any>(base_url+'informacion/actualizarInformacion/'+id,data)
      .pipe(map((res:any)=>{
        return res;
      }))
    }


}
