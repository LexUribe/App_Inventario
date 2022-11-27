import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EncabezadoComponent } from './paginaMaestra/encabezado/encabezado.component';
import { PiePaginaComponent } from './paginaMaestra/pie-pagina/pie-pagina.component';
import { InicioComponent } from './paginaMaestra/inicio/inicio.component';
import { ErrorComponent } from './paginaMaestra/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    EncabezadoComponent,
    PiePaginaComponent,
    InicioComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
