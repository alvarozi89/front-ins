import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { informacionCrearComponent } from './componente/informacion/informacion-crear/informacion-crear.component';
import { informacionIndexComponent } from './componente/informacion/informacion-index/informacion-index.component';
import { UsuarioCrearComponent } from './componente/jefes/usuario-crear/usuario-crear.component';
import { LoginComponent } from './componente/login/login.component';
import { InicioComponent } from './componente/inicio/inicio.component';
import { PaginaNoAutorizadaComponent } from './componente/pagina-no-autorizada/pagina-no-autorizada.component';
import { BarraComponent } from './componente/barra/barra.component';
import { FooterComponent } from './componente/footer/footer.component';
import { HobbieIndexComponent } from './componente/jefes/hobbie-index/hobbie-index.component';


//estos son requisitos cuando trabajamos con formularios
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

//http
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HobbieCrearComponent } from './componente/jefes/hobbie-crear/hobbie-crear.component';


@NgModule({
  declarations: [
    AppComponent,
    UsuarioCrearComponent,
    PaginaNoAutorizadaComponent,
    FooterComponent,
    LoginComponent,
    InicioComponent,
    BarraComponent,
    informacionCrearComponent,
    informacionIndexComponent,
    HobbieIndexComponent,
    HobbieCrearComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
