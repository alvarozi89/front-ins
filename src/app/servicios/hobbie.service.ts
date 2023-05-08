import { Injectable } from '@angular/core';
import { Observable,map} from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UsuarioService } from './usuario.service';

const base_url= environment.url
@Injectable({
  providedIn: 'root'
})
export class HobbieService {
   //Variables auxiliares
   public user: any;
   public token: any;
   public identity: any;
   public nombres: any;
   public id: any;

  constructor(private http:HttpClient,private UsuarioService:UsuarioService) {this.token= this.UsuarioService.obtenerToken(); }

    //las rutas deben ser iguales a las de backend
    listarHobbie(){
      return this.http.get<any>(base_url+'hobbie/listarHobbie')
      .pipe(map((res:any)=>{
        return res;
      }))
    }

    obtenerHobbieDeUnUsuario(id:any){
      let headers = new HttpHeaders().set('autorizacion',this.token)
      return this.http.get<any>(base_url+'hobbie/listarHobbiePorUsuario/'+id,{headers:headers})
      .pipe(map((res:any)=>{
        return res;
      }))
    }

    obtenerIdhobbie(id:any){
      return this.http.get<any>(base_url+'hobbie/listarhobbieId/'+id)
      .pipe(map((res:any)=>{
        return res;
      }))
    }


    buscarFiltro(id:any,country:any){
      return this.http.get<any>(base_url+'hobbie/listarhobbiePorUsuarioFiltro/'+id +'/' + country)
      .pipe(map((res:any)=>{
        return res;
      }))
    }

    CrearHobbie(data:any){
      return this.http.post<any>(base_url+'hobbie/crearHobbie',data)
      .pipe(map((res:any)=>{
        return res;
      }))
    }

    eliminarhobbie(id:any){

      return this.http.delete<any>(base_url+'hobbie/eliminarhobbie/'+id)
    }

    actualizarhobbie(id:any, data:any){
      return this.http.put<any>(base_url+'hobbie/actualizarHobbie/'+id,data)
      .pipe(map((res:any)=>{
        return res;
      }))
    }


}
