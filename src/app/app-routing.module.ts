import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componente/login/login.component';
import { InicioComponent } from './componente/inicio/inicio.component';
import { PaginaNoAutorizadaComponent } from './componente/pagina-no-autorizada/pagina-no-autorizada.component';
import { UsuarioCrearComponent } from './componente/jefes/usuario-crear/usuario-crear.component';
import { informacionIndexComponent } from './componente/informacion/informacion-index/informacion-index.component';
import { informacionCrearComponent } from './componente/informacion/informacion-crear/informacion-crear.component';
import { HobbieIndexComponent } from './componente/jefes/hobbie-index/hobbie-index.component';
import { HobbieCrearComponent } from './componente/jefes/hobbie-crear/hobbie-crear.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'inicio',component:InicioComponent},
  {path:'no-autorizado',component:PaginaNoAutorizadaComponent},
  {path:'jefe-crear',component:UsuarioCrearComponent},
  {path:'informacion-index',component:informacionIndexComponent},
  {path:'informacion-crear',component:informacionCrearComponent},
  {path:'hobbie-index',component:HobbieIndexComponent},
  {path:'hobbie-crear',component:HobbieCrearComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
