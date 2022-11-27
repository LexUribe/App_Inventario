import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministracionRoutingModule } from './administracion-routing.module';
import { CrearEquipoCompletoComponent } from './equipoCompleto/crear-equipo-completo/crear-equipo-completo.component';
import { ListarEquipoCompletoComponent } from './equipoCompleto/listar-equipo-completo/listar-equipo-completo.component';
import { EditarEquipoCompletoComponent } from './equipoCompleto/editar-equipo-completo/editar-equipo-completo.component';
import { EliminarEquipoCompletoComponent } from './equipoCompleto/eliminar-equipo-completo/eliminar-equipo-completo.component';
import { CrearInventarioComponent } from './inventario/crear-inventario/crear-inventario.component';
import { EditarInventarioComponent } from './inventario/editar-inventario/editar-inventario.component';
import { ListarInventarioComponent } from './inventario/listar-inventario/listar-inventario.component';
import { EliminarInventarioComponent } from './inventario/eliminar-inventario/eliminar-inventario.component';


@NgModule({
  declarations: [
    CrearEquipoCompletoComponent,
    ListarEquipoCompletoComponent,
    EditarEquipoCompletoComponent,
    EliminarEquipoCompletoComponent,
    CrearInventarioComponent,
    EditarInventarioComponent,
    ListarInventarioComponent,
    EliminarInventarioComponent
  ],
  imports: [
    CommonModule,
    AdministracionRoutingModule
  ]
})
export class AdministracionModule { }
